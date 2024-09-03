<script lang="ts">
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      theData: {},
      tempData: {},
      resultSet: [],
      tempResultSet: [],
      currentPage: 1,
      total: 0,
      imgURL: 'https://media.nfsacollection.net/',
      query: 'https://api.collection.nfsa.gov.au/search?limit=25&query=',
      searchString: 'dog'
    }
  },
  methods: {
    fetchData() {
      // use a piece of dynamic data to modify the API call
      let queryString = this.query + this.searchString + '&page=' + this.currentPage
      console.log('API call: ' + queryString)
      fetch(queryString)
        .then((response) => {
          response.json().then((res) => {
            this.$data.tempData = { ...this.$data.tempData, ...res }
            this.$data.tempResultSet = this.$data.tempResultSet.concat(res.results)
            this.$data.total = res.meta.count.total
            // check how many pages of results @ 25 per page
            if (this.$data.total > 0) {
              if (this.currentPage * 25 < 500 && this.currentPage * 25 < this.$data.total) {
                this.currentPage++
                this.fetchData()
              } else {
                this.$data.theData = this.$data.tempData
                this.$data.tempData = {}
                this.$data.resultSet = this.$data.tempResultSet
                this.$data.tempResultSet = []
                // all items loaded, reset page, ready for next query
                this.currentPage = 1
                console.log('Pages: ' + Math.ceil(this.$data.total / 25))
                console.log('finished')
              }
            } else {
              console.log('no results')
            }
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

    <p>Total: {{ total }}</p>

    <ul role="list" class="list-v">
      <!-- create a variable called result, 
      loop through the API results and add a list item for each result.
      Use result to access properties like 'title' and 'name' -->
      <li v-for="(result, index) in resultSet" :key="result[index]">
        <!-- <p>{{ result['title'] }}</p> -->
        <!-- <p>{{ result['name'] }}</p> -->
        <!-- check if there's any items in the preview array.  If so, put the biggest image in the view -->
        <!-- v-bind is used to update the src attribute when the data comes in -->
        <img
          v-if="result['preview'] && result['preview'][0]"
          v-bind:src="imgURL + result['preview'][0]['filePath']"
          v-bind:alt="result['name']"
          v-bind:title="result['name']"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
img {
  display: inline-block;
  max-width: 200px;
}

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

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
