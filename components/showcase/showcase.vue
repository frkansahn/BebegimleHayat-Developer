<template>
    <div class="col-12 product-showcase" id="productShowcase" v-if="loaded && showcase">
        <div class="row" v-if="showcase.products && showcase.products.length > 0">
            <div class="col-12 my-5 text-center block-title">
                <span class="float-left w-100" v-if="showcase.name">
                    {{ showcase.name }}
                </span>
                <small class="float-left w-100" v-if="showcase.description">
                    {{ showcase.description }}
                </small>
            </div>
            <div class="col-12 px-md-2">
                <div class="row" v-if="showcase.is_slider">
                    <div class="col-12">
                        <swiper ref="showcaseSwiper" :options="showcase.slider_options">
                            <swiper-slide v-for="(p, index) in showcase.products" v-bind:key="`Slider_1_${index}`">
                                <ProductCart v-if="cartStyle == 'ProductCart'" :product="p" :index="index" :class-data="'col-12'"/>
                                <ProductCart1 v-if="cartStyle == 'ProductCart1'" :product="p" :index="index" :class-data="'col-12'"/>
                            </swiper-slide>

                        </swiper>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </div>
                </div>
                <div class="row" v-else>
                    <ProductCart v-if="cartStyle == 'ProductCart'" v-for="(p, index) in showcase.products"
                        v-bind:key="`ProductCart${index}`" :product="p" :index="index" :class-data="'col-12'" />
                    <ProductCart1 v-if="cartStyle == 'ProductCart1'" v-for="(p, index) in showcase.products"
                        v-bind:key="`Product1Cart${index}`" :product="p" :index="index" :class-data="'col-12'" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShowcaseProducts',
    data() {
        return {
            showcase: undefined,
            loaded: false,
            cartStyle: undefined
        }
    },
    props: {
        id: {
            type: Number,
            default: null,
        }
    },
    methods: {

    },
    created() {
        var _this = this;
        _this.$repositories.product.getProductShowCase(this.id)
            .then(res => {
                _this.showcase = res.data.response;
                _this.cartStyle = _this.showcase.cart
                _this.loaded = true;
            });
    }
}
</script>

<style></style>
