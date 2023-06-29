<template>
	<div class="col-12 px-4">
		<div class="row">
			<div class="col-12 category-filter py-3" id="categoryFilter" v-if="filters">
				<div class="row pb-3 mb-3 border-bottom border-secondary">
					<div class="col-12">
						<div class="row mb-3">
							<h4 class="col-12">
								{{$t('categories')}}
							</h4>
						</div>
						<div class="row">
							<ul class="col-12 list-unstyled">
								<li v-for="(category,index) in filters.categories" :key="`category${index}`">
									<ul class="list-unstyled">
										<FilterTreeCategory class="item"
											:item="category"
										/>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div 
					class="row pb-3 mb-3 border-bottom border-secondary filter-content" 
					v-if="brands && brands.length"
				>
					<div class="col-12">
						<div class="row mb-3">
							<h4 class="col-12">
								{{ $t('brand') }}
							</h4>
						</div>
						<div class="row">
							<ul class="col-12 list-unstyled">
								<li 
									class="d-flex align-items-center mb-1 pb-1 border-bottom border-light filter-item"
									v-for="(b,index) in brands" 
									:key="`brand_${index}`"
								>
									<b-form-checkbox
										class=""
										v-model="b.selected" 
										type="checkbox" 
										:name="`brand_${b.id}`" 
										value=true 
										unchecked-value=false
									></b-form-checkbox>
									{{ b.name }}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div 
					class="row pb-3 mb-3 border-bottom border-secondary filter-content" 
					v-if="property1 && property1.length" 
					v-for="(p1,index) in property1" 
					:key="`property1_${index}`"
				>
					<div class="col-12">
						<div class="row mb-3">
							<h4 class="col-12">
								{{p1.property_category_name}}
							</h4>
						</div>
						<div class="row">
							<ul class="col-12 list-unstyled">
								<li 
									class="d-flex align-items-center mb-1 pb-1 border-bottom border-light filter-item"
									v-for="(property,index2) in p1.properties" 
									:key="`${p1.property_category_name}_${index2}`"
								>
									<b-form-checkbox
										class=""
										v-model="property.selected" 
										type="checkbox" 
										:name="`property_${p1.property_category_id}_${property.property_id}`" 
										value=true 
										unchecked-value=false
									></b-form-checkbox>

									{{ property.property_name }}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div 
					class="row pb-3 mb-3 border-bottom border-secondary filter-content" 
					v-if="property2 && property2.length" 
					v-for="(p2,index) in property2" 
					:key="`property2_${index}`"
				>
					<div class="col-12">
						<div class="row mb-3">
							<h4 class="col-12">
								{{p2.property_category_name}}
							</h4>
						</div>
						<div class="row">
							<ul class="col-12 list-unstyled">
								<li 
									class="d-flex align-items-center mb-1 pb-1 border-bottom border-light filter-item"
									v-for="(property,index2) in p2.properties" 
									:key="`${p2.property_category_name}_${index2}`"
								>
									<b-form-checkbox
										class=""
										v-model="property.selected" 
										type="checkbox" 
										:name="`property_${p2.property_category_id}_${property.property_id}`" 
										value=true 
										unchecked-value=false
									></b-form-checkbox>
									{{ property.property_name }}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div 
					class="row pb-3 mb-3 border-bottom border-secondary filter-content"
					v-if="price"
				>
					<div class="col-12">
						<div class="row mb-3">
							<h4 class="col-12">
								{{ $t('price') }}
							</h4>
						</div>
						<div class="row">
							<div class="col-12 px-4 mt-5 mb-3">
								<FilterPriceRangeSlider ref="price" :min="price.min" :max="price.max"/>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 px-4">
						<button type="button" class="btn btn-lg btn-primary w-100" @click="apply">
							Filtre Uygula
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'FilterCategory',
	    data() {
	        return {
	        	filters:[],
				property1:undefined,
				property2:undefined,
				brands:undefined,
				price:undefined,
                categoryFilterOverlay:false
	        }
	    },
	    props:{
            seoLink: {
                type: String,
                default: null
            }
        },
        watch: {
			async $route(to, from) {
				this.getFilters();
			}
		},
	    methods:{
            getFilters(){
				const _this = this;

				let selectedBrand = _this.$route.query?.brand?.split('-');
				let selectedProperty1 = _this.$route.query?.p1?.split('-');
				let selectedProperty2 = _this.$route.query?.p2?.split('-'); 

                if(_this.seoLink) {
                    _this.categoryFilterOverlay = true;
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
                        }
                    }
                    _this.$repositories.product.getFilters(reqData)
                    .then(res => {
                        _this.filters = res.data.response;

						if(_this.filters?.properties?.property1?.length > 0)
							_this.property1 = _this.filters.properties.property1.map(item => {
								if(item?.properties?.length > 0) {
									item.properties = item.properties.map(x => {
										if(selectedProperty1?.includes(x.property_id.toString()))
											x["selected"] = "true";
										else
											x["selected"] = "false";

										return x;
									})
								}
								
								return item
							});
							
						if(_this.filters?.properties?.property2?.length > 0)
							_this.property2 = _this.filters.properties.property2.map(item => {
								
								if(item?.properties?.length > 0) {
									item.properties = item.properties.map(x => {
										if(selectedProperty2?.includes(x.property_id.toString()))
											x["selected"] = "true";
										else
											x["selected"] = "false";

										return x;
									})
								}
								
								return item
								
							});

						if(_this.filters?.brands?.length > 0)
							_this.brands = _this.filters.brands.map(x => {
								if(selectedBrand?.includes(x.id.toString()))
									x["selected"] = "true";
								else
									x["selected"] = "false";

								return x;
							});

						if(_this.filters?.price)
							_this.price = _this.filters.price;

                        _this.categoryFilterOverlay = false;
                    });
                }
            },
			apply(){
				const _this = this;

				let selectedBrands = _this.brands?.filter(x => x.selected == 'true')?.map(x => x.id);
				
				let selectedProperty1 = [];
				_this.property1?.forEach(item => {
					item?.properties?.filter(x => x.selected == 'true')?.forEach(x => {
						selectedProperty1.push(x.property_id);
					})
				});

				let selectedProperty2 = [];
				_this.property2?.forEach(item => {
					item?.properties?.filter(x => x.selected == 'true')?.forEach(x => {
						selectedProperty2.push(x.property_id);
					})
				});

				let priceMinValue = _this.$refs.price.minValue;
				let priceMaxValue = _this.$refs.price.maxValue;

				let query = {};

				if(priceMinValue != _this.price.min || priceMaxValue != _this.price.max)
					query["price"] = priceMinValue + '-' + priceMaxValue

				if(selectedBrands?.length > 0)
					query["brand"] = selectedBrands.join('-')

				if(selectedProperty1?.length > 0)
					query["p1"] = selectedProperty1.join('-')

				if(selectedProperty2?.length > 0)
					query["p2"] = selectedProperty2.join('-')

				if(_this.$route.query.sort)
					query["sort"] = _this.$route.query.sort

				_this.$router.push({ 
					query: query
				});
			}
	    },
	    created(){
	    	this.getFilters();			
		}
	}
</script>

<style scoped>
	.category-filter {
		border: 1px solid #eeeeee;
    	border-radius: 5px;
	}

</style>
