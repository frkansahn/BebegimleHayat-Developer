<template>
    <!-- <nuxt-picture v-if="!isOtherSource && getImageJpgUrl != null" fit="cover" format="webp" placeholder="/Data/loading.gif" :src="getImageJpgUrl" :width="width" :height="height"/>
    <nuxt-picture v-else-if="isOtherSource && src != null" fit="cover" format="webp" placeholder="/Data/loading.gif" :src="src" :width="width" :height="height"/>    
     -->
     
    <picture v-if="!isOtherSource && getImageJpgUrl != null">
        <source type="image/jpeg" :srcset="getImageJpgUrl" />
        <img :src="getImageWebpUrl" :alt="alt || 'Resim'" :width="width" :height="height"  />
    </picture>
    <picture v-else-if="isOtherSource && src != null">
        <source :srcset="src" type="" />
        <img :src="src" :alt="alt || 'Resim'" :width="width" :height="height"  />
    </picture>
</template>

<script>
    export default {
        name:"ElementImage",
        props: {
            src: {
                type:String,
                default:null
            },
            alt: {
                type:String,
                default:"image"
            },
            width: {
                type:String
            },
            height: {
                type:String
            }
        },
        data() {
        return {
                baseUrl:'https://api.bebegimlehayat.com'
            }
        },
        computed: {
            isOtherSource() {
                if(this.src?.indexOf('http') > -1)
                    return true
                else
                    return false
                    
            },
            getImageJpgUrl() {
                if(this.src)
                    return this.baseUrl + this.src.replace(/ /g,"%20")+'.jpeg';
                else
                    return null
            },
            getImageWebpUrl() {
                if(this.src)
                    return this.baseUrl +  this.src.replace(/ /g,"%20")+'.webp';
                else
                    return null
            }
        }
    } 
</script>