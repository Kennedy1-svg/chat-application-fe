export default {
  // Target
  target: 'server', // or 'static' for static site generation
  
  // Global page headers
  head: {
    title: 'my-nuxt-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [],

  // Plugins
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules
  modules: [],

  // Build Configuration
  build: {}
}