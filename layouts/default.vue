<template>
    <div>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KM2FC8D');</script>
        <!-- End Google Tag Manager -->
        <div class="container-fluid">
            <Header :menus="menus"/>
        </div>
        <Nuxt/>
        <div class="container-fluid">
            <render-on-scroll :offset-y="1">
                <Footer/>
            </render-on-scroll>
        </div>
    </div>
</template>
<script>
export default 
{
    head() {
        return {
            link: [
                { rel: "icon", type: "image/x-icon", href: "/Data/favicon-128.png" },
                {
                    rel: 'canonical',
                    href: 'https://www.bebegimlehayat.com' + this.$route.path
                }
            ]
        };
    },
    async fetch() {
		let result = await this.$axios.get('/api/v1/blog_category/getBlogCategory');
        this.menus = result.data.response;
	},
    data() {
        return {
            loading: true,
            favicon: null,
            menus:[]
        }
    },
    computed:{
        LASTADDEDPRODUCT() {
            return this.$store.state.customer.lastAddedProduct
        }
    },
    async beforeCreate() {
        const _this = this;
        if(_this.$route.query.token) {
            _this.$cookiz.set('g_u_t', _this.$route.query.token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 1
            });
            _this.$store.commit("customer/token", _this.$route.query.token);
            _this.$repositories.customer.me(res => {
                if(res && res.result) {
                    _this.$cookiz.set('g_u_i', res.reesult, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 1
                    });
    
                    _this.$store.commit("customer/user", res.reesult);
                    _this.$store.commit("customer/userLoggedIn", res.reesult);
                    
                }
                else {

                }
                _this.$router.replace({'query': null});
            })
            .catch(err => {
                _this.$router.replace({'query': null});
            });
        }

        _this.$store.dispatch("customer/nuxtServerInit");
        await _this.$repositories.setting.getSiteSettings()
            .then(res => {
            if (res) {
                let config = res.data.response[0];
                _this.$store.commit("config", config);
                _this.$store.commit("product/noImageProduct", config.noImageProduct || "/Data/no-photos.png");
                _this.loading = false;
            }
        });
    },
    created() {
    }
}
</script>
<style>
    .loading-general
    {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        z-index: 9999999999;
    }

    .loading-general:after {
        content: '';
        display: block;
        position: absolute;
        z-index: 9;
        background-color: #ff007f;
        width: 30px;
        height: 30px;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        -webkit-animation: preloader 5s linear infinite;
        -moz-animation: preloader 5s linear infinite;
        animation: preloader 5s linear infinite;
    }

    @-webkit-keyframes preloader {
         0% {
             background-color: #ff007f;
             -webkit-transform: scale(0);
             opacity: 1 
        }
         20% {
             background-color: #ff007f;
             -webkit-transform: scale(3);
             opacity: 0 
        }
         20.00001% {
             background-color: #3ea7f3;
             -webkit-transform: scale(0);
             opacity: 1 
        }
         40% {
             background-color: #3ea7f3;
             -webkit-transform: scale(3);
             opacity: 0 
        }
         40.00001% {
             background-color: #79c742;
             -webkit-transform: scale(0);
             opacity: 1 
        }
         60% {
             background-color: #79c742;
             -webkit-transform: scale(3);
             opacity: 0 
        }
         60.00001% {
             background-color: #f57b3d;
             -webkit-transform: scale(0);
             opacity: 1 
        }
         80% {
             background-color: #f57b3d;
             -webkit-transform: scale(3);
             opacity: 0 
        }
         80.00001% {
             background-color: #04d9d9;
             -webkit-transform: scale(0);
             opacity: 1 
        }
         100% {
             background-color: #04d9d9;
             -webkit-transform: scale(3);
             opacity: 0 
        }
    }
     @-moz-keyframes preloader {
         0% {
             background-color: #ff007f;
             -moz-transform: scale(0);
             opacity: 1 
        }
         20% {
             background-color: #ff007f;
             -moz-transform: scale(3);
             opacity: 0 
        }
         20.00001% {
             background-color: #3ea7f3;
             -moz-transform: scale(0);
             opacity: 1 
        }
         40% {
             background-color: #3ea7f3;
             -moz-transform: scale(3);
             opacity: 0 
        }
         40.00001% {
             background-color: #79c742;
             -moz-transform: scale(0);
             opacity: 1 
        }
         60% {
             background-color: #79c742;
             -moz-transform: scale(3);
             opacity: 0 
        }
         60.00001% {
             background-color: #f57b3d;
             -moz-transform: scale(0);
             opacity: 1 
        }
         80% {
             background-color: #f57b3d;
             -moz-transform: scale(3);
             opacity: 0 
        }
         80.00001% {
             background-color: #04d9d9;
             -moz-transform: scale(0);
             opacity: 1 
        }
         100% {
             background-color: #04d9d9;
             -moz-transform: scale(3);
             opacity: 0 
        }
    }
     @keyframes preloader {
         0% {
             background-color: #ff007f;
             transform: scale(0);
             opacity: 1 
        }
         20% {
             background-color: #ff007f;
             transform: scale(3);
             opacity: 0 
        }
         20.00001% {
             background-color: #3ea7f3;
             transform: scale(0);
             opacity: 1 
        }
         40% {
             background-color: #3ea7f3;
             transform: scale(3);
             opacity: 0 
        }
         40.00001% {
             background-color: #79c742;
             transform: scale(0);
             opacity: 1 
        }
         60% {
             background-color: #79c742;
             transform: scale(3);
             opacity: 0 
        }
         60.00001% {
             background-color: #f57b3d;
             transform: scale(0);
             opacity: 1 
        }
         80% {
             background-color: #f57b3d;
             transform: scale(3);
             opacity: 0 
        }
         80.00001% {
             background-color: #04d9d9;
             transform: scale(0);
             opacity: 1 
        }
         100% {
             background-color: #04d9d9;
             transform: scale(3);
             opacity: 0 
        }
    }
</style>