<template>
 <div id="container">
    <h1>Surveys List</h1>
    <label>Search : </label><input type="text" v-model="search" placeholder="Search title.."/><br/><br/>
    <label>Category : </label><select
            id="Category"
            name="Category"
            v-model="searchCategory"
            required
            placeholder="Choose category"
        >
            <option></option>
            <option>Cultural(movies, books ...)</option>
            <option>Health</option>
            <option>History</option>
            <option>Policy</option>
        </select>
    <table id="listSurvey">
          <thead>
            <tr>
              <th scope="Title">Title</th>
              <th scope="Categorie">Author</th>
              <th scope="Number">Number of question</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(survey, index) in filteredList" :key="index">
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
  name: 'ListSuverys',
  data() {
    return {
      search: '',
      searchCategory: '',
      surveys: [],
    };
  },
  computed: {
    filteredList() {
      return this.surveys.filter(post => {
        let name1=post.title.toLowerCase()
        let name2=this.search.toLowerCase()
        let category1=post.category.toLowerCase()
        let category2=this.searchCategory.toLowerCase()
        let name1Split=name1.split("")
        let name2Split=name2.split("")
        if(name2 !== '')
        {
            for(var i=0; i<name1Split.length;i++)
            {
                if (name2Split[i] === (name1Split[i])) {
                  return post;
                } 
            }
            return null
        }
        if(category2 !== '')
        {
            if(category1 === category2)
            {
               return post;
            }
            return null
        }
        else{
          return post;
        }
      })
    }
  },
  methods: {
    getSurveys() {
      const path = 'http://localhost:5000';
      axios.get(path)
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
        router.push({ name: 'Vote', params :{
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
         router.push({ name: 'Consult', params :{
          idS: idS,
          title: title,
          category: category
      } })
    },
  
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
