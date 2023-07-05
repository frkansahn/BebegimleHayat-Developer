<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 mw-1440 mx-auto">
                                <SliderHome :breakpoints="{
                                    1024: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                    768: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    }
                                }" :sliders="homeSlider" />
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <HomepagePregnancyWeekByWeek/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <HomepagePopularTools/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        <BlogNewBlogs :blogs="newBlogsData" :paging="pagingNewBlogs"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 mw-1440 mx-auto mb-5">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 mb-4 mt-5 block-title">
                                            <h2 class="float-left w-100">
                                                Herkes Onu Konuşuyor!
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <sliderType1 :breakpoints="{
                                    1024: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                    768: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    },
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 0
                                    }
                                }" :sliders="herkesOnuKonusuyorSlider" />
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="container">
                                <div class="row">
                                    <HomepageOneBlog />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-12">
                        <div class="row">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 col-lg-9 mx-auto">
                                        <HomepageBabyNames/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default
    {
        name: 'Anasayfa',
        head() {
            return {
                title: "Bebeklere Dair Her Şey Burada! | BebeğimleHayat",
                meta: [
                    { hid: 'description', name: 'description', content: "Hamilelik planlama, hamilelik, doğum, çocuk ve bebeklere dair her şeyi BebeğimleHayat 'ta bulabilir, önerilerimizle daha sağlıklı bir bebeğe sahip olabilirsin!" },
                    { hid: 'og:title', property: 'og:title', content: "Bebeklere Dair Her Şey Burada! | BebeğimleHayat" },
                    { hid: 'og:description', property: 'og:description', content: "Hamilelik planlama, hamilelik, doğum, çocuk ve bebeklere dair her şeyi BebeğimleHayat 'ta bulabilir, önerilerimizle daha sağlıklı bir bebeğe sahip olabilirsin!" }
                ],
                script: [
                    {
                        type: 'application/ld+json',
                        json: this.OrganizationSchema1
                    },
                    {
                        type: 'application/ld+json',
                        json: this.OrganizationSchema2
                    },
                    {
                        type: 'application/ld+json',
                        json: this.OrganizationSchema3
                    }
                ]
            }
        },
        watch: {
            '$route.query': '$fetch'
        },
        async fetch() {           
			let reqData = {
				"paging": {
					"start": 0,
					"end": 6
				}
			}
			
            await this.$axios.post('/api/v1/blog/get_new_blogs' , reqData)
			.then(res => {
				if(res && res.data) {
					this.newBlogsData = res.data.response.blogs;
					this.pagingNewBlogs.total = res.data.response.total;
				}
			});

            if (this.$store.state.config) {
                if (this.$store.state.config.home_page_slider) {
                    this.homeSlider = JSON.parse(this.$store.state.config.home_page_slider)
                }

                if (this.$store.state.config.home_page_slider_2) {
                    this.herkesOnuKonusuyorSlider = JSON.parse(this.$store.state.config.home_page_slider_2)
                }
            }
        },
        data() {
            return {
                isMobile: false,
                homeSlider:[],
                herkesOnuKonusuyorSlider:[],
                newBlogsData:[],
                pagingNewBlogs: {
                    currentPage: 1,
                    total: undefined,
                    length: 6
                },
                OrganizationSchema1:{
                    "@context": "http://schema.org/",
                    "@type": "Organization",
                    "name": "Bebegimlehayat",
                    "url": "https://www.bebegimlehayat.com",
                    "logo":
                    {
                    "@type": "ImageObject",
                    "url": "https://bebegimlehayat.com/Data/Logo%20(1)-1684804940478.png", 
                    "width": "200",
                    "height": "23"
                    } 
                },
                OrganizationSchema2:{
                    "@context": "http://schema.org",
                    "@type": "WebSite",
                    "url": "https://bebegimlehayat.com/"
                },
                OrganizationSchema3: {
                    "@context": "http://schema.org",
                    "@type": "WebPage",
                    "name": "Bebegimlehayat",
                    "description": "Hamilelik planlama, hamilelik, doğum, çocuk ve bebeklere dair her şeyi BebeğimleHayat 'ta bulabilir, önerilerimizle daha sağlıklı bir bebeğe sahip olabilirsin!"
                }
            }
        },
        methods: {
            eventWindowResize() {
                this.isMobile = window.screen.width > 768 ? false : true;
            },
        },
        async mounted() {
            var _this = this;
            _this.isMobile = window.screen.width > 768 ? false : true;
            window.addEventListener("resize", _this.eventWindowResize);
        }
    }
</script>

<style lang="scss">
$t-duration: 0ms;
$t-delay: 0ms;

.page-transition-enter-active,
.page-transition-leave-active {
    transition-duration: $t-duration * 2;
    height: 100vh;
}

.page-transition-leave {
    transform: translateX(-100%);
}

.page-transition-leave-active {
    transition-duration: $t-duration - $t-delay;
    transition-delay: $t-delay;
}

.page-transition-leave-to {
    transform: translateX(-100%);
}

.page-transition-enter {
    transform: translateX(-100%);
}

.page-transition-enter-active {
    transition-duration: $t-duration - $t-delay;
    transition-delay: $t-delay;
}

.page-transition-enter-to {
    transform: translateX(0);
}
</style>