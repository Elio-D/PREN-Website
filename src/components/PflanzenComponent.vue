<template>
<div class="card">
  <div class="card-header" style="background: #343434; color: white">
    Hauptpflanze
  </div>
  <ul v-if="!checkisOFFREADY()" class="list-group list-group-flush" style="">
    <li v-if="!checkisFirstPlantNull()" class="list-group-item">Pflanzenart: <span style="color: red">{{ this.speciesOfFirstPlant }}</span></li>
     <li v-if="checkisFirstPlantNull()" class="list-group-item">Pflanzenart: <span style="color: red">warten</span></li>
    <li v-if="!checkisRecognisedNull()" class="list-group-item">Wiedererkannt an Position: <span style="color: red">{{ this.positionOfRecognizedPlant }}</span></li>
    <li v-if="checkisRecognisedNull()" class="list-group-item">Wiedererkannt an Position: <span style="color: red">...</span></li>
  </ul>

  <ul v-if="checkisOFFREADY()" class="list-group list-group-flush" style="">
    <li class="list-group-item">Pflanzenart: <span style="color: red">Run noch nicht gestartet</span></li>
    <li class="list-group-item">Wiedererkannt an Position: <span style="color: red">warten</span></li>
  </ul>
</div>

</template>

<script>
import { io } from "socket.io-client";

export default {
  name: 'PflanzenComponent',
  data() {
    return {
      socket: io('https://prenf22-edipuma.enterpriselab.ch:8080'),
      positionOfRecognizedPlant: null,
      speciesOfFirstPlant: null,
      run: [],
      currentDevice: {status: "OFF"} 
    }
  },
  created() {
    this.socket.on("addPositionRecognisedPlant", (data) => {
      this.run = data;
      this.positionOfRecognizedPlant = data.positionOfRecognizedPlant;
    });
    this.socket.on("addSpeciesOfFirstPlant", (data) => {
       this.run = data;
       this.speciesOfFirstPlant = data.speciesOfFirstPlant;
    });

    this.socket.on("updateProgress", (data) => {
      console.log(data);
      if (data == 0){
        this.positionOfRecognizedPlant = null;
        this.speciesOfFirstPlant = null;
      }
    });
    this.socket.on("deviceStatusUpdate", (data) => {
      console.log(data);
      this.currentDevice = data;
    });
  },
  mounted() {
    this.getPlantData();
    this.getDeviceData();
  },
  methods: {
    async getPlantData() {
      try {
        let response = await fetch("https://prenf22-edipuma.enterpriselab.ch:8080/currentRun");
        this.run = await response.json();
        this.speciesOfFirstPlant = this.run.speciesOfFirstPlant;
        this.positionOfRecognizedPlant = this.run.positionOfRecognizedPlant;        
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
    },
    checkisOFFREADY(){
      if(this.currentDevice.status == "OFF" || this.currentDevice.status == "READY"){
        return true;
      } else {
        return false;
      }
    },
    checkisFirstPlantNull(){
      if(this.speciesOfFirstPlant == null){
        return true;
      } else {
        return false;
      }
    },
    checkisRecognisedNull(){
      if(this.positionOfRecognizedPlant == null){
        return true;
      } else {
        return false;
      }
    }
    
  }
}
</script>

<style scoped>
.table-dark {
  background-color: #343434
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: left; 
  margin-bottom: 50px
  }
  @media only screen and (max-width: 768px) {
    .card {
  box-shadow: 0;
  margin-bottom: 0;
  border: 0;
    }
    .card-header{
      border:0;
      border-radius: 0;
      width: 100%
    }
  }

</style>
