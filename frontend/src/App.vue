<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>

import NavBar from './components/navBar.vue'

export default {
  name: 'app',
  components: {  
	NavBar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

}
</style>
