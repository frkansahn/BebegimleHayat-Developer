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
            <div class="loading-general" id="loading_general" v-if="loading"></div>
            <Nuxt/>
            <ProductAddedCartProduct v-if="LASTADDEDPRODUCT" :product="LASTADDEDPRODUCT" />
        </div>
    </div>
</template>
<script>
    export default 
    {
        head() {
            return {
                link: [
                    { rel: 'icon', type: 'image/x-icon', href: this.favicon }
                ],
            }
        },
        data(){
            return{
                loading:true,
                favicon:null,
                styles:{}
            }
        },   
        computed:{
            LASTADDEDPRODUCT() {
                return this.$store.state.customer.lastAddedProduct
            }
        },     
        beforeCreate(){
            const _this = this;
            _this.$store.dispatch('customer/nuxtServerInit');
            
            _this.$repositories.setting.getSiteSettings()
            .then(res => {
                if(res)
                {
                    let config = res.data.response[0]
                    _this.$store.commit("config" , config);
                    _this.$store.commit("product/noImageProduct" , config.noImageProduct || '/Data/no-photos.png');
                    _this.favicon = config.favicon || '/Data/favicon.png';

                    let color = {
                        'textColor': '#ffffff',
                        'inputFocusOpacityColor': '#0196aa40',
                        'backgroundColor': '#0196aa',
                    }

                    _this.styles[`--main-text-color`] = color.textColor;
                    _this.styles[`--main-input-focus-color`] = color.inputFocusOpacityColor;
                    _this.styles[`--main-background-color`] = color.backgroundColor;

                    _this.loading = false;
                }
            });
        },
        create(){
            this.$store.commit('language' , this.$i18n.locale);
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