<template>
 <div id="container">
   <h1>User list</h1>

    <table id="listSurvey">
          <thead>
            <tr>
              <th scope="Username">Username</th>
              <th scope="Firstname">First Name</th>
              <th scope="Lastnamr">Last Name</th>
              <th scope="Birthdate">Birthdate</th>
              <th scope="Gender">Gender</th>
              <th scope="Phone">Phone</th>
              <th scope="Email">Email</th>
              <th scope="Password">Password</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userList" :key="index">
              <td>{{ user.userName }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }} </td>
              <td>{{ user.birthdate }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.phone }} </td>
              <td>{{ user.email }}</td>
              <td>{{ user.password }}</td>
              <td>
                <button 
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteUser(user)"
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

export default {
  name: 'ListUsers',
  data() {
    return {
      userList: [],
    };
  },
  methods: {

    getUsers(){
      const path = 'http://localhost:5000/get_user';
      axios.get(path)
        .then((res) => {
            console.log(res);
          this.userList = res.data.users;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },

    onDeleteUser(user){
        const path = `http://localhost:5000/delete_user`;
        const payload = {
            idU: user.idU
        };
        axios.post(path, payload)
      .then(() => {
          this.getUsers();
      
      })
      .catch((error) => {
          console.error(error);
    });
    },

  
 },
created() {
    this.getUsers();
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
