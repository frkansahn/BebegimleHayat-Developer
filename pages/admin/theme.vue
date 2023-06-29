<template>
   <div class="admin-theme" id="adminTheme">
        <AdminHeader/>      
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <h3>TEMALAR</h3>
                </div>
                <div class="col-12 position-relative">
                    <b-overlay :show="selectedThemeOverlay" no-wrap></b-overlay>
                    <div class="row">
                        <span class="col-2 py-4 px-3 shadow mx-3 btn" v-for="(T,index) in theme.theme" :key="`theme${index}`" :class="[theme.selected.theme.split('/')[1] == T ? 'btn-success': 'btn-light']" @click="selectTheme(T)">
                            TEMA : {{T}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    export default 
    {
        name:'AdminTheme',
        layout:'admin',
        head() {
            return {
                title: "Admin Tema Ayarlama Sayfası"
            }
        },
        data() {
            return {
                theme:[],
                selectedThemeOverlay:false
            }
        },
        methods:{
            async getTheme(){
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/theme/getTheme" , "token": token})
                .then(response => {
                      if(response)
                      {
                         _this.theme = response;
                      }
                   
                });
            },
            async selectTheme(theme){
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
                   size: 'sm',
                   buttonSize: 'sm',
                   okVariant: 'success',
                   okTitle: 'Evet',
                   cancelVariant:'danger',
                   cancelTitle: 'Hayır',
                   footerClass: 'py-2 px-4',
                   hideHeaderClose: false
                })
                .then(value => {
                    if(value)
                    {    
                        _this.selectedThemeOverlay = true;
                        _this.$store.dispatch('postService' , {"data":{"theme":"theme/" + theme} , "urlParameter":"/api/v1/theme/add", "token":token})
                        .then(response => {
                            if(response.success == "success")
                            {
                                this.$bvToast.toast('Tema başarıyla değiştirildi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 3000,
                                    solid: true
                                });

                                setTimeout(() => {   
                                    _this.selectedThemeOverlay = false;    
                                    _this.getTheme();
                                } , 2000)
                            }
                            else
                            {
                                _this.selectedThemeOverlay = false;  
                                this.$bvToast.toast('Tema değiştirlemedi.Bilgilerinizi kontrol ediniz.Sistem yönetinizle iletişime geçiniz.', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                            }                  
                        });
                    }
                })
                .catch(err => {
                   
                }); 
                
            }
        },
        async created(){
            var _this = this;
            var token = _this.$cookiz.get("admintoken");
            var userId = _this.$cookiz.get("_userId");
            if(token && userId)
            {
                _this.getTheme();     
            }             
        }
    }
</script>

<style>
</style>
