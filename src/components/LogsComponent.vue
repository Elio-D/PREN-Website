<template>
<div class="card shadow" style="text-align: left; margin-bottom: 50px">
  <div class="card-header" style="background: #343434; color: white">
    Logs
  </div>
  <div v-if="!checkisOFFREADY()">
  <ul class="list-group list-group-flush" :key="log._id" v-for="log in logs.slice().reverse()">
    <li class="list-group-item" id="logstyle">{{formatDate(log.timestamp)}} - {{log.level}}: {{log.message}}</li>
  </ul>
</div>
 <div v-if="checkisOFFREADY()">
  <ul class="list-group list-group-flush">
    <li class="list-group-item" id="logstyle">Run noch nicht gestartet</li>
  </ul>
</div>
</div>

</template>

<script>
//import SocketioService from '../services/socketio.service.js';
import { io } from "socket.io-client";

export default {
  name: 'LogsComponent',
  data() {
    return {
      isConnected: false,
      socket: io('https://prenf22-edipuma.enterpriselab.ch:8080'),
      logs: [],
      emptyArray: [],
      currentDevice: {status: "OFF"}   
    }
  },
  created() {
    this.socket.on("log", (data) => {
      console.log(data);
      this.logs.push(data);
    });

    this.socket.on("updateProgress", (data) => {
      console.log(data);
      if (data == 0){
        while(this.logs.length > 0) {
        this.logs.pop();
        }
      }
    });
    this.socket.on("deviceStatusUpdate", (data) => {
      console.log(data);
      this.currentDevice = data;
    });
  },
  mounted() {
    this.getLogData();
    this.getDeviceData();
  },
  methods: {
    formatDate(date){
      var myDate = date;
      const time = new Date(myDate);
      const formattedTime = time.getFullYear() + "-" + this.addZero(time.getUTCMonth()) + "-" + this.addZero(time.getDay()) + " " + this.addZero(time.getHours()) + ":" + this.addZero(time.getMinutes()) + ":" + this.addZero(time.getSeconds());
      return formattedTime;
    },
    addZero(date){
      if(date <= 9){
        return "0" + date;
      } else {
        return date;
      }
    },
    checkisOFFREADY(){
      if(this.currentDevice.status == "OFF" || this.currentDevice.status == "READY"){
        return true;
      } else {
        return false;
      }
    },
    async getLogData() {
      try {
        let response = await fetch("https://prenf22-edipuma.enterpriselab.ch:8080/currentLogs");
        this.logs = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async getDeviceData(){
      try {
        let response = await fetch("https://prenf22-edipuma.enterpriselab.ch:8080/currentDevice");
        this.currentDevice = await response.json();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

</script>

<style scoped>
.table-dark {
  background-color: #343434
}

#logstyle {
  text-align: left;
}
@media only screen and (max-width: 700px) {
  #logstyle {
  text-align: left;
  font-size: 15px;
}
.card {
  border: 0;
}
.card-header{
      border:0;
      border-radius: 0;
      width: 100%
    }
}
</style>
