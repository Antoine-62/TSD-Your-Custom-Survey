<template>
 <div>
    <h1>My profile</h1>
    <p> Username : {{ $store.state.user.userName }}</p>
    <p> First Name : {{ $store.state.user.firstName }}</p>
    <p> Last Name : {{ $store.state.user.lastName }}</p>
    <p> Birthdate : {{ $store.state.user.birthdate }}</p>
    <p> Gender : {{ $store.state.user.gender }}</p>
    <p> Phone : {{ $store.state.user.phone }}</p>
    <p> Email : {{ $store.state.user.email }}</p>
    <button 
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onEditUser(user)"
                    >
                    Edit my profile</button>

    <h1>My Surveys</h1>
    <div v-if="surveys[0]">
    <table id="listSurvey">
          <thead>
            <tr>
              <th scope="Title">Title</th>
              <th scope="Categorie">Categorie</th>
              <th scope="Number">Number of question</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(survey, index) in surveys" :key="index">
              <td>{{ survey.title }}</td>
              <td>{{ survey.category }}</td>
              <td>{{ survey.nbOfQuestions }} </td>
              <td>
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onVoteSurvey(survey)"
                      >
                      Vote</button>
                
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onResultSurvey(survey)"
                      >
                      Result</button>
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onDeleteSurvey(survey)"
                      >
                      Delete</button>
                  <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onDownloadSurvey(survey)">
                      Download</button>
                </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div v-else>
      <h3>You didn't create any survey yet</h3>
    </div>
 </div>
</template>

<script>
import axios from 'axios';
//import router from '../router';

export default {
  name: 'MyProfile',
  data() {
    return {
      surveys: [],
    };
  },
  methods: {
    getSurveys() {
      const path = 'http://localhost:5000';
      const payload = {
            idU: this.$store.state.user.idU
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          this.surveys = res.data.surveys;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },

  removeSurvey(SurveyId) {
    const path = `http://localhost:5000/delete_survey`;
    console.log(SurveyId)
    const payload = {
            idS: SurveyId
        };
    axios.post(path, payload)
    .then(() => {
        this.getSurveys();
      
    })
    .catch((error) => {
      // eslint-disable-next-line
        console.error(error);
    });
   },

  onDeleteSurvey(survey) {
        this.removeSurvey(survey.idS);
    },

    onVoteSurvey(survey) {
        const idS = survey.idS;
        const title =  survey.title;
        const category = survey.category;
        const number = survey.nbOfQuestions;
        this.$router.push({ name: 'Vote', params :{
          idS: idS,
          title: title,
          category: category,
          numberOfQuestion: number
      } })
    },

    onResultSurvey(survey){
        const idS = survey.idS;
        const title =  survey.title;
        const category = survey.category;
        this.$router.push({ name: 'Consult', params :{
          idS: idS,
          title: title,
          category: category
      } })
    },

    onEditUser(){
      const idU = this.$store.state.user.idU;
        this.$router.push({ name: 'EditMyProfile', params :{
          idU: idU
        } })
    },

    downloadSurvey(SurveyId){
        const path = `http://localhost:5000/download_survey`;
        const payload = {
            idS: SurveyId
        };
        axios.post(path, payload)
        .then(() => {
        this.getSurveys();

        })
        .catch((error) => {
          // eslint-disable-next-line
            console.error(error);
        });
    },

    onDownloadSurvey(survey){
        this.downloadSurvey(survey.idS)
    }
  
 },
created() {
    this.getSurveys();
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
