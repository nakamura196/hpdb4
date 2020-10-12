<template>
  <main class="main">
    <h1 class="title">{{ label }}</h1>
    <p class="publishedAt">{{ /*selections.length*/ }}</p>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ payload }) {
    if (payload) {
      return payload
    } else {
      const { data } = await axios.get(`data/curation.json`)
      return data
    }
  },
}
</script>
