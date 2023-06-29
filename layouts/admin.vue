<template>
    <div :style="styles">
        <div v-if="$nuxt.isOffline">
            <div class="h-100vh d-flex justify-content-center flex-column align-items-center">
                <h3 class="text-night-blue mb-2 font-weight-semibold text-center">
                    İnternet bağlantınızı kontrol ediniz
                </h3>
            </div>
        </div>
        <div v-else>
            <Nuxt v-if="$store.state.config"/>
        </div>
    </div>
</template>
<script>
    export default 
    {
        head() {
            return {
                bodyAttrs: {
                    class: this.$store.state.adminShowLeftMenu ? 'menu-opened' : ''
                },
                link: [
                    { rel: 'icon', type: 'image/x-icon', href: this.favicon }
                ],
            }
        },
        data(){
            return{
                loading:true,
                favicon:'',
                styles:{}
            }
        },        
        async beforeCreate(){
            var _this = this;

            let adminShowLeftMenu = _this.$cookiz.get('a_lm');
            if (adminShowLeftMenu)
                _this.$store.commit("adminShowLeftMenu", adminShowLeftMenu);
            else {
                _this.$store.commit("adminShowLeftMenu", false);
                _this.$cookiz.set('a_lm',false,{
                    path: '/',
                    maxAge: 60 * 60 * 24 * 1
                })
            }

            await _this.$repositories.setting.getSiteSettings()
                .then(res => {
                if (res) {
                    let config = res.data.response[0];
                    _this.$store.commit("config", config);
                    _this.loading = false;
                }
            });
        }
    }
</script>