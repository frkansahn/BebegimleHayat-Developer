<template>
	<div class="col-12 product-list-pagination" id="productListPagination" v-if="products">
		<b-overlay :show="categoryProductOverlay" no-wrap></b-overlay>
        <div class="row mb-3">
            <div class="col-6 col-sm-4 col-md-3 pl-0">
                <b-form-select v-model="selectedSort" @change="changeSort">
                    <b-form-select-option :value="null">Varsayılan Sıralama</b-form-select-option>
                    <b-form-select-option value="1">Fiyat Artan</b-form-select-option>
                    <b-form-select-option value="2">Fiyat Azalan</b-form-select-option>
                    <b-form-select-option value="3">Eskiden Yeniye</b-form-select-option>
                    <b-form-select-option value="4">Yeniden Eskiye</b-form-select-option>
                    <b-form-select-option value="5">A'dan-Z'ye</b-form-select-option>
                    <b-form-select-option value="6">Z'den-A'ya</b-form-select-option>
                </b-form-select>
            </div>
        </div>
        <div class="row" v-if="products.length > 0">
			<div class="col-12 px-md-2">
				<div class="row">
					<ProductCart :class-data="'col-12 col-sm-6 col-md-4'" v-if="cartStyle == 'ProductCart'" v-for="(p,index) in products" v-bind:key="`ProductCart${index}`" :product="p" :index="index"/>
                    <ProductCart1 v-if="cartStyle == 'ProductCart1'" v-for="(p,index) in products" v-bind:key="`Product1Cart${index}`" :product="p" :index="index"/>
				</div>
			</div>
            <div class="col-12 d-flex align-items-center justify-content-center">
                <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="paging.length"
                :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')" :last-text="$t('last')" pills>
                </b-pagination>
            </div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'ProductListPagination',
	    data() {
	        return {
	        	products:[],
                categoryProductOverlay:false,
                paging: {
                    currentPage: 1,
                    total: undefined,
                    length: 30
                },
                selectedSort:null
	        }
	    },
	    props:{
            cartStyle: {
                type: String,
                default: "ProductCart",
            },
            seoLink: {
                type: String,
                default: null,
            }
        },
        watch: {
            'paging.currentPage'() {
                this.getCategoryProducts();
            },
            async $route(to, from) {
                this.getCategoryProducts();
            }
        },
	    methods:{
            changeSort(){
                const _this = this;
                let query = {};

                if(_this.$route.query.price)
					query["price"] = _this.$route.query.price

                if(_this.$route.query.p1)
					query["p1"] = _this.$route.query.p1

                if(_this.$route.query.p2)
					query["p2"] = _this.$route.query.p2

				if(_this.$route.query.brand)
					query["brand"] = _this.$route.query.brand

                if(_this.selectedSort != null)
                    query["sort"] = _this.selectedSort;


				_this.$router.push({ 
					query: query
				});
            },
            getCategoryProducts(){
                var _this = this;
                if(_this.seoLink) {
                    _this.categoryProductOverlay = true;
                    let reqData = {
                        "language": _this.$store.state.customer.language,
                        "category_seo_link": _this.seoLink,
                        "filters": {
                            "property1": _this.$route.query?.p1 || "",
                            "property2": _this.$route.query?.p2 || "",
                            "brands": _this.$route.query?.brand || "",
                            "attributes":"",
                            "price":_this.$route.query?.price || "",
                            "categories":""
                        },
                        "sort": _this.$route.query?.sort || "",
                        "paging": {
                            "start": (_this.paging.currentPage - 1) * _this.paging.length,
                            "end": _this.paging.length
                        }
                    }
                    _this.$repositories.product.getProductByCategory(reqData)
                    .then(res => {
                        _this.products = res.data.response.products;
                        _this.paging.total = res.data.response.total;
                        _this.categoryProductOverlay = false;
                    });
                }
                
            }
	    },
        mounted(){
            this.selectedSort = this.$route.query?.sort || null;
        },
	    created(){
	    	this.getCategoryProducts();			
		}
	}
</script>

<style>
</style>
