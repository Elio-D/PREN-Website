<template >
<div class="container-fluid h-100">
 <div class="row justify-content-around">

    <div class="col-5">
      <PflanzenComponent />
    </div>
    <div class="col-5">
      <LogsComponent />
    </div>

  </div>
  </div>
</template>

<script>
import PflanzenComponent from './PflanzenComponent.vue'
import LogsComponent from './LogsComponent.vue'

export default {
  name: 'PflanzenLogsComponent',
  props: {
    msg: String
  },
  components: {
    PflanzenComponent,
    LogsComponent
  }
}
</script>

<style scoped>
.container-fluid {
  padding-top: 20px;
}

.col-1 {
  width: 50px;
}
</style>
