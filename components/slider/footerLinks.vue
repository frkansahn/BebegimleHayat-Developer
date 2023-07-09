<template>
	<div class="slider" id="sliderFooterLinks" v-if="sliders">
		<div class="row">
			<div class="col-12">
				<swiper ref="mySwiper" :options="swiperOptions">
					<swiper-slide v-for="(slide, index) in sliders" v-bind:key="`Slider${index}`">
						<a class="d-flex flex-column" :href="slide.url" :id="`slider${index}`" :title="slide.name">
							<span class="blog-image" v-if="slide.image">
								<!-- <ElementImage :src="`${slide.image}`" width="158" height="112" :alt="slide.name"/> -->

								<picture>
									<source type="image/jpeg" :srcset="slide.image" />
									<img :src="slide.image" :alt="slide.name" width="158" height="112"/>
								</picture>
							</span>
							<p class="mt-2 text-white h6">
								<small>
									{{ slide.name }}
								</small>
							</p>
						</a>
					</swiper-slide>
					<div class="swiper-button-prev" slot="button-prev"></div>
					<div class="swiper-button-next" slot="button-next"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SliderFooterLinks',
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
	}
}
</script>
<style>
	.blog-image {
		overflow: hidden;
		position: relative;
		padding-bottom: 112px;
		width: 100%;
		border-radius: 10px;
	}

	.blog-image picture {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.blog-image picture img {
		position: absolute;
		-o-object-fit: cover;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	#sliderFooterLinks p {
		font-size: 17px;
	}

	#sliderFooterLinks .check-icon {
		display: none;
	}

	#sliderFooterLinks .nuxt-link-active .check-icon {
		display: flex;
	}

	#sliderFooterLinks .nuxt-link-active .blog-image{
		border: 3px solid #00cfda;
	}

	#sliderFooterLinks .nuxt-link-active img{
		filter:brightness(0.5)
	}

	#sliderFooterLinks .swiper-button-disabled {
		display: none !important;
	}

	#sliderFooterLinks .swiper-button-prev {
		top: calc(50% - 30px);
		left: 10px !important;
	}

	#sliderFooterLinks .swiper-button-next {
		top: calc(50% - 30px);
		right: 10px !important;
	}
</style>