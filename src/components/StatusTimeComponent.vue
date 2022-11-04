<template >
<div class="w-100" id="timeStatus">
<TimeComponent />
<StatusCarComponent />
</div>
</template>

<script>
import TimeComponent from './TimeComponent.vue'
import StatusCarComponent from './StatusCarComponent.vue'

export default {
  name: 'StatusTimeComponent',
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
#timeStatus {
background-color: #FAFAFA; 
height: 100px;
display: flex;
justify-content: space-evenly;
align-items: center;
}
</style>
