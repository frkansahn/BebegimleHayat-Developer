<template>
	<div class="slider" id="sliderPregnancyWeekByWeek">
		<div class="row">
			<div class="col-12">
				<swiper ref="mySwiper" :options="swiperOptions">
					<swiper-slide v-for="(slide, index) in sliders" v-bind:key="`Slider${index}`">
						<NuxtLink class="d-flex align-items-center justify-content-between" :to="slide.url" :id="`slider${index}`">
							<div class="d-flex flex-column">
								<div class="font-weight-bold h5 m-0">
									{{ slide.name }}.
								</div>
								<span class="d-flex flex-column">
									<span>hafta</span>
									<span>gebelik</span>
								</span>
							</div>
							<span v-if="slide.image">
								<img :src="slide.image" width="140" height="140"/>
							</span>
						</NuxtLink>
					</swiper-slide>
				</swiper>
				<div class="swiper-button-prev swiper-button-prev-pregnancy" slot="button-prev"></div>
				<div class="swiper-button-next swiper-button-next-pregnancy" slot="button-next"></div>
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
	name: 'sliderPregnancyWeekByWeek',
	title: 'Swiper Slider',
	props: ["breakpoints", "sliders"],
	data() {
		return {
			swiperOptions: {
				loop: false,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false
				},
				navigation: {
					"nextEl": ".swiper-button-next-pregnancy",
					"prevEl": ".swiper-button-prev-pregnancy"
				},
				breakpoints: this.breakpoints
			}
		}
	}
}
</script>
<style>
	#sliderPregnancyWeekByWeek a {
		background-color: rgb(201, 229, 219);
		border-radius: 5px;
		padding: 6px 10px;
	}

	#sliderPregnancyWeekByWeek a:hover {
		background-color: rgb(143, 205, 185);
	}

	#sliderPregnancyWeekByWeek p {
		font-size: 17px;
	}

	#sliderPregnancyWeekByWeek .check-icon {
		display: none;
	}

	#sliderPregnancyWeekByWeek .nuxt-link-active .check-icon {
		display: flex;
	}

	#sliderPregnancyWeekByWeek .nuxt-link-active .blog-image{
		border: 3px solid #00cfda;
	}

	#sliderPregnancyWeekByWeek picture img {
		max-height: 60px;
	}

	#sliderPregnancyWeekByWeek .nuxt-link-active img{
		filter:brightness(0.5)
	}

	#sliderPregnancyWeekByWeek .swiper-button-disabled {
		display: none !important;
	}

	#sliderPregnancyWeekByWeek .swiper-button-prev , #sliderPregnancyWeekByWeek .swiper-button-next {
		width: 40px !important;
		height: 40px !important;
	}

	#sliderPregnancyWeekByWeek .swiper-button-prev:after , #sliderPregnancyWeekByWeek .swiper-button-next:after {
		font-size: 16px !important;
	}

	#sliderPregnancyWeekByWeek .swiper-button-prev {
		top:-40px;
		left: 10px !important;
	}

	#sliderPregnancyWeekByWeek .swiper-button-next {
		top: -40px;
		right: 10px !important;
	}
</style>