<template>
	<div class="slider" id="slider">
		<div class="row">
			<div class="col-12 px-0 px-md-3">
				<swiper ref="mySwiper" :options="swiperOptions">
					<swiper-slide v-for="(slide,index) in slidersData" v-bind:key="`Slider${index}`">
						<div :id="`slider${index}`" v-html="decodeURIComponent(slide.image)" :title="slide.title">
						</div>
					</swiper-slide>
					<div class="swiper-button-prev swiper-button-prev-index" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-next-index" slot="button-next"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
	Vue.use(VueAwesomeSwiper);

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
    	},
		computed: {
			slidersData() {
                if (process.client) {
					if (window.screen.width > 768)
						return this.sliders.desktop;
					else
						return this.sliders.mobile;
				}
				else {
					return null
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