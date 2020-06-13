<template>
 <div id="container">
    <h1>You are editing your profile</h1>
    <h1>User {{user.userName}}</h1>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >
    <p>
        <label for="firstName">First Name</label>
        <input
            id="firstName"
            name="firstName"
            v-model="user.firstName"
            type="text"
            :class="{ 'has-error': submitting && invalidStatement }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="LastName">Last Name</label>
        <input
            id="LastName"
            name="LastName"
            v-model="user.lastName"
            type="text"
            :class="{ 'has-error': submitting && invalidAnswer1 }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="birthdate">Gender</label>
        <input
            id="birthdate"
            name="birthdate"
            v-model="user.birthdate"
            type="date"
            
        >
    </p>

    <p>
        <label for="Gender">Gender</label>
        <input type="radio"
            v-model="user.gender"
            id="Gender1"
            name="Gender"
            value="Male">
        <label for="Gender1">Male</label>

        <input type="radio"
            v-model="user.gender"
            id="Gender2"
            name="Gender"
            value="Female">
        <label for="Gender2">Female</label>
    </p>


    <p>
        <label for="phone">Phone</label>
        <input
            id="phone"
            name="phone"
            v-model="user.phone"
            type="text"
            
        >
    </p>

    <p>
        <label for="email">Email</label>
        <input
            id="email"
            name="email"
            v-model="user.email"
            type="text"
            
        >
    </p>

    <p>
        <input
            class="btn btn-danger btn-sm"
            type="submit"
            value="Submit"
        >
    </p>

    </form>
    <p v-if="error" class="error-message">
		❗Please fill out all required fields
    </p>
    <p v-if="success" class="success-message">
		✅ Question successfully edited
    </p>
  
 </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import swal from 'sweetalert';

export default {
  name: 'EditMyProfile',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      idU: '',
      user: {
        idU: '',
        userName: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        gender: '',
        phone: '',
        email: '',
      }
    };
  },   
  methods: {
    getSurveys() {
      const path = 'http://localhost:5000';
      const payload = {
            idS: this.question.idS
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          let surveys = res.data.surveys;
          this.survey=surveys[0];
        })
        .catch((error) => {
          console.error(error.response);
        });
    },
    getUser() {
      this.user.idU=this.$store.state.user.idU;
      this.user.userName=this.$store.state.user.userName;
      this.user.firstName=this.$store.state.user.firstName;
      this.user.lastName=this.$store.state.user.lastName;
      this.user.birthdate=this.$store.state.user.birthdate;
      this.user.gender=this.$store.state.user.gender;
      this.user.phone=this.$store.state.user.phone;
      this.user.email=this.$store.state.user.email;

    },
    onSubmit() {
      event.preventDefault();
      const payload ={
            idU: this.user.idU,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            birthdate: this.user.birthdate,
            gender: this.user.gender,
            phone: this.user.phone,
            email: this.user.email
      };
      this.$store.dispatch('editUser', payload)
       .then(() => { 
         swal("Congratulations!", "You have edited your profile");
         router.push({ name: 'myProfile'})})
       .catch(err => console.log(err))
     
    },

    clearStatus() {
			this.success = false
			this.error = false
		}

 
  
 },
created() {
    this.idU=this.$route.params.idU;
    this.getUser();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container{
  width: 100%;
  font-size: 20px;
}
#listSurvey {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 70%;
  margin: 5% 15%;
}
button{
  margin: 2%;
}
[class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }

  .has-error{
    border: 1px solid #d33c40;
  }
</style>
