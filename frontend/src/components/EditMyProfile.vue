<template>
 <div id="container">
    <h1>You edit your profile</h1>
    <h1>Question n°{{user.userName}}</h1>
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
        <label for="birthdate">Birthdate</label>
        <input
            id="birthdate"
            name="birthdate"
            v-model="user.birthdate"
            type="date"
            :class="{ 'has-error': submitting && invalidAnswer2 }"
            @focus="clearStatus"
        >
    </p>

    <p>
        <label for="gender">Gender</label>
        <input
            id="gender"
            name="gender"
            v-model="user.gender"
            type="text"
            
        >
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
  computed: {
		invalidStatement() {
			return this.question.statement === ''
    },
    invalidAnswer1() {
			return this.question.answer1 === ''
    },
    invalidAnswer2() {
			return this.question.answer2 === ''
		},
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
      const path = 'http://localhost:5000/get_question';
      const payload = {
            idQ: this.idQ
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
            let questions = res.data.questions;
          this.question = questions[0];
          this.getSurveys();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
    onSubmit() {
      event.preventDefault();
      this.submitting = true
      this.clearStatus()
      if (this.invalidStatement||this.invalidAnswer1||this.invalidAnswer2) {
          this.error=true
				return 
		}
      const payload ={
            idQ: this.question.idQ,
            statement: this.question.statement,
            answer1: this.question.answer1,
            answer2: this.question.answer2,
            answer3: this.question.answer3,
            answer4: this.question.answer4,
            answer5: this.question.answer5,
      };
      alert(payload.answer2)
      const path = 'http://localhost:5000/update_question';
      axios.post(path, payload)
        .then((res) => {
            alert(res.data.status);
            const idS = this.survey.idS;
            router.push({ name: 'EditSurvey', params :{
                idS: idS
            } })
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
