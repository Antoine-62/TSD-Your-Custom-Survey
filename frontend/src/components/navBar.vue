//src/components/Navbar.vue
<template>
    <div>
      <b-navbar toggleable="sm" type="dark" class="border-bottom border-light" variant="dark">
            <b-navbar-brand>
				Your customed Survey
			</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav id="router">
				<router-link to="/">Surveys List</router-link> <span>|</span>
                <router-link to="/CreateSurvey">Create a Survey</router-link>
             </b-navbar-nav>
            </b-collapse>
                 <b-collapse id="nav-collapse 2" is-nav>
                 <b-navbar-nav class ="ml-auto"> 
                 
                    <b-nav-item href="#">Sign in</b-nav-item>
                    <b-nav-item href="#">Sign up</b-nav-item>
     
              </b-navbar-nav>
            </b-collapse>
      </b-navbar>
    </div>  
</template>
<script>
export default {
 
}    
</script>

<style lang="scss">

  a {
    font-weight: bold;
    color: #2c3e50;


    &.router-link-exact-active {
      color: #92b7e7;
    }
  }

  #router{
      text-align: center;
  }

</style>