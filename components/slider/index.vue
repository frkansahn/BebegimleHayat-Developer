<template>
	<div class="slider" id="slider" v-if="sliders">
		<div class="row">
			<div class="col-12">
				<swiper ref="mySwiper" :options="swiperOptions">
					<swiper-slide v-for="(slide,index) in sliders" v-bind:key="`Slider${index}`">
						<NuxtLink :to="slide.url" :id="`slider${index}`" v-html="decodeURIComponent(slide.image)" :title="slide.title">
						</NuxtLink>
					</swiper-slide>
					<div class="swiper-button-prev swiper-button-prev-index" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-next-index" slot="button-next"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
  	export default {
    	name: 'Slider',
    	title: 'Swiper Slider',
    	props:["breakpoints" , "sliders"],
    	data() {
      		return {
        		swiperOptions: {
		        	loop:true,
		        	autoplay: {
			          delay: 8000,
			        	disableOnInteraction: false
			        },
					navigation: { 
						"nextEl": ".swiper-button-next-index", 
						"prevEl": ".swiper-button-prev-index" 
					},
		          	breakpoints: this.breakpoints
        		}
      		}
    	}
  	}
</script>
<style>
	#slider p {
    	margin: 0 !important;
	}
</style>