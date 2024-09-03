<script lang="ts">
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      theData: {},
      imgURL: 'https://media.nfsacollection.net/',
      query: 'https://api.collection.nfsa.gov.au/search?query=',
      searchString: 'dog',
      resultSet: []
    }
  },
  methods: {
    fetchData() {
      // use a piece of dynamic data to modify the API call
      let queryString = this.query + this.searchString
      console.log('API call: ' + queryString)
      fetch(queryString)
        .then((response) => {
          // response.json().then(res => console.log(res));
          response.json().then((res) => {
            this.$data.theData = res
            this.$data.resultSet = res.results
            // console.log(res.results)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

    <input v-model="searchString" placeholder="query" />
    <button @click="fetchData">fetch data</button>

    <!-- <p>{{ resultSet[0] }}</p> -->

    <ul role="list" class="list-v">
      <!-- create a variable called result, 
      loop through the API results and add a list item for each result.
      Use result to access properties like 'title' and 'name' -->
      <li v-for="(result, index) in resultSet" :key="result[index]">
        <p>{{ result['title'] }}</p>
        <p>{{ result['name'] }}</p>
        <img v-if="result['preview'][0]" v-bind:src="imgURL + result['preview'][0]['filePath']" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
