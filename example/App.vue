<template>
  <div id="app">
    <h1>欢迎使用 VueRws</h1>
    <button @click="loginHandle">login</button>
  </div>
</template>

<script>
export default {
  name: "App",
  sockets: {
    connect() {
      console.log("socket connect");
    },
    disconnect() {
      console.log("socket disconnect");
      this.$rws.reconnect();
    },
    error() {
      console.log("socket error");
    },
    ping() {
      console.log("socket ping");
    },
    login() {
      console.log("socket login");
    },
    customEmit() {
      console.log(
        'this method was fired by the socket server. eg: this.$rws.emit("customEmit", data)'
      );
    },
  },
  methods: {
    loginHandle() {
      this.$rws.emit("login", { token: "this is token" });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
