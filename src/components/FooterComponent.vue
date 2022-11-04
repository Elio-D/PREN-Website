<template>
  <nav class="navbar navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand"></a>
    <a class="navbar-brand">PREN2</a>
  </div>
</nav>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: {
    msg: String
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
  font-size: 12px;
}

.navbar-brand:hover{
  color: white;
  font-size: 12px;
}
</style>
