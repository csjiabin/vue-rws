<p align="center">
<a href="https://circleci.com/gh/csjiabin/vue-rws/tree/main"><img src="https://img.shields.io/circleci/project/github/csjiabin/vue-rws/main.svg?sanitize=true" alt="Build Status"></a>
<!-- <a href="https://codecov.io/github/csjiabin/vue-rws?branch=main"><img src="https://img.shields.io/codecov/c/github/csjiabin/vue-rws/main.svg?sanitize=true" alt="Coverage Status"></a> -->
<a href="https://npmcharts.com/compare/vue-rws?minimal=true"><img src="https://img.shields.io/npm/dm/vue-rws.svg?sanitize=true" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-rws"><img src="https://img.shields.io/npm/v/vue-rws.svg?sanitize=true" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-rws"><img src="https://img.shields.io/npm/l/vue-rws.svg?sanitize=true" alt="License"></a>

</p>

#### 🚀 Installation

```bash
npm install vue-rws
# or
yarn add vue-rws
```

##### Using Connection String

```javascript
import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import VueRws from "vue-rws";

Vue.use(
  new VueRws({
    debug: true,
    connection: "ws://socket link",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    //Optional options
    options: {
      // WebSocket: WS, // custom WebSocket constructor
      connectionTimeout: 1000,
      maxRetries: 10,
    },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

##### Using socket.io-client Instance

```javascript
import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import VueRws from "vue-rws";
import ReconnectingWebSocket from "reconnecting-websocket";

const options = {
  // WebSocket: WS, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
}; //Options object to pass into ReconnectingWebSocket

Vue.use(
  new VueRws({
    debug: true,
    connection: new ReconnectingWebSocket("ws://socket link", options), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

| **Parameters**      | **Type's**                    | **Default** | **Required** | **Description**                                         |
| ------------------- | ----------------------------- | ----------- | ------------ | ------------------------------------------------------- |
| debug               | Boolean                       | `false`     | Optional     | Enable logging for debug                                |
| connection          | String/reconnecting-websocket | `null`      | Required     | Websocket server url or reconnecting-websocket instance |
| vuex.store          | Vuex                          | `null`      | Optional     | Vuex store instance                                     |
| vuex.actionPrefix   | String                        | `null`      | Optional     | Prefix for emitting server side vuex actions            |
| vuex.mutationPrefix | String                        | `null`      | Optional     | Prefix for emitting server side vuex mutations          |
| options             | Object                        | `null`      | Optional     | reconnecting-websocket options                          |

#### 🌈 Component Level Usage

<p>If you want to listen socket events from component side, you need to add `sockets` object in Vue component, and every function will start to listen events, depends on object key</p>

```javascript
new Vue({
  sockets: {
    connect() {
      console.log("socket connected");
    },
    customEmit(data) {
      console.log(
        'this method was fired by the socket server. eg: rws.emit("customEmit", data)'
      );
    },
  },
  methods: {
    clickButton(data) {
      // $socket is socket.io-client instance
      this.$rws.emit("emit_method", data);
    },
  },
});
```

##### Dynamic Listeners

<p>If you need consuming events dynamically in runtime, you can use `subscribe` and `unsubscribe` methods in Vue component</p>

```javascript
this.sockets.subscribe("EVENT_NAME", (data) => {
  this.msg = data.message;
});

this.sockets.unsubscribe("EVENT_NAME");
```

##### Defining handlers for events with special characters

<p>If you want to handle 'kebab-case', or "event with space inside it" events, then you have to define it via the following way</p>

```javascript
export default {
  name: "Test",
  sockets: {
    connect() {
      console.log("socket to notification channel connected");
    },
  },

  data() {
    return {
      something: [
        // ... something here for the data if you need.
      ],
    };
  },

  mounted() {
    this.$rws.subscribe("kebab-case", (data) => {
      console.log("This event was fired by eg. rws.emit('kebab-case')", data);
    });
  },
};
```

#### 🏆 Vuex Integration

<p>When you set store parameter in installation, `vue-rws` will start sending events to Vuex store. If you set both prefix for vuex, you can use `actions` and `mutations` at the same time. But, best way to use is just `actions`</p>

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {
    "<MUTATION_PREFIX><EVENT_NAME>"() {
      // do something
    },
  },
  actions: {
    "<ACTION_PREFIX><EVENT_NAME>"() {
      // do something
    },
  },
});
```

## Stargazers over time

<!-- [![Stargazers over time](https://starcharts.herokuapp.com/MetinSeylan/Vue-Socket.io.svg)](https://starcharts.herokuapp.com/MetinSeylan/Vue-Socket.io) -->

<p align="center">
    <a href="https://github.com/MetinSeylan/Vue-Socket.io" target="_blank">
    <img src="https://media.giphy.com/media/11jlnltQgUi2mQ/giphy.gif" style="transform: rotateY(180deg)">
    </a>
</p>
