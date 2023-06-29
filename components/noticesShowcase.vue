<template>
	<div class="notices-showcase" id="noticesShowcase">
		<div class="row" v-if="notices">
			<div class="col-12 mb-3 mt-5 text-center block-title">
				<span class="float-left w-100">
					Duyurular
				</span>
			</div>
			<div class="col-12 px-md-2">
				<div class="row">
					<div class="col-12">
						<swiper ref="swiperProjects" :options="swiperOptions">
							<swiper-slide v-for="(n,index) in notices" v-bind:key="`NoticesCart${index}`">
								<div class="col-12 py-1">
									<div class="row shadow-sm">
										<div class="col-12 pt-2 content bg-white">
											<div class="row">
												<div class="col-12 my-2 notices-subject">
													{{n.subject}}
												</div>
												<div class="col-12 notices-date mb-2">
													<small class="float-right text-secondary d-flex align-items-center">
														<b-icon-calendar2-date class="mr-1" variant="secondary" font-scale=".85"></b-icon-calendar2-date>
														{{n.saved_date | dateFormat}}
													</small>				
												</div>
												<div class="col-12 mb-2">
													<NuxtLink :to="`/${n.seo_link}`" class="see-more">
														<b-icon-arrow-right class="mr-1" variant="secondary" font-scale="1"></b-icon-arrow-right>
														Devamını Oku				
													</NuxtLink>
												</div>
											</div>
										</div>			
									</div>	
								</div>	
							</swiper-slide>
							<div class="swiper-button-prev" slot="button-prev"></div>
		    				<div class="swiper-button-next" slot="button-next"></div>
						</swiper>						
					</div>
				</div>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'NoticesShowcase',
	    data() {
	        return {
	        	notices:[],
	        	swiperOptions: {
		        	loop:false,
		          	navigation: {
		            	nextEl: '.swiper-button-next',
		            	prevEl: '.swiper-button-prev'
		          	},
		          	breakpoints: {
		          		1024: {		          			
		          			spaceBetween: 40,	
		          			slidesPerView: 4,	
		          			centeredSlides: true,          			          			
		          		},
		          		768: {
		          			spaceBetween: 30,
		          			slidesPerView: 3	          				
		          		},
		          		541: {
		          			spaceBetween: 20,	
		          			slidesPerView: 2	          			
		          		},
		          		320: {
		          			spaceBetween: 10,
		          			slidesPerView: 1
		          		},
		          		0:{
		          			spaceBetween: 5,		          			
		          		}
		          	}
		        }
	        }
	    },
	    props:{
	         
	    },
	    methods:{

	    },
	    created(){
	    	var _this = this;
			_this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents/getContentForCategoryId/6" , "token":""})
			.then(response => {
				_this.notices = response;
			});			
		}
	}
</script>

<style>
	.notices-subject {
	    font-size: 15px;
	    color: #000000;
	    font-weight: 400;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    min-height: 45px;
	}
</style>
