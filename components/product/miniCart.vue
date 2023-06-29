<template>
	<div class="col-12" :id="`productCart${index}`">
		<div class="row product-cart">
			<div class="col-3 px-2 d-flex align-items-center">
				<NuxtLink :to="`/product-detail/${product.seo_link}`" class="float-left w-100 image-wrapper" :title="product.seo_title" style="padding-bottom:100%">	
					<span>
                        <img v-if="product.showcase_image" :src="product.showcase_image.S" :alt="product.title" width="500" height="500"/>
                        <img v-else :src="$store.state.product.noImageProduct" :alt="product.title" width="200" height="500"/>
                    </span>				
				</NuxtLink>
			</div>
			<div class="col-9 content">
				<div class="row">
                    <NuxtLink :to="`/brand/${product.brand_url}`" class="col-12 mt-2 product-brand">
						{{product.brand_name}}
					</NuxtLink>
                    <NuxtLink :to="`/product-detail/${product.seo_link}`" class="col-12 product-title">
						{{product.title}}
					</NuxtLink>
                    <div class="col-12 mt-1">
                        <div class="row">
                            <div class="col-6 mb-1" v-if="product.property1">
                                {{product.property1_category_name}} : <strong>{{product.property1}}</strong>
                            </div>
                            <div class="col-6 mb-1" v-if="product.property2">
                                {{product.property2_category_name}} : <strong>{{product.property2}}</strong>
                            </div>
                        </div>
                    </div>
					<div class="col-12 product-price d-flex align-items-center mb-3">
						<span class="selling-price mr-2" :class="[product.on_sale == 1 ? 'discounted' : '']">
                            {{ product.selling_price_with_vat | currencyFormat }} {{ product.currency_code }}
                        </span>
                        <span v-if="product.on_sale == 1" class="discounted-selling-price">
                            {{ product.discounted_selling_price_with_vat | currencyFormat }} {{ product.currency_code }}
                        </span>			
					</div>
                    <div class="cart-delete">
                        <span class="d-flex align-items-center justify-content-center flex-column btn btn-sm" @click="cartDelete(product.cart_product_id)">
                            <b-icon-trash variant="secondary" font-scale=".9"></b-icon-trash>
                            {{$t('delete')}}
                        </span>
                    </div>
				</div>
			</div>			
		</div>		
	</div>
</template>
<script>
	export default{
		name:'ProductMiniCart',
		props:["product","index"],
	    components:{
	    },
	    data() {
	        return {
	        }
	    },
	    methods:{
            addToFavourite(e,product) {
                e.preventDefault();
                const _this = this;
                _this.$repositories.customer.addCustomerFavorite(product.id)
                .then(res => {
                    if (res && res.data && res.data.code == 'favorite_added') {
                        product.is_favorite = true;
                        _this.$bvToast.toast(_this.$t('successMessages.favorite_added'), {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });
                    }
                })
            },
            deleteToFavourite(e,product) {
                e.preventDefault();
                const _this = this;
                _this.$repositories.customer.deleteCustomerFavorite(product.id)
                .then(res => {
                    if (res && res.data && res.data.code == 'favorite_deleted') {
                        product.is_favorite = false;
                        _this.$emit('reload');
                        _this.$bvToast.toast(_this.$t('successMessages.favorite_deleted'), {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });
                    }
                })
            },
            quantityPlus(product) {
                const _this = this;
                if(!_this.$checkIsNullOrEmpty(product.quantity))
                    product["quantity"] = product.member_min_order ? Number(product.member_min_order) + 1 : 2;
                else
                    product.quantity = Number(product.quantity) + 1;

                if(_this.$checkIsNullOrEmpty(product.member_max_order) && Number(product.quantity) > Number(product.member_max_order))
                    product.quantity = Number(product.member_max_order);

                document.querySelector(`[name="quantity_${product.id}"]`).value = product.quantity;
            },

            quantityMinus(product) {
                const _this = this;
                if(!_this.$checkIsNullOrEmpty(product.quantity))
                    product["quantity"] = Number(product.member_min_order) - 1 || 1;
                else
                    product.quantity = Number(product.quantity) - 1;

                if(product.quantity < 1)
                    product.quantity = 1;

                if(_this.$checkIsNullOrEmpty(product.member_min_order) && Number(product.quantity) < Number(product.member_min_order))
                    product.quantity = Number(product.member_min_order);

                document.querySelector(`[name="quantity_${product.id}"]`).value = product.quantity;
            },

            blurQuantity(event,product) {
                const _this = this;
                product.quantity = Number(event.target.value);
                if(!_this.$checkIsNullOrEmpty(product.quantity))
                    product["quantity"] = Number(product.member_min_order) - 1 || 1;

                if(product.quantity < 1)
                    product.quantity = 1;

                if(_this.$checkIsNullOrEmpty(product.member_min_order) && Number(product.quantity) < Number(product.member_min_order))
                    product.quantity = Number(product.member_min_order);

                if(_this.$checkIsNullOrEmpty(product.member_max_order) && Number(product.quantity) > Number(product.member_max_order))
                    product.quantity = Number(product.member_max_order);

                document.querySelector(`[name="quantity_${product.id}"]`).value = product.quantity;
            },

            addToCart(product){
                const _this = this;
                product["quantity"] = parseFloat(document.querySelector(`[name="quantity_${product.id}"]`).value);
                if(product && product.quantity && product.id) {
                    _this.$store.dispatch('customer/addCartProduct' , product);
                }
                else {
                    _this.$bvToast.toast('Ürün sepete eklenirken bir hata oluştu.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                }
            },
            cartDelete(cart_product_id){
                const _this = this;
                if(cart_product_id) {
                    _this.$store.dispatch('customer/deleteCartProduct' , cart_product_id);
                }
            }
	    },
	    created(){			
		}
	}
</script>

<style scoped>

    .cart-delete {
        position: absolute;
        top: 0.5rem;
        right: 0;
    }
    
    .is-new-product {
        position: absolute;
        left: 8px;
        top:8px;
        background-color: #000;
        color:#fff;
        font-size: 12px;
        line-height: normal;
    }

    .favorite {
        position: absolute;
        right: 8px;
        top:8px;
    }

    .product-cart {
        border-bottom:1px solid #eeeeee;
        border-radius: 5px;
        -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
	    -o-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	    transition: all .3s ease;
    }

    .product-cart:hover {
        -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
	    -o-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	    transition: all .3s ease;
        -webkit-box-shadow: 0px 0px 12px -3px #000000;
        -moz-box-shadow:0px 0px 12px -3px #000000;
        box-shadow:0px 0px 12px -3px #000000;
    }

    .product-cart .image-wrapper img{
        -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
	    -o-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	    transition: all .3s ease;
    }

    .product-cart .image-wrapper:hover img{
        -webkit-transition: all .3s ease;
	    -moz-transition: all .3s ease;
	    -o-transition: all .3s ease;
	    -ms-transition: all .3s ease;
	    transition: all .3s ease;
        transform: scale(1.4);
        -webkit-transform: scale(1.4);
        -moz-transform: scale(1.4);
        -o-transform: scale(1.4);
        -ms-transform: scale(1.4);
    }

    .product-brand {
        font-size: 12px;
        line-height: normal;
        font-weight: 300;
        color: #000;
    }

    .product-title {
        font-size: 18px;
        font-weight: 400;
        line-height: normal;
        color: #1c1c1c;
    }

    .selling-price {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        text-transform: uppercase;
    }

    .selling-price.discounted {
        text-decoration: line-through;
        font-weight: 400;
        color: #747272;
    }

    .discounted-selling-price {
        font-weight: 700;
        font-size: 18px;
        text-transform: uppercase;
        line-height: normal;
        color: var(--main-background-color);
    }

    .quantity-button {
        width: 38px;
        height: 38px;
    }
</style>
