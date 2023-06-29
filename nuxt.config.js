const axios = require('axios')
const path = require('path')
const fs = require('fs')

export default {
    ssr: true,
    target: 'server',
    server: {
        port: 3000, 
        host: '0.0.0.0',
        timing: false
    },
    loadingIndicator: {
        name: 'cube-grid',
        color: '#007cc2',
        background: '#ffffff'
    },
    loading: {
        color: '#0196aa',
        height: '3px'
    },
    head: {
        title: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat',
        htmlAttrs: {
            lang: 'tr'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { name: 'author', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' },
            { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat' },
            { hid: 'description', name: 'description', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' },
            { hid: 'copyright', name: 'copyright', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' },
            { hid: 'robots', name: 'robots', content: 'index,follow' },
            { property: 'og:image', content: '/Data/bebegimlehayat-logo.svg' },
            { name: 'twitter:image', content: '/Data/bebegimlehayat-logo-svg' },
            { property: 'og:type', content: 'website' },
            { hid: 'og:title', property: 'og:title', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' },
            { hid: 'og:description', property: 'og:description', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' },
            { property: 'og:url', content: 'https://bebegimlehayat.com/' },
            { property: 'og:site_name', content: 'https://bebegimlehayat.com/' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:title', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' },
            { name: 'twitter:description', content: 'Bebeklere Dair Her Şey Burada! | BebeğimleHayat' }
        ],
        script: [
            {
                innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KM2FC8D');
                `
            }
        ],
    },
    env: {
        baseUrl: process.env.NODE_ENV == 'development' ? process.env.BASE_URL : process.env.BASE_PROD_URL
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css','~/assets/scss/fonts.scss', '~/assets/bootstrap.css' ,'~/assets/main.css',
    ],
    plugins: [
        '~/plugins/repositories.js',
        '@/plugins/vue-awesome-swiper',
        '@/plugins/checkIsNullOrEmpty',
        '@/plugins/dateFormat',
        '@/plugins/checkEmail',
        '@/plugins/currency',
        '@/plugins/vue-select',
        '@/plugins/vue-draggable',
        '@/plugins/directives',
        '@/plugins/vue-material-tabs',
        '@/plugins/vue-numeric-directive.js',
        {src:'@/plugins/vue-datetime-picker.js',mode: 'client'},        
        {src:'@/plugins/vue-chart.js',mode: 'client'}
    ],
    components: true,
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        ['cookie-universal-nuxt', { alias: 'cookiz' }],
        'nuxt-purgecss',
        'vue-social-sharing/nuxt'
    ],
    purgeCSS: {
        mode: 'webpack',
        enabled: ({ isDev, isClient }) => (!isDev && isClient),
        paths: [
          'components/**/*.vue',
          'layouts/**/*.vue',
          'pages/**/*.vue',
          'plugins/**/*.js'
        ],
        styleExtensions: ['.css'],
        whitelist: ['body', 'html', 'nuxt-progress'],
        extractors: [
          {
            extractor: content => content.match(/[A-z0-9-:\\/]+/g) || [],
            extensions: ['html', 'vue', 'js']
          }
        ]
    },
    axios: {
        baseURL: process.env.NODE_ENV == 'development' ? process.env.BASE_URL : process.env.BASE_PROD_URL,
        proxyHeaders: false,
        credentials: false
    },
    serverMiddleware: [{ 
        path: '/',
        handler: '~/serverMiddleware/redirects.js'
    }],
    redirect: [
        { from: '^/kullanim-sart-ve-kosullari-bebegimlehayat', to: '/kullanim-sart-ve-kosullari', statusCode: 301 },
        { from: '^/kisisel-verilerin-korunmasi-politikasi-bebegimlehayat', to: '/kisisel-verilerin-korunmasi-politikasi', statusCode: 301 },
        { from: '^/cerez-politikasi-bebegimlehayat', to: '/cerez-politikasi', statusCode: 301 },
        { from: '^/hakkimizda-bebegimlehayat', to: '/hakkimizda', statusCode: 301 }
    ],
    build: {
        extend(config, ctx) {
            if (ctx.isDev) {
              config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
            }
        },
        babel: {
            compact: true,
        },
        loaders: {
            cssModules: {
                modules: {
                    localIdentName: '[hash:base64:4]',
                },
            },
        },

        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
            },
        },

        transpile: ['vee-validate/dist/rules'],

        filenames: {
            app: ({ isDev }) => (isDev ? '[name].js' : 'app.[contenthash].js'),
            chunk: ({ isDev }) => (isDev ? '[name].js' : 'chunk.[contenthash].js'),
            css: ({ isDev }) => (isDev ? '[name].css' : 'main.[contenthash].css'),
            img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]'),
            font: ({ isDev }) =>
                isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
            video: ({ isDev }) =>
                isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]',
        },
    },
    bootstrapVue: {
        icons: true,
        bootstrapCSS: false,
        bootstrapVueCSS: true
    }
}
