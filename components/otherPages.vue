<template>
    <div class="col-12 px-md-4" id="otherPages">
        <h5>
            <b-icon-card-list variant="secondary" font-scale="1"></b-icon-card-list>
            Sayfalar
        </h5>
        <div class="row mt-3">
            <ul class="col-12">
                <li class="float-left w-100 border-bottom border-secondary" v-for="(C,index) in otherPages" :key="`OtherPage${index}`">
                    <NuxtLink :to="`/account/${C.seo_link}`">
                        {{C.subject}}
                    </NuxtLink>
                </li>
            </ul>
        </div>        
    </div>
</template>

<script>
    export default 
    {
        name:'OtherPages',
        components:{
            
        },
        data() {
            return {
                otherPages: [
                    {
                        subject:'Kişisel Bilgilerim',
                        seo_link:'personal-information'   
                    },
                    {
                        subject:'Siparişlerim',
                        seo_link:'orders'   
                    },
                    {
                        subject:'Favorilerim',
                        seo_link:'favorites'   
                    },
                    {
                        subject:'Adreslerim',
                        seo_link:'address'   
                    },
                    {
                        subject:'Şifre Değiştir',
                        seo_link:'change-password'   
                    }
                ]
            }
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
    #otherPages {
        font-size: 16px;
        ul {
            li {
                list-style-type: none;
                border-bottom: 1px solid;
                a {
                    color: #000000;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1.5em;
                    margin: 0.5em 0;
                    display: block;
                }
            }
        }
    }
</style>
