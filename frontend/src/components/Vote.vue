<template>
 <div>
    <h1>Title : {{this.titleSurvey}}</h1>
    <h1>Category : {{this.category}}</h1>
    <h2>Question n°{{question.number}}</h2>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >
    <h3>{{question.statement}}</h3>

    <p>
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer1"
            name="answer"
            :value="question.answer1">
        <label for="Answer1">{{question.answer1}}</label>
    </p>

    <p>
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer2"
            name="answer"
            :value="question.answer2">
        <label for="Answer2">{{question.answer2}}</label>
    </p>

    <p v-if="question.answer3 !== ''">
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer3"
            name="answer"
            :value="question.answer3">
        <label for="Answer3">{{question.answer3}}</label>
    </p>

    <p v-if="question.answer4 !== ''">
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer4"
            name="answer"
            :value="question.answer4">
        <label for="Answer4">{{question.answer4}}</label>
    </p>

    <p v-if="question.answer5 !== ''">
        <input type="radio"
            v-model="addVoteForm.Answer"
            id="Answer5"
            name="answer"
            :value="question.answer5">
        <label for="Answer5">{{question.answer5}}</label>
    </p>

    <p>
        <input
            type="submit"
            value="Submit"
        >
    </p>

    </form>

    <p v-if="error" class="error-message">
		❗Please answer to the question before submit
    </p>
 </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import swal from 'sweetalert';

export default {
  name: 'Vote',
  data() {
    return {
        submitting: false,
        error: false,
        success: false,
        titleSurvey: '',
        category: '',
        numberOfQuestion: '',
        number: '',
        questions: [],
        question: '',
        addVoteForm: {
            Answer: '',
      }
    }
  },
  computed: {
		invalidAnswer() {
			return this.addVoteForm.Answer === ''
    },
  },
  methods: {

    initForm() {
      this.clearStatus()
      this.submitting=false;
      this.addVoteForm.Answer = '';

    },

    addVote(payload) {
      const path = 'http://localhost:5000/add_vote';
      axios.post(path, payload)
        .then((res) => {
           console.log(res.data.status);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    getQuestions(idS) {
        const payload ={
            idS: idS,
      };
      const path = 'http://localhost:5000/get_question';
      axios.post(path, payload)
        .then((res) => {
          this.questions = res.data.questions;
          this.question = this.questions[0];
          console.log(res.data.questions);
        })
        .catch((error) => {
          console.error(error.response);
        });
    },

    onSubmit(event) {
        event.preventDefault();
        this.submitting = true
        this.clearStatus()
        if (this.invalidAnswer) {
          this.error=true
				return 
			}
        
        const payload = {
            answer: this.addVoteForm.Answer,
            idQ: this.question.idQ,
            idU: 1,
        };
        this.addVote(payload);
      this.initForm();
      this.number = this.question.number;
      if(this.number < this.numberOfQuestion)
      {
          let index = this.number;//in array, the index begin to 0, and our question number begin to 1
          this.question = this.questions[index];
      }
      else
      {
          swal("Survey completed!", "Thank you :)");
          router.push({ path: '/'})
      }
    },
    clearStatus() {
			this.success = false
			this.error = false
		}
    
  },
  created() {
    this.titleSurvey=this.$route.params.title;
    this.category=this.$route.params.category;
    this.numberOfQuestion=this.$route.params.numberOfQuestion;
    this.getQuestions(this.$route.params.idS)
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
