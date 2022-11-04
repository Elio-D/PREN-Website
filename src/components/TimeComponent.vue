<template>
  <button class="btn btn-primary">{{formattedElapsedTime}}</button>
</template>

<script>
import { io } from "socket.io-client";
//import moment from 'moment';

export default {
  name: 'TimeComponent',
  data() {
    return {
      isConnected: false,
      socket: io('https://prenf22-edipuma.enterpriselab.ch:8080'),
      startTime: null,
      endTime: null,
      elapsedTime: 0
    }
  },
  created() {
    this.socket.on("timer", (data) => {
      this.elapsedTime = data;
    });

    this.socket.on("stopRun", (data) => {
      this.elapsedTime = data;
    });

    this.socket.on("resetRun", (data) => {
      this.elapsedTime = data;
    });
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  mounted() {
    fetch('https://prenf22-edipuma.enterpriselab.ch:8080/time')
    .then(res => res.json())
    .then(data => this.elapsedTime = data.time)
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