import colors from 'vuetify/es5/util/colors'
import axios from 'axios'

import md5 from 'crypto-js/md5'

// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/hpdb4/',
        },
      }
    : {}

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - hpdb',
    title: 'hpdb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  ...routerBase,

  generate: {
    async routes() {
      const pages = await axios
        .get('https://moeller.jinsha.tsukuba.ac.jp/data/curation.json')
        .then(function (res) {
          const selections = res.data.selections
          const pages = []
          for (let i = 0; i < selections.length; i++) {
            const selection = selections[i]
            const members = selection.members
            for (let j = 0; j < members.length; j++) {
              const member = members[j]
              const metadataObj = {}
              const metadata = member.metadata
              for (let k = 0; k < metadata.length; k++) {
                const obj = metadata[k]
                metadataObj[obj.label] = obj.value
              }

              const memberId = member['@id']
              const id = md5(memberId)
              console.log({ id })
              // const id = metadataObj.h_sort.replace('/', '_')

              pages.push({
                route: `/${id}`,
                payload: member,
              })
            }
          }
          return pages
        })
      return pages
    },
  },
}
