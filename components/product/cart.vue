<template>
    <div :class="[classData ? classData : 'col-12 col-sm-6 col-md-4 col-lg-3 px-3 px-md-4 mb-4']"
        :id="`productCart${index}`">
        <div class="row product-cart">
            <div class="col-12 p-0">
                <NuxtLink :to="`/product-detail/${product.seo_link}`" class="float-left w-100 image-wrapper"
                    :title="product.seo_title" style="padding-bottom:100%">
                    <span>
                        <img v-if="product.showcase_image" :src="product.showcase_image.S" :alt="product.title" width="500"
                            height="500" />
                        <img v-else :src="$store.state.product.noImageProduct" :alt="product.title" width="200"
                            height="500" />
                    </span>
                    <small class="is-new-product px-2 py-1" v-if="product.is_new_product">
                        {{ $t('new') }}
                    </small>
                    <div class="favorite">
                        <span v-if="$store.state.customer.userLoggedIn">
                            <b-icon-heart @click="addToFavourite($event, product)" variant="secondary" font-scale="1.5"
                                class="py-1 px-3" v-if="!product.is_favorite"></b-icon-heart>
                            <b-icon-heart-fill @click="deleteToFavourite($event, product)" variant="secondary"
                                font-scale="1.5" class="py-1 px-3" v-else></b-icon-heart-fill>
                        </span>
                        <NuxtLink to="/uye-giris" v-else>
                            <b-icon-heart variant="dark" font-scale="1.5" class="py-1 px-3"></b-icon-heart>
                        </NuxtLink>
                    </div>
                </NuxtLink>
            </div>
            <div class="col-12 pt-2 content border-top border-white mt-2">
                <div class="row">
                    <NuxtLink :to="`/brand/${product.brand_url}`" class="col-12 mt-2 product-brand">
                        {{ product.brand_name }}
                    </NuxtLink>
                    <NuxtLink :to="`/product-detail/${product.seo_link}`" class="col-12 my-1 product-title">
                        {{ product.title }}
                    </NuxtLink>
                    <div class="col-12 product-price d-flex align-items-center mb-3 mt-4">
                        <span class="selling-price mr-2" :class="[product.on_sale == 1 ? 'discounted' : '']">
                            {{ product.selling_price_with_vat | currencyFormat }} {{ product.currency_code }}
                        </span>
                        <span v-if="product.on_sale == 1" class="discounted-selling-price">
                            {{ product.discounted_selling_price_with_vat | currencyFormat }} {{ product.currency_code }}
                        </span>
                    </div>
                    <div class="col-12">
                        <div class="row mb-3">
                            <div class="col-md-6 border-right border-white pr-0">
                                <div
                                    class="w-100 quantity bg-primary d-flex align-items-center justify-content-between text-center">
                                    <button class="btn btn-primary quantity-button" @click="quantityMinus(product)">
                                        -
                                    </button>
                                    <input type="text" :name="`quantity_${product.id}`"
                                        :value="product.quantity || product.member_min_order || 1"
                                        class="form-control px-1 text-center font-weight-500 quantity-input"
                                        @blur="blurQuantity($event, product)">
                                    <button class="btn btn-primary quantity-button" @click="quantityPlus(product)">
                                        +
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6 pl-0 border-left border-white">
                                <button class="w-100 btn btn-primary rounded-0 px-1" @click="addToCart(product)">
                                    <small>
                                        {{ $t('addToCart') }}
                                    </small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductCart',
    props: ["product", "index", "classData"],
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        addToFavourite(e, product) {
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
        deleteToFavourite(e, product) {
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
            if (!_this.$checkIsNullOrEmpty(product.quantity))
                product["quantity"] = product.member_min_order ? Number(product.member_min_order) + 1 : 2;
            else
                product.quantity = Number(product.quantity) + 1;

            if (_this.$checkIsNullOrEmpty(product.member_max_order) && Number(product.quantity) > Number(product.member_max_order))
                product.quantity = Number(product.member_max_order);

            document.querySelector(`[name="quantity_${product.id}"]`).value = product.quantity;
        },

        quantityMinus(product) {
            const _this = this;
            if (!_this.$checkIsNullOrEmpty(product.quantity))
                product["quantity"] = Number(product.member_min_order) - 1 || 1;
            else
                product.quantity = Number(product.quantity) - 1;

            if (product.quantity < 1)
                product.quantity = 1;

            if (_this.$checkIsNullOrEmpty(product.member_min_order) && Number(product.quantity) < Number(product.member_min_order))
                product.quantity = Number(product.member_min_order);

            document.querySelector(`[name="quantity_${product.id}"]`).value = product.quantity;
        },

        blurQuantity(event, product) {
            const _this = this;
            product.quantity = Number(event.target.value);
            if (!_this.$checkIsNullOrEmpty(product.quantity))
                product["quantity"] = Number(product.member_min_order) - 1 || 1;

            if (product.quantity < 1)
                product.quantity = 1;

            if (_this.$checkIsNullOrEmpty(product.member_min_order) && Number(product.quantity) < Number(product.member_min_order))
                product.quantity = Number(product.member_min_order);

            if (_this.$checkIsNullOrEmpty(product.member_max_order) && Number(product.quantity) > Number(product.member_max_order))
                product.quantity = Number(product.member_max_order);

            document.querySelector(`[name="quantity_${product.id}"]`).value = product.quantity;
        },

        addToCart(product) {
            const _this = this;
            product["quantity"] = parseFloat(document.querySelector(`[name="quantity_${product.id}"]`).value);
            if (product && product.quantity && product.id) {
                _this.$store.dispatch('customer/addCartProduct', product);
            }
            else {
                _this.$bvToast.toast('Ürün sepete eklenirken bir hata oluştu.', {
                    title: `Başarısız..`,
                    variant: 'danger',
                    autoHideDelay: 500,
                    solid: true
                });
            }
        }
    },
    created() {
    }
}
</script>

<style scoped>
.is-new-product {
    position: absolute;
    left: 8px;
    top: 8px;
    background-color: #000;
    color: #fff;
    font-size: 12px;
    line-height: normal;
}

.favorite {
    position: absolute;
    right: 8px;
    top: 8px;
}

.product-cart {
    border: 1px solid #eeeeee;
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
    -moz-box-shadow: 0px 0px 12px -3px #000000;
    box-shadow: 0px 0px 12px -3px #000000;
}

.product-cart .image-wrapper img {
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
}

.product-cart .image-wrapper:hover img {
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
    font-size: 20px;
    text-transform: uppercase;
    line-height: normal;
    color: var(--main-background-color);
}

.quantity-button {
    width: 38px;
    height: 38px;
}</style>
