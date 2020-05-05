<template>
 <div>
    <h1>Title : {{this.titleSurvey}}</h1>
    <h1>Category : {{this.category}}</h1>
    
    <div v-for="(question, index) in questions" :key="index">
        <h2>Question n°{{ question.number }}</h2>
        <h2>Number of votes : {{ TotalAnswer(question.idQ) }}</h2>
        <h2>{{ question.statement }}</h2>
        <ul>
            <li>{{question.answer1}} : {{countAnswer(question.idQ,question.answer1)}}%</li>
            <li>{{question.answer2}} : {{countAnswer(question.idQ,question.answer2)}}%</li>
            <li v-if="question.answer3 !== ''">{{question.answer3}} : {{countAnswer(question.idQ,question.answer3)}}%</li>
            <li v-if="question.answer4 !== ''">{{question.answer4}} : {{countAnswer(question.idQ,question.answer4)}}%</li>
            <li v-if="question.answer5 !== ''">{{question.answer5}} : {{countAnswer(question.idQ,question.answer5)}}%</li>
        </ul>
              
    </div>

 </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Consult',
  data() {
    return {
        idS: '',
        titleSurvey: '',
        category: '',
        questions: [],
        votes: [],
    };
  },
  methods: {

    countAnswer(idQ, answer)
    {
        var counter = 0;
        var counterTotal=0;
        var countPerCent;
        this.votes.map(vote=>{
            if(vote.idQ === idQ){
                if(vote.answer === answer)
                {
                    counter++;
                }
            counterTotal++;
            }
        })
        if(counterTotal === 0)//to avoid error if there is no vote for a question
        {
            counterTotal = 1;
        }
        countPerCent = (counter/counterTotal)*100;
        return countPerCent;
    },

    TotalAnswer(idQ)
    {
        var counterTotal=0;
        this.votes.map(vote=>{
          if(vote.idQ === idQ){
            counterTotal++;
          }
        })
        return counterTotal;
    },

    getVotes(idS){
        const path = 'http://localhost:5000/vote';
         const payload ={
            idS: idS,
      };
      axios.post(path, payload)
        .then((res) => {
            console.log(res.data.votes);
          this.votes = res.data.votes;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },
    getQuestions(idS) {
      const path = 'http://localhost:5000/get_question';
      const payload ={
            idS: idS,
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
  
 },
created() {
    this.idS=this.$route.params.idS,
    this.titleSurvey=this.$route.params.title;
    this.category=this.$route.params.category;
    this.getVotes(this.idS);
    this.getQuestions(this.idS);
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
