export default class VueSocketListener {
  constructor(rws, emitter) {
    this.rws = rws;
    this.register();
    this.emitter = emitter;
  }

  /**
   * Listening all socket events
   */
  register() {
    this.rws.addEventListener("open", (event) => {
      this.onEvent("connect", event);
    });
    this.rws.addEventListener("close", (event) => {
      this.onEvent("disconnect", event);
    });
    this.rws.addEventListener("error", (error) => {
      this.onEvent("error", error);
    });
    this.rws.addEventListener("message", (packet) => {
      const res = JSON.parse(packet.data) ?? {};
      this.onEvent(res.type, res);
    });
  }

  onEvent(event, args) {
    this.emitter.emit(event, args);
  }
}
