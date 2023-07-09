<template>
	<div class="slider" id="sliderType1">
		<div class="row">
			<div class="col-12 px-0 px-md-3">
				<swiper ref="mySwiper" :options="swiperOptions">
					<swiper-slide v-for="(slide, index) in slidersData" v-bind:key="`Slider${index}`">
						<NuxtLink :to="slide.url" :id="`slider${index}`" v-html="decodeURIComponent(slide.image)"
							:title="slide.title">
						</NuxtLink>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
					<div class="swiper-button-prev" slot="button-prev"></div>
					<div class="swiper-button-next" slot="button-next"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SliderType1',
	title: 'Swiper Slider',
	props: ["breakpoints", "sliders"],
	data() {
		return {
			swiperOptions: {
				loop: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					"nextEl": ".swiper-button-next",
					"prevEl": ".swiper-button-prev"
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
<style lang="scss">
	#sliderType1 .txt {

		@media screen and (max-width: 769px) {
		}

		@media screen and (max-width: 541px) {
			bottom: 20px;
    		padding: 0 5.33333%;
		}

		position: absolute;
		bottom: 60px;
		padding: 0 calc(100% / 12);
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		color: #fff;
	}

	#sliderType1 .txt .center {
		background: rgba(0, 0, 0, .6);
		padding: 30px 40px;
		width: 100%;
		max-width: 710px;
		font-size: 15px;
	}

	#sliderType1 .txt p {
		@media screen and (max-width: 769px) {
			font-size: 13px;
		}

		@media screen and (max-width: 541px) {
			font-size: 9px;
		}

		font-size: 15px;
		line-height: 1.5;
		margin-top: 10px;
	}

	#sliderType1 .txt p:first-child {
		@media screen and (max-width: 769px) {
			font-size: 10px;
		}

		@media screen and (max-width: 541px) {
			font-size: 9px;
		}

		font-size: 11px;
		line-height: 1.3;
	}

	#sliderType1 .swiper-pagination-bullet {
		opacity: .5;
	}

	#sliderType1 .swiper-pagination-bullet.swiper-pagination-bullet-active {
		background: #fff;
		width: 12px;
		height: 12px;
		opacity: 1;
	}

	@media screen and (max-width: 540px)
	{
		#sliderType1 .txt .center {
			padding: 20px 30px;
		}
	}
</style>