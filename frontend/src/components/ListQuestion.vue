<template>
 <div id="container">
    <h1>Survey : {{survey.title}}</h1>
    <button 
        type="button"
        class="btn btn-danger btn-sm"
        @click="onAddQuestion(survey)"
        >
        Add a new question</button>
    <table id="listSurvey">
          <thead>
            <tr>
              <th scope="Question">Question n°</th>
              <th scope="Statement">Statement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(question, index) in questions" :key="index">
              <td>{{ question.number }}</td>
              <td>{{ question.statement }}</td>
              <td>
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onEditQuestion(question)"
                      >
                      Edit</button>
                    <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onDeleteQuestion(question)"
                      >
                      Delete</button>

              </td>
            </tr>
          </tbody>
        </table>
 </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'ListQuestion',
  data() {
    return {
      idS: '',
      survey: '',
      questions: [],
    };
  },   
  methods: {
    onAddQuestion(survey){
      const idS = survey.idS
        router.push({ name: 'AddQuestion', params : {
          idS: idS,
          }
        })
    },
    getSurveys() {
      const path = 'http://localhost:5000';
      const payload = {
            idS: this.idS
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          let surveys = res.data.surveys;
          this.survey=surveys[0];
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
    getQuestions() {
      const path = 'http://localhost:5000/get_question';
      const payload = {
            idS: this.idS
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          this.questions = res.data.questions;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },

    onEditQuestion(question) {
        const idQ = question.idQ
        router.push({ name: 'EditQuestion', params : {
          idQ: idQ
          }
        })
    },


  onDeleteQuestion(question) {
    const path = `http://localhost:5000/delete_question`;
    const payload = {
            idQ: question.idQ
        };
    axios.post(path, payload)
    .then(() => {
        this.getSurveys();
        this.getQuestions();
      
    })
    .catch((error) => {
      // eslint-disable-next-line
        console.error(error);
    });
   },
 
  
 },
created() {
    this.idS=this.$route.params.idS;
    this.getSurveys()
    this.getQuestions();
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
</style>
