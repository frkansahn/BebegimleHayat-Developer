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
            <Footer />
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
                    href: 'https://bebegimlehayat.com' + this.$route.path
                }
            ]
        };
    },
    async fetch() {	
        await this.$repositories.setting.getSiteSettings()
            .then(res => {
            if (res) {
                let config = res.data.response[0];
                this.$store.commit("config", config);
                this.$store.commit("product/noImageProduct", config.noImageProduct || "/Data/no-photos.png");
            }
        });

        await this.$repositories.blog_category.getBlogCategory()
        .then(res => {
            this.menus = res.data.response;
        })        
	},
    data() {
        return {
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
    },
    created() {
    }
}
</script>
<style>

</style>