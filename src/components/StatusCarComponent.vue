<template>
  <button type="button" class="btn btn-primary">{{device.status}}</button>
</template>

<script>
import { io } from "socket.io-client";

export default {
  name: 'StatusCarComponent',
  data() {
    return {
      socket: io('https://prenf22-edipuma.enterpriselab.ch:8080'),
      device: []
    }
  },
  created() {
    this.socket.on("deviceStatusUpdate", (data) => {
      console.log(data);
      this.device = data;
    });
  },
  mounted() {
    fetch('https://prenf22-edipuma.enterpriselab.ch:8080/currentDevice')
    .then(res => res.json())
    .then(data => this.device = data)
    .catch(err => console.log(err.message))
  }
}
</script>

<style scoped>
button {
  height: 45px;
  width: 100px;
  border-radius: 50px;
  pointer-events: none;
}
</style>
