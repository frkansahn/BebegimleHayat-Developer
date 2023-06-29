<template>
    <div class="col-12 product-showcase" id="productShowcase" v-if="loaded && products">
        <div class="row" v-if="products">
            <div class="col-12 my-5 text-center block-title">
                <span class="float-left w-100">
                    {{ $t('sameProducts') }}
                </span>
                <small class="float-left w-100">
                    {{ $t('sameProductsDescription') }}
                </small>
            </div>
            <div class="col-12 px-md-2">
                <div class="row">
                    <div class="col-12">
                        <swiper ref="showcaseSwiper" :options="sliderOptions">
                            <swiper-slide v-for="(p, index) in products" v-bind:key="`Slider_1_${index}`">
                                <ProductCart v-if="cartStyle == 'ProductCart'" :product="p" :index="index"
                                    :class-data="'col-12'" />
                                <ProductCart1 v-if="cartStyle == 'ProductCart1'" :product="p" :index="index"
                                    :class-data="'col-12'" />
                            </swiper-slide>

                        </swiper>
                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SameProducts',
    data() {
        return {
            products: undefined,
            loaded: false,
            cartStyle: 'ProductCart',
            sliderOptions: { 
                "lazy": true, 
                "loop": false, 
                "speed": 1000, 
                "autoplay": { 
                    "delay": 5000, 
                    "disableOnInteraction": false 
                }, 
                "navigation": { 
                    "nextEl": ".swiper-button-next", 
                    "prevEl": ".swiper-button-prev" 
                }, 
                "pagination": { 
                    "el": ".swiper-pagination", 
                    "clickable": true 
                }, 
                "breakpoints": { 
                    "0": { 
                        "spaceBetween": 8, 
                        "slidesPerView": 2 
                    }, 
                    "540": { 
                        "spaceBetween": 16, 
                        "slidesPerView": 3 
                    }, 
                    "992": { 
                        "spaceBetween": 24, 
                        "slidesPerView": 3 
                    } 
                }, 
                "preloadImages": false, 
                "allowTouchMove": true, 
                "centeredSlides": false, 
                "disableOnInteraction": false 
            }
        }
    },
    props: {
        seoLink: {
            type: String,
            default: null,
        }
    },
    methods: {

    },
    created() {
        var _this = this;
        _this.$repositories.product.getSameProducts(this.seoLink)
            .then(res => {
                _this.products = res.data.response;
                _this.loaded = true;
            });
    }
}
</script>

<style></style>
