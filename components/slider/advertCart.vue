<template>
	<div class="col-lg-6 px-3 mb-2 slider-advert-cart" :id="`sliderAdvertsCart${index}`">
		<div class="row px-lg-1">
			<div class="col-12 px-0 pt-4 pb-0 px-md-2 py-md-4 shadow-sm bg-white">
				<NuxtLink :to="`/is-ilanlari/${advert.seo_link}`" class="btn btn-default btn-sm text-left" :title="advert.seo_title">
					<div class="col-12">
						<div class="row">
							<div class="col-3 col-md-2 d-flex align-items-center">
								<div class="row py-4 rounded border border-light px-2">
									<img :src="advert.firmaLogo" :alt="advert.firmaAdi" width="100" height="100"> 
								</div>
							</div>
							<div class="col-9 col-md-10 content">
								<div class="row">
									<div class="col-12 mb-1 mt-2 advert-subject">
										<strong>
											{{advert.name}}
										</strong>
									</div>
									<div class="col-12 advert-short-description mb-2">
										<p :title="advert.short_description" v-html="advert.short_description"></p>
									</div>
									<div class="col-12 advert-date mb-2">
										<small class="float-right text-secondary d-flex align-items-center">
											<b-icon-calendar2-date class="mr-1" variant="secondary" font-scale=".85"></b-icon-calendar2-date>
											{{advert.createdAt | dateFormat}}
										</small>				
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 px-0">
								<span class="bg-light rounded py-1 px-2 mr-2">
									{{advert.is_tipi}}
								</span>
								<span class="bg-info text-white rounded py-1 px-2 mr-2">
									{{advert.pozisyon_seviyesi}}
								</span>
								<span class="text-italic py-1 px-2 mr-2">
									{{advert.departman}}
								</span>
							</div>
						</div>
					</div>
				</NuxtLink>
			</div>			
		</div>		
	</div>
</template>
<script>
	export default{
		name:'SliderAdvertCart',
		props:["advert" , "index"],
	    components:{
	    },
	    data() {
	        return {
	        }
	    },
	    methods:{

	    },
	    created(){			
		}
	}
</script>

<style>
	.advert-cart:hover > .shadow-sm 
	{
	    box-shadow:0 0 1rem rgb(0 0 0 / 15%) !important;
	}

	.basvuru-sayisi 
	{
		position: absolute;
		top: -20px;
		right: 0;
		background: #f5f5f5;
		padding: 0 1em;
		border-radius: 1em;
		height: 22px;
		line-height: 21px;
		font-size: 11px;
	}

	.basvuru-goruntuleme {
		position: absolute;
	    bottom: -20px;
	    right: 0;
	    background: var(--default-background-color);
	    color: #ffffff;padding: 0 2em;
	    border-radius: 1em;
	    height: 28px;
	    line-height: 27px;
	    font-size: 14px;
	    font-weight: 400;
	}

	@media screen and (max-width: 768px){
		.basvuru-goruntuleme {
			position: static;
			float: right;
			height: auto;
			margin-top: 1em;
		}
	}
</style>
