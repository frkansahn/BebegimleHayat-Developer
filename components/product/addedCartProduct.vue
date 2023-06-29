<template>
    <div class="col-12 d-flex align-items-center justify-content-center" v-if="product" id="addedCartProduct">
        <div class="row align-items-center content">
            <div class="col-12 px-0">
                <b-icon-x class="float-right" role="button" variant="dark" font-scale="3" @click="closePopup"></b-icon-x>
            </div>
            <div class="col-9">
                <div class="row align-items-center">
                    <div class="col-4">
                        <div class="float-left w-100 image-wrapper" style="padding-bottom:100%">	
                            <span>
                                <img v-if="product.showcase_image" :src="product.showcase_image.S" :alt="product.title" width="500" height="500"/>
                                <img v-else :src="$store.state.product.noImageProduct" :alt="product.title" width="200" height="500"/>
                            </span>				
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="row">
                            <div class="col-12 mb-3 text-success d-flex align-items-center">
                                <b-icon-patch-check variant="success" font-scale="1.8"></b-icon-patch-check>
                                <h6 class="ml-2 font-weight-bold">
                                    {{ $t('successMessages.product_cart_added') }}
                                </h6>
                            </div>
                            <div class="col-12">
                                <h4>
                                    {{ product.title }}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row">
                    <div class="col-12 mb-2">
                        <button type="button" @click="closePopup" class="btn btn-outline-primary w-100">
                            {{ $t('continueShopping') }}
                        </button>
                    </div>
                    <div class="col-12 mb-2">
                        <button type="button" @click="goToCart" class="btn btn-primary w-100">
                            {{ $t('goToCart') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="backdrop" @click="closePopup"></div>		
    </div>
</template>
<script>
	export default{
		name:'AddedCartProduct',
        transition: {
            name: 'fade',
            mode: 'out-in'
        },
		props:["product"],
	    components:{
	    },
	    data() {
	        return {

	        }
	    },
	    methods:{
            closePopup() {
                this.$store.commit('customer/lastAddedProduct',undefined);
            },
            goToCart() {
                this.$store.commit('customer/lastAddedProduct',undefined);
                this.$router.push('/cart')
            }
	    },
	    created(){			
		}
	}
</script>

<style scoped lang="scss">
#addedCartProduct {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
    
    .content {
        max-width: 800px;
        margin: 0 auto;
        z-index: 2;
        background: #ffffff;
        border-radius: 8px;
        padding: 1em;
        border-left:8px solid var(--main-background-color)
    }

    .backdrop {
        background-color: #0000006e;
        position: absolute;
        top:0;
        bottom:0;
        left: 0;
        right: 0;
    }
}
</style>
