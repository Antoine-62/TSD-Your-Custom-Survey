<template>
  <div id="app">
    <div id="main">
      <NavBar/>
      <router-view/>
   </div>
    <Footer/>
  </div>
</template>

<script>

import NavBar from './components/navBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {  
  NavBar,
  Footer
  }
}
</script>

<style lang="scss">
html,body,#app #main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0px;
    min-height: 100%
}
#app{
  position: relative;
}
#app::after{
  display: block;
  height: 8%; /* Set same as footer's height */
}


Footer{
   position: absolute;
   height: 8%;
   width:100%;
   bottom:0%;
}
body{
    margin: 0px;
}

</style>
