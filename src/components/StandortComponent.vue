<template>
<div class="card">
  <div class="card-header d-none d-sm-block d-sm-none d-md-block" style="background: #343434; color: white; text-align: left">
    Standort
  </div>
  <div class="progress0" v-if="currentRun.progress == 0">
    <div class="container-fluid" id="Standort">
      <div class="row align-items-center" id="box">
        <div class="col-2">
          <i class="bi bi-flag" id="waitToGetPass"></i><br>
          <p>Start</p>
        </div>
        <div class="col">
          <i class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower1" id="waitToGetPass"></i><br>
          <p>1.&nbsp;Pflanze</p>
        </div>
        <div class="col">
          <i class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower2" id="waitToGetPassZBS"></i>
          <i class="bi bi-flower1" id="waitToGetPassLoadCheck"></i>
          <i class="bi bi-flower3" id="waitToGetPassZBS"></i><br>
           <p>Zielbereich</p>
        </div>
        <div class="col">
          <i class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flag-fill" id="waitToGetPass"></i><br>
          <p>Finish</p>
        </div>
      </div>
    </div>
  </div>

  <div class="progress1" v-if="currentRun.progress == 1" >
    <div class="container-fluid" id="Standort">
      <div class="row align-items-center" id="box">
        <div class="col-2">
          <i class="bi bi-flag" id="passed"></i><br>
          <p>Start</p>
        </div>
        <div class="col">
          <div v-if="!checkisStopped()" class="spinner-border" id="load" role="status">
             </div>
             <i v-if="checkisStopped()" class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower1" id="waitToGetPass"></i><br>
          <p>1.&nbsp;Pflanze</p>
        </div>
        <div class="col">
          <i class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower2" id="waitToGetPassZBS"></i>
          <i class="bi bi-flower1" id="waitToGetPassLoadCheck"></i>
          <i class="bi bi-flower3" id="waitToGetPassZBS"></i><br>
           <p>Zielbereich</p>
        </div>
        <div class="col">
          <i class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flag-fill" id="waitToGetPass"></i><br>
          <p>Finish</p>
        </div>
      </div>
    </div>
  </div>

  <div class="progress2" v-if="currentRun.progress == 2">
    <div class="container-fluid" id="Standort">
      <div class="row align-items-center" id="box">
        <div class="col-2">
          <i class="bi bi-flag" id="passed"></i><br>
          <p>Start</p>
        </div>
        <div class="col">
          <i class="bi bi-check-circle-fill" id="passedLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower1" id="passed"></i><br>
          <p>1.&nbsp;Pflanze</p>
        </div>
        <div class="col">
          <div v-if="!checkisStopped()" class="spinner-border" role="status">
          </div>
          <i v-if="checkisStopped()" class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower2" id="waitToGetPassZBS"></i>
          <i class="bi bi-flower1" id="waitToGetPassLoadCheck"></i>
          <i class="bi bi-flower3" id="waitToGetPassZBS"></i><br>
           <p>Zielbereich</p>
        </div>
        <div class="col">
          <i class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flag-fill" id="waitToGetPass"></i><br>
          <p>Finish</p>
        </div>
      </div>
    </div>
  </div>
  <div class="progress3" v-if="currentRun.progress == 3">
    <div class="container-fluid" id="Standort">
      <div class="row align-items-center" id="box">
        <div class="col-2">
          <i class="bi bi-flag" id="passed"></i><br>
          <p>Start</p>
        </div>
        <div class="col">
          <i class="bi bi-check-circle-fill" id="passedLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower1" id="passed"></i><br>
          <p>1.&nbsp;Pflanze</p>
        </div>
        <div class="col">
          <i class="bi bi-check-circle-fill" id="passedLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower2" id="passedZBS"></i>
          <i class="bi bi-flower1" id="passedLoadCheck"></i>
          <i class="bi bi-flower3" id="passedZBS"></i><br>
           <p>Zielbereich</p>
        </div>
        <div class="col">
          <div v-if="!checkisStopped()" class="spinner-border" role="status">
          </div>
          <i v-if="checkisStopped()" class="bi bi-arrow-right-circle-fill" id="waitToGetPassLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flag-fill" id="waitToGetPass"></i><br>
          <p>Finish</p>
        </div>
      </div>
    </div>
  </div>
  <div class="progress5" v-if="currentRun.progress == 5">
    <div class="container-fluid" id="Standort">
      <div class="row align-items-center" id="box">
        <div class="col-2">
          <i class="bi bi-flag" id="passed"></i><br>
          <p>Start</p>
        </div>
        <div class="col">
          <i class="bi bi-check-circle-fill" id="passedLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower1" id="passed"></i><br>
          <p>1.&nbsp;Pflanze</p>
        </div>
        <div class="col">
          <i class="bi bi-check-circle-fill" id="passedLoadCheck"></i><br>
        </div>
        <div class="col-2">
          <i class="bi bi-flower2" id="passedZBS"></i>
          <i class="bi bi-flower1" id="passedLoadCheck"></i>
          <i class="bi bi-flower3" id="passedZBS"></i><br>
           <p>Zielbereich</p>
        </div>
        <div class="col">
          <i class="bi bi-check-circle-fill" id="passedLoadCheck"></i><br>
          
        </div>
        <div class="col-2">
          <i class="bi bi-flag-fill" id="passed"></i><br>
          <p>Finish</p>
        </div>
      </div>
    </div>
  </div>
</div>


</template>

<script>
import { io } from "socket.io-client";

export default {
  name: 'StandortComponent',
  data() {
    return {
      socket: io('https://prenf22-edipuma.enterpriselab.ch:8080'),
      currentRun: {progress: 0},
      currentDevice: {status: "OFF"}   
    }
  },
  created() {
    this.socket.on("updateProgress", (data) => {
      console.log(data);
      this.currentRun = {progress: data};
    });
    this.socket.on("deviceStatusUpdate", (data) => {
      console.log(data);
      this.currentDevice = data;
    });
  },
  mounted() {
    this.getProgressData();
    this.getDeviceData();
  },
  methods: {
    checkisStopped(){
      if(this.currentDevice.status == "STOPPED"){
        return true;
      } else {
        return false;
      }
    },
    async getProgressData(){
      try {
        let response = await fetch("https://prenf22-edipuma.enterpriselab.ch:8080/currentProgress");
        this.currentRun = await response.json();
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
#Standort {
background-color: white; 
}
#passed {
color: green;
font-size: 50px
}

#passedLoadCheck {
color: green;
font-size: 30px
}

#passedZBS {
color: green;
font-size: 20px
}

#waitToGetPass {
color: gray;
font-size: 50px
}

#waitToGetPassLoadCheck {
color: gray;
font-size: 30px
}

#waitToGetPassZBS {
color: gray;
font-size: 20px;
}

#box {
  height: 250px;
}

.card {
  margin: 50px 50px 20px 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media only screen and (max-width: 768px) {
p {
  font-size: 7px;
}

.card {
  margin: 0 0 0 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

#Standort {
background-color: #E0E0E0; 
}

#box {
  height: 120px;
}

#passed {
color: green;
font-size: 30px
}

#passedLoadCheck {
color: green;
font-size: 15px
}

#passedZBS {
color: green;
font-size: 10px
}


#waitToGetPass {
color: gray;
font-size: 30px
}

#waitToGetPassLoadCheck {
color: gray;
font-size: 15px
}

#waitToGetPassZBS {
color: gray;
font-size: 10px
}

.spinner-border {
    width: 15px; 
    height: 15px;
}
}

</style>
