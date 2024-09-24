import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchDataStore = defineStore('searchData', () => {
  const theStoredData = ref([])
  function $reset() {
    theStoredData.value = []
  }
  return { theStoredData, $reset }
})

// export const useSearchDataStore = defineStore('searchData', {
//   // arrow function recommended for full type inference
//   state: () => {
//     return {
//       theStoredData: []
//     }
//   }
// })

// options style
// export const useSearchDataStore = defineStore('searchData', {
//   state: () => ({}),
//   getters: {
//     fullData: (state) => state,
//   },
//   actions: {
//     setData( dataIn: {} ) {
//       this.state = dataIn
//     },
//   },
// })
