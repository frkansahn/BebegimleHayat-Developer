<template>
	<div class="slider" id="sliderOtherCategories" v-if="sliders">
		<div class="row">
			<div class="col-12">
				<swiper id="otherCategroyId" ref="mySwiper" :options="swiperOptions"  @ready="handleSwiperReadied">
					<swiper-slide v-for="(slide, index) in sliders" v-bind:key="`Slider${index}`">
						<NuxtLink class="d-flex flex-column" :to="slide.url" :id="`slider${index}`" :title="slide.category_name">
							<span class="blog-image" v-if="slide.image">
								<ElementImage :src="`/Data/image/small/${slide.image}`" :alt="slide.category_name"/>								
								<div class="check-icon position-absolute w-100 h-100 align-items-center justify-content-center">
									<b-icon-check-circle variant="white" scale="4"></b-icon-check-circle>
								</div>
							</span>
							<p class="mt-2">
								{{ slide.parent_id ? slide.category_name : 'Tümü' }}
							</p>
						</NuxtLink>
					</swiper-slide>
				</swiper>
				<div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SliderOtherCategories',
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
					"nextEl": ".swiper-button-next",
					"prevEl": ".swiper-button-prev"
				},
				breakpoints: this.breakpoints
			}
		}
	},
	methods: {
		handleSwiperReadied() {
			const _this = this;
			let index = _this.sliders.findIndex(x => x.url  == _this.$route.params.seoLink);
			_this.$refs.mySwiper.$swiper.slideTo(index)
		}
	}
}
</script>
<style lang="scss">
	.blog-image {
		overflow: hidden;
		position: relative;
		padding-bottom: 112px;
		width: 100%;
		border-radius: 10px;
		border: 3px solid transparent;
		height:0;

		@media screen and (max-width: 768px) {
			padding-bottom: 90px;
		}

		picture {
			position: absolute;
			width: 100%;
			height: 100%;

			img {
				position: absolute;
				-o-object-fit: cover;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}
	}

	#sliderOtherCategories p {
		font-size: 17px;
	}

	#sliderOtherCategories .check-icon {
		display: none;
	}

	#sliderOtherCategories .nuxt-link-active .check-icon {
		display: flex;
	}

	#sliderOtherCategories .nuxt-link-active .blog-image{
		border: 3px solid #00cfda;
	}

	#sliderOtherCategories .nuxt-link-active img{
		filter:brightness(0.5)
	}

	#sliderOtherCategories .swiper-button-disabled {
		display: none !important;
	}

	#sliderOtherCategories .swiper-button-prev {
		top: calc(50% - 30px);
		left: 10px !important;

		@media screen and (max-width: 768px) {
			top: calc(50% - 20px);
			left: 5px !important;
		}
	}

	#sliderOtherCategories .swiper-button-next {
		top: calc(50% - 30px);
		right: 10px !important;

		@media screen and (max-width: 768px) {
			top: calc(50% - 20px);
			right: 5px !important;
		}
	}
</style>