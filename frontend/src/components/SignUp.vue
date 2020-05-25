<template>
 <div>
    <h1>Sign up</h1>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >

     <p>
        <label for="Username">Username</label>
        <input
            id="Username"
            name="Username"
            v-model="addUser.Username"
            type="text"
            placeholder="Enter your username"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="FirstName">First Name</label>
        <input
            id="FirstName"
            name="FirstName"
            v-model="addUser.FirstName"
            type="text"
            placeholder="Enter your first name"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="LastName">Last Name</label>
        <input
            id="LastName"
            name="LastName"
            v-model="addUser.LastName"
            type="text"
            placeholder="Enter your last name"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="Birthdate">Birthdate</label>
        <input
            id="Birthdate"
            name="Birthdate"
            v-model="addUser.Birthdate"
            type="date"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="Gender">Gender</label>
        <input type="radio"
            v-model="addUser.Gender"
            id="Gender1"
            name="Gender"
            value="Male">
        <label for="Gender1">Male</label>

        <input type="radio"
            v-model="addUser.Gender"
            id="Gender2"
            name="Gender"
            value="Female">
        <label for="Gender2">Female</label>
    </p>

    <p>
        <label for="Phone">Phone</label>
        <input
            id="Phone"
            name="Phone"
            v-model="addUser.Phone"
            type="text"
            placeholder="Enter your phone"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

     <p>
        <label for="Email">Email</label>
        <input
            id="Email"
            name="Email"
            v-model="addUser.Email"
            type="text"
            placeholder="Enter your Email"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

     <p>
        <label for="Password">Password</label>
        <input
            id="Password"
            name="Password"
            v-model="addUser.Password"
            type="text"
            placeholder="Enter your Password"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

     <p>
        <label for="ConfirmPassword">Confirm your Password</label>
        <input
            id="ConfirmPassword"
            name="ConfirmPassword"
            v-model="addUser.ConfirmPassword"
            type="text"
            placeholder="Enter your ConfirmPassword"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
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
		✅ Survey successfully created
    </p>
 </div>
</template>

<script>
//import axios from 'axios';
import axios from 'axios';
import router from '../router'

export default {
  name: 'SignUp',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      addUser: {
        Username: '',
        FirstName: '',
        LastName: '',
        Birthdate: '',
        Gender: '',
        Phone: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
      },
    };
  },
  computed: {
      invalidUserName() {
			return this.addUser.Username === ''
        },
      invalidFirstName(){
			return this.addUser.FirstName === ''
        },
        invalidLastName() {
			return this.addUser.LastName === ''
        },
        invalidBirthdate() {
			return this.addUser.Birthdate === ''
        },
        invalidPhone() {
			return this.addUser.Phone === ''
        },
        invalidEmail() {
			return this.addUser.Email === ''
        },
        invalidPassword() {
			return this.addUser.Password === ''
        },
        invalidConfirmPassword() {
			return this.addUser.ConfirmPassword === ''
		},
	},
  methods: {

      ConfirmPass()
      {
          var pass = this.addUser.Password;
          var conf = this.addUser.ConfirmPassword;
          if(pass === conf)
          {
              return true;
          }
          return false;
      },

    uniqueUsername(payload) {//check if the username isn't already take by someone else
      const path = 'http://localhost:5000/check_username';
      axios.post(path, payload)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
   
    onSubmit(event) {
        event.preventDefault();
        this.submitting = true
        this.clearStatus()
        if (this.invalidUserName || this.invalidFirstName || this.invalidLastName || this.invalidBirthdate || this.invalidPhone || this.invalidEmail || this.invalidPassword || this.invalidConfirmPassword) {
				this.error = true
				return
        }
        const payload = {
            userName: this.addUser.Username,
            firstName: this.addUser.FirstName,
            lastName: this.addUser.LastName,
            birthdate: this.addUser.Birthdate,
            gender: this.addUser.Gender,
            phone: this.addUser.Phone,
            email: this.addUser.Email,
            password: this.addUser.Password,
        };
        const path = 'http://localhost:5000/add_user';
        axios.post(path, payload)
        .then((res) => {
          console.log(res.data);
          router.push('SignIn');
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    clearStatus() {
			this.success = false
			this.error = false
		}
    
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
