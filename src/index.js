import ReconnectingWebSocket from "reconnecting-websocket";
import Logger from "./logger";
import Mixin from "./mixin";
import Emitter from "./emitter";
import Listener from "./listener";
class VueRws {
  constructor({ connection, vuex, debug, options }) {
    // 获取版本号
    this.version = "__VERSION__";
    Logger.debug = debug;
    this._options = options || {
      // WebSocket: WS, // custom WebSocket constructor
      connectionTimeout: 1000,
      maxRetries: 10,
    };
    this._connection = connection;
    this.rws = this.connect(connection, this._options);
    this.rws.emit = this.emit.bind(this);
    this.rws.connect = this.rws.reconnect;
    this.emitter = new Emitter(vuex);
    this.listener = new Listener(this.rws, this.emitter);
  }

  /**
   * @param Vue
   */
  install(Vue) {
    const version = Number(Vue.version.split(".")[0]);

    if (version >= 3) {
      Vue.config.globalProperties.$rws = this.rws;
      Vue.config.globalProperties.$ws = this.rws;
      Vue.config.globalProperties.$vueRws = this;
      Mixin.onBeforeMount = Mixin.beforeCreate;
      Mixin.onMounted = Mixin.mounted;
      Vue.mixin(Mixin);
    } else {
      Vue.prototype.$rws = this.rws;
      Vue.prototype.$ws = this.rws;
      Vue.prototype.$vueRws = this;
      Vue.mixin(Mixin);
    }

    Logger.info(`Vue-RWS version v${this.version}`);
    Logger.info("Vue-RWS plugin enabled");
  }

  /**
   * @param connection
   * @param options
   */
  connect(connection, options) {
    if (connection && typeof connection === "object") {
      Logger.info("Received socket instance");
      return connection;
    } else if (typeof connection === "string") {
      Logger.info("Received connection string");
      this.rws = new ReconnectingWebSocket(connection, [], options);
      return this.rws;
    } else {
      throw new Error("Unsupported connection type");
    }
  }
  emit(type, data) {
    if (type == "connect") {
      this.rws.reconnect();
      return this;
    }
    this.rws.send(
      JSON.stringify({
        ...data,
        type,
      })
    );
    return this.rws;
  }
}

export default VueRws;
