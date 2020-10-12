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
      const { data } = await axios.get(
        `https://moeller.jinsha.tsukuba.ac.jp/data/curation.json`
      )
      return data
    }
  },

  head() {
    const title = this.label
    const image =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Heratic_script_limestone.jpg/220px-Heratic_script_limestone.jpg'
    const description = 'aaa'
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.url,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
}
</script>
