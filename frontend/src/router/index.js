import Vue from 'vue'
import VueRouter from 'vue-router'
import ListSuveys from '../components/ListSurveys.vue'
import CreateSurvey from '../components/CreateSurvey.vue'
import CreateQuestion from '../components/CreateQuestion.vue'
import Vote from '../components/Vote.vue'
import Consult from '../components/Consult.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: ListSuveys
  },
  {
    path: '/CreateSurvey',
    component: CreateSurvey
  },
  {
    path: '/CreateQuestion/:category/:title',
    name: 'CreateQuestion',
    component: CreateQuestion,
    props: true
  },
  {
    path: '/Vote/:category/:title/:numberOfQuestion/:idS',
    name: 'Vote',
    component: Vote,
    props: true
  },
  {
    path: '/Consult/:category/:title/:idS',
    name: 'Consult',
    component: Consult,
    props: true
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
