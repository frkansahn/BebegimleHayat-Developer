<template>
	<div class="col-12 product-showcase" id="productShowcase" v-if="loaded && products">
		<div class="row" v-if="products.length > 0">
			<div class="col-12 my-5 text-center block-title">
				<span class="float-left w-100" v-if="title">
					{{ title }}
				</span>
				<small class="float-left w-100" v-if="description">
					{{ description }}
				</small>
			</div>
			<div class="col-12 px-md-2">
				<div class="row">
					<ProductCart v-if="cartStyle == 'ProductCart'" v-for="(p,index) in products" v-bind:key="`ProductCart${index}`" :product="p" :index="index"/>
                    <ProductCart1 v-if="cartStyle == 'ProductCart1'" v-for="(p,index) in products" v-bind:key="`Product1Cart${index}`" :product="p" :index="index"/>
				</div>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'NotSliderProducts',
	    data() {
	        return {
	        	products:[],
	        	loaded:false
	        }
	    },
	    props:{
            title: {
                type: String,
                default: null,
            },
            description: {
                type: String,
                default: null,
            },
            cartStyle: {
                type: String,
                default: "ProductCart",
            }
        },
	    methods:{

	    },
	    created(){
	    	var _this = this;
			_this.$repositories.product.getActiveAllProductsByLimit(6)
			.then(res => {
				_this.products = res.data.response;
				_this.loaded = true;
			});			
		}
	}
</script>

<style>
</style>
