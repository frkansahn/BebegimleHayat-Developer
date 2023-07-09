<template>
	<div class="row my-5">
		<div class="col-12">
            <h2 class="text-center font-weight-semibold mb-4 block-title">
                Hafta Hafta Gebelik
            </h2>
            <div class="slider" id="sliderPregnancyWeekByWeek">
                <div class="row">
                    <div class="col-12" v-show="loading">
                        <swiper ref="mySwiper"  :options="swiperOptions" @ready="handleSwiperReadied">
                            <swiper-slide :class="!loading ? 'col-6 col-sm-4 col-md-3 col-lg-2':''" v-for="(slide, index) in pregnancies" v-bind:key="`Slider${index}`">
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
                                        <img loading="lazy" width="140" height="140" :src="slide.image" />
                                    </span>
                                </NuxtLink>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-prev swiper-button-prev-pregnancy" slot="button-prev"></div>
                        <div class="swiper-button-next swiper-button-next-pregnancy" slot="button-next"></div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'PregnancyWeekByWeek',
    data() {
        return {
            loading:false,
            swiperOptions: {
				loop: false,
                lazy: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false
				},
				navigation: {
					"nextEl": ".swiper-button-next-pregnancy",
					"prevEl": ".swiper-button-prev-pregnancy"
				},
				breakpoints: {
                    1024: {
                        slidesPerView: 9,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 7,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 8
                    },
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 8
                    }
                }
			},
            pregnancies : [
                {
                    "name":"2",
                    "url":"/2-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-2.png"
                },
                {
                    "name":"3",
                    "url":"/3-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-3.png"
                },
                {
                    "name":"4",
                    "url":"/4-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-4.png"
                },
                {
                    "name":"5",
                    "url":"/5-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-5.png"
                },
                {
                    "name":"6",
                    "url":"/6-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-6.png"
                },
                {
                    "name":"7",
                    "url":"/7-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-7.png"
                },
                {
                    "name":"8",
                    "url":"/8-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-8.png"
                },
                {
                    "name":"9",
                    "url":"/9-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-9.png"
                },
                {
                    "name":"10",
                    "url":"/10-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-10.png"
                },
                {
                    "name":"11",
                    "url":"/11-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-11.png"
                },
                {
                    "name":"12",
                    "url":"/12-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-12.png"
                },
                {
                    "name":"13",
                    "url":"/13-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-13.png"
                },
                {
                    "name":"14",
                    "url":"/14-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-14.png"
                },
                {
                    "name":"15",
                    "url":"/15-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-15.png"
                },
                {
                    "name":"16",
                    "url":"/16-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-16.png"
                },
                {
                    "name":"17",
                    "url":"/17-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-17.png"
                },
                {
                    "name":"18",
                    "url":"/18-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-18.png"
                },
                {
                    "name":"19",
                    "url":"/19-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-19.png"
                },
                {
                    "name":"20",
                    "url":"/20-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-20.png"
                },
                {
                    "name":"21",
                    "url":"/21-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-21.png"
                },
                {
                    "name":"22",
                    "url":"/22-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-22.png"
                },
                {
                    "name":"23",
                    "url":"/23-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-23.png"
                },
                {
                    "name":"24",
                    "url":"/24-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-24.png"
                },
                {
                    "name":"25",
                    "url":"/25-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-25.png"
                },
                {
                    "name":"26",
                    "url":"/26-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-26.png"
                },
                {
                    "name":"27",
                    "url":"/27-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-27.png"
                },
                {
                    "name":"28",
                    "url":"/28-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-28.png"
                },
                {
                    "name":"29",
                    "url":"/29-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-29.png"
                },
                {
                    "name":"30",
                    "url":"/30-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-30.png"
                },
                {
                    "name":"31",
                    "url":"/31-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-31.png"
                },
                {
                    "name":"32",
                    "url":"/32-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-32.png"
                },
                {
                    "name":"33",
                    "url":"/33-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-33.png"
                },
                {
                    "name":"34",
                    "url":"/34-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-34.png"
                },
                {
                    "name":"35",
                    "url":"/35-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-35.png"
                },
                {
                    "name":"36",
                    "url":"/36-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-36.png"
                },
                {
                    "name":"37",
                    "url":"/37-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-37.png"
                },
                {
                    "name":"38",
                    "url":"/38-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-38.png"
                },
                {
                    "name":"39",
                    "url":"/39-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-39.png"
                },
                {
                    "name":"40",
                    "url":"/40-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-40.png"
                },
                {
                    "name":"41",
                    "url":"/41-hafta-gebelik",
                    "image":"/Data/fruit/fruit-week-41.png"
                }
            ]
        }
    },
    methods : {
        handleSwiperReadied() {
            this.loading = true;
        }
    }
}
</script>

<style scoped lang="scss">
    .block-title {
        font-size: 2rem;
        font-weight: 500;

        @media screen and (max-width:768px) {
            font-size:1.6rem;
        }

        @media screen and (max-width:540px) {
            font-size:1.3rem;
        }
    }

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
