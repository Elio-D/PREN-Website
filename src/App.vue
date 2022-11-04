<template>
<div id="page-container">
   <div id="content-wrap">
  <HeaderComponent/>
  <StatusTimeComponent class="d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-print-none" />
  <StandortComponent/>
  <PflanzenLogsComponent class="d-none d-sm-block d-sm-none d-md-block" />
  <PflanzenComponent class="d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-print-none"/>
  <LogsComponent class="d-md-none d-lg-block d-lg-none d-xl-block d-xl-none d-print-none"/>
  </div>
  <FooterComponent id="fixed-bottom"/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import StatusTimeComponent from './components/StatusTimeComponent.vue'
import StandortComponent from './components/StandortComponent.vue'
import PflanzenComponent from './components/PflanzenComponent.vue'
import LogsComponent from './components/LogsComponent.vue'
import PflanzenLogsComponent from './components/PflanzenLogsComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    StatusTimeComponent,
    StandortComponent,
    FooterComponent,
    PflanzenComponent,
    LogsComponent,
    PflanzenLogsComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#page-container {
  position: relative;
  min-height: 100vh;
}

#content-wrap {
  padding-bottom: 2.5rem;    /* Footer height */
}

#fixed-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}
</style>
