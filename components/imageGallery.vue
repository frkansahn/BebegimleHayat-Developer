<template>
  <div class="image-gallery">
  	<span class="close-gallery" @click="closeGallery">
  		&times;
  	</span>
    <!-- swiper1 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      	<swiper-slide class="text-center d-flex align-items-center justify-content-center" v-for="(image,index) in images" :key="`gallery${index}`">
      		<img :src="image" alt="Resim" data-not-lazy>
      	</swiper-slide>
      	<div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      	<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
    	<swiper-slide class="d-flex align-items-center justify-content-center" v-for="(image,index) in images" :key="`galleryThumbs${index}`">
      		<img :src="image" alt="Resim" data-not-lazy>
      	</swiper-slide>
    </swiper>
  </div>
</template>

<script>

  export default {
    name: 'swiper-example-thumbs-gallery',
    title: 'Thumbs gallery with Two-way control',
    props:["images"],
    data() {
      return {
        swiperOptionTop: {
          loop: true,
          loopedSlides: 10,
          centeredSlides: true,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          loop: true,
          loopedSlides: 10, // looped slides should be the same
          spaceBetween: 0,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
      }
    },
    methods:{
    	closeGallery(){
    		this.$emit('closeGallery');
    	}
    },
    mounted() {
      	this.$nextTick(() => {
	        const swiperTop = this.$refs.swiperTop.$swiper
	        const swiperThumbs = this.$refs.swiperThumbs.$swiper
	        swiperTop.controller.control = swiperThumbs
	        swiperThumbs.controller.control = swiperTop
      	})
    }
  }
</script>

<style lang="scss" scoped>
	.image-gallery {
		background-color: #000000fa;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999999999999999;
	}

	.close-gallery {
		position: fixed;
		top: 0;
		right: 0;
		color: #ffffff;
		font-size: 50px;
		width: 50px;
		height: 50px;
		line-height: 42px;
		text-align: center;
		background: #000000;
		cursor: pointer;
		z-index: 2;
	}

	.swiper {
		.swiper-slide {
			background-size: cover;
			background-position: center;
		}

		&.gallery-top {
			height: 80%;
			width: 100%;
			padding: 1em 0;
		}
		&.gallery-thumbs {
			height: 20%;
			box-sizing: border-box;
			padding: 1em 0;
		}
		&.gallery-thumbs .swiper-slide {
			width: 14.28%;
			height: 100%;
			opacity: 0.4;
			padding: 0 0.5em;
		}
		&.gallery-thumbs .swiper-slide-active {
			opacity: 1;
		}
	}
</style>