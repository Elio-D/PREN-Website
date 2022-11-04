<template>
  <nav class="navbar navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand">Gruppe 1</a>
    <ul class="nav">
  <li class="nav-item">
    <TimeComponent class="d-none d-sm-block d-sm-none d-md-block" />
  </li>
  <li class="nav-item">
   &nbsp;&nbsp;
  </li>
  <li class="nav-item">
    <StatusCarComponent class="d-none d-sm-block d-sm-none d-md-block" />
  </li>
</ul>
    <a class="navbar-brand">Robotanik</a>
  </div>
</nav>
</template>

<script>
import TimeComponent from './TimeComponent.vue'
import StatusCarComponent from './StatusCarComponent.vue'

export default {
  name: 'HeaderComponent',
  props: {
    msg: String
  },
  components: {
    TimeComponent,
    StatusCarComponent
  }
}
</script>

<style scoped>
nav {
  background-color: #343434;
  padding-top: 10px;
  padding-bottom: 10px;
}

.navbar-brand{
  color: white;
  font-size: 25px;
}
.navbar-brand:hover{
  color: white;
  font-size: 25px;
}
</style>
