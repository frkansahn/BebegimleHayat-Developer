<template>
    <div class="row">
        <h1 class="w-100 pb-3 mb-3 border-bottom">
            {{ $t('myFavorites') }}
        </h1>
        <div class="col-12 px-md-2" v-if="products">
            <div class="row">
                <ProductCart :class-data="'col-12 col-sm-6 col-md-4'" @reload="getCustomerFavorites" v-if="cartStyle == 'ProductCart'" v-for="(p,index) in products" v-bind:key="`ProductCart${index}`" :product="p" :index="index"/>
                <ProductCart1 v-if="cartStyle == 'ProductCart1'" v-for="(p,index) in products" v-bind:key="`Product1Cart${index}`" :product="p" :index="index"/>
            </div>
        </div>
        <div class="col-12 d-flex align-items-center justify-content-center" v-if="products && products.length > 0">
            <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="paging.length"
            :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')" :last-text="$t('last')" pills>
            </b-pagination>
        </div>
        <div class="col-12" v-if="!products || products.length == 0">
            <div class="row">
                <p class="h5 font-weight-normal">
                    {{ $t('warningMessages.noFavoriteMessage') }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default
    {
        name: 'Favorites',
        transition: {
            name: 'page-transition',
            mode: 'out-in'
        },
        data() {
            return {
                cartStyle:"ProductCart",
                products:undefined,
                paging: {
                    currentPage: 1,
                    total: undefined,
                    length: 30
                }
            }
        },
        watch: {
            'paging.currentPage'() {
                this.getCustomerFavorites();
            },
            async $route(to, from) {
                this.getCustomerFavorites();
            }
        },
        methods: {
            getCustomerFavorites() {
                const _this = this;
                let reqData = {
                    "paging": {
                        "start": (_this.paging.currentPage - 1) * _this.paging.length,
                        "end": _this.paging.length
                    }
                }
                _this.$repositories.customer.getCustomerFavorites(reqData)
                    .then(res => {
                        if (res && res.data) {
                            _this.products = res.data.response.products;
                            _this.paging.total = res.data.response.total;
                        }
                    })
            }
        },
        created() {
            var _this = this;
            _this.getCustomerFavorites();
        },
        async mounted() {
        }
    }
</script>

<style lang="scss" scoped>

</style>
