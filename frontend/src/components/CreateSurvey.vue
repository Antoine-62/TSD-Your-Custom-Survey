<template>
 <div>
    <h1>New Survey</h1>
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >
    <p>
        <label for="name">Name of the Survey</label>
        <input
            id="name"
            name="name"
            v-model="addSurveyForm.title"
            type="text"
            placeholder="Enter name"
            :class="{ 'has-error': submitting && invalidTitle }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <label for="movie">Category</label>
        <select
            id="Category"
            name="Category"
            v-model="addSurveyForm.category"
            required
            placeholder="Choose category"
        >
            <option>Cultural(movies, books ...)</option>
            <option>Health</option>
            <option>History</option>
            <option>Policy</option>
        </select>
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
import router from '../router'

export default {
  name: 'CreateSurvey',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      addSurveyForm: {
        title: '',
        category: '',
      },
    };
  },
  computed: {
		invalidTitle() {
			return this.addSurveyForm.title === ''
		},
	},
  methods: {
   
    onSubmit(event) {
        event.preventDefault();
        this.submitting = true
        this.clearStatus()
        if (this.invalidTitle) {
				this.error = true
				return
			}
      const title =  this.addSurveyForm.title;
      const category = this.addSurveyForm.category;
      router.push({ name: 'CreateQuestion', params :{
          title: title,
          category: category
      } })
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
