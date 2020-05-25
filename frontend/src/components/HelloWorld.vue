<template>
  <div class="hello">
    <h1>What is YCS ?</h1>
    <h2>An application to create surveys</h2>
    <h3>YCS (acronym for Your Custom Survey) is an application which will allow you to create your own survey :</h3>
    <ul>
      <li>For each survey, you can create unlimited number of questions</li>
      <li>For each question, you can create 5 answers, and precise if it's multiple or unique answer</li>
      <li>Get the results for each of your surveys</li>
    </ul>
    <h3>The teams</h3>
    <ul>
      <li>Antoine Landrieu</li>
      <li>Thomas Gurtler</li>
    </ul>
    <h3>Technologies used</h3>
    <ul>
      <li>Frontend : Vue.js</li>
      <li>Backend : Flask</li>
      <li>Database : Sqlite</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
</style>
