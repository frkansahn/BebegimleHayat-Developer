<template>
    <div id="blog_category_page">
        <div class="row" v-if="blog_category">
            <div class="col-12 mw-1440 mx-auto px-0 px-md-3 mb-1">
                <div class="position-relative" id="blog_category">
                    <div class="pic category-pic" v-if="blog_category.image">
                        <!-- <ElementImage v-desktop :src="`/Data/image/extra_big/${blog_category.image}`"
                            :alt="blog_category.category_name" />
                        <ElementImage v-tablet :src="`/Data/image/medium/${blog_category.image}`"
                            :alt="blog_category.category_name" />
                        <ElementImage v-mobile :src="`/Data/image/medium/${blog_category.image}`"
                            :alt="blog_category.category_name" /> -->

                        <picture v-desktop>
							<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/extra_big/${blog_category.image}.webp`" />
							<img :src="`https://api.bebegimlehayat.com/Data/image/extra_big/${blog_category.image}.jpeg`" :alt="blog_category.category_name" :width="1408" :height="493"  />
						</picture>

                        <picture v-tablet>
							<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/medium/${blog_category.image}.webp`" />
							<img :src="`https://api.bebegimlehayat.com/Data/image/medium/${blog_category.image}.jpeg`" :alt="blog_category.category_name" :width="704" :height="246"  />
						</picture>

                        <picture v-mobile>
							<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/medium/${blog_category.image}.webp`" />
							<img :src="`https://api.bebegimlehayat.com/Data/image/medium/${blog_category.image}.jpeg`" :alt="blog_category.category_name" :width="704" :height="246"  />
						</picture>
                    </div>
                    <div class="txt">
                        <div class="center">
                            <h1>
                                {{ blog_category.category_name }}
                            </h1>
                            <p v-html="blog_category.description"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col-12">
                <b-skeleton-img no-aspect height="400px"></b-skeleton-img>
            </div>
        </div>

        <div class="row" v-if="blog_category && blog_category.url != 'bebek-sozlugu'">
            <div class="container">
                <Navigation :nav="navigation" v-if="navigation" />
                <div class="row my-3 my-md-5" v-if="blog_category && blog_category.other_categories">
                    <div class="col-12">
                        <SliderOtherCategories :breakpoints="{
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 15
                            },
                            768: {
                                slidesPerView: 4.3,
                                spaceBetween: 10
                            },
                            640: {
                                slidesPerView: 3.3,
                                spaceBetween: 8
                            },
                            460: {
                                slidesPerView: 2.5,
                                spaceBetween: 8
                            },
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 8
                            },
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 8
                            }
                        }" :sliders="blog_category.other_categories" />
                    </div>
                </div>
                <div class="row my-4">
                    <div class="col-12">
                        <div class="row px-2" v-if="blog_category">
                            <BlogListPagination :seo-link="$route.params.seoLink" :blogCategory="blog_category" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="container">
                <Navigation :nav="navigation" v-if="navigation" />
                <div class="row my-5" v-if="blog_category && blog_category.other_categories">
                    <BlogBabyDictionaryParentCategory :otherCategory="blog_category.other_categories" />
                </div>
            </div>
        </div>

        <div class="row" v-if="!blog_category">
            <div class="container">
                <div class="row my-3 my-md-5" >
                    <div class="col-12 col-sm-6 col-md-3 col-lg-2">
                        <b-skeleton-img no-aspect height="110px"></b-skeleton-img>
                        <b-skeleton class="mt-2" width="100%" height="15px"></b-skeleton>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 col-lg-2">
                        <b-skeleton-img no-aspect height="110px"></b-skeleton-img>
                        <b-skeleton class="mt-2" width="100%" height="15px"></b-skeleton>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 col-lg-2">
                        <b-skeleton-img no-aspect height="110px"></b-skeleton-img>
                        <b-skeleton class="mt-2" width="100%" height="15px"></b-skeleton>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 col-lg-2">
                        <b-skeleton-img no-aspect height="110px"></b-skeleton-img>
                        <b-skeleton class="mt-2" width="100%" height="15px"></b-skeleton>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 col-lg-2">
                        <b-skeleton-img no-aspect height="110px"></b-skeleton-img>
                        <b-skeleton class="mt-2" width="100%" height="15px"></b-skeleton>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 col-lg-2">
                        <b-skeleton-img no-aspect height="110px"></b-skeleton-img>
                        <b-skeleton class="mt-2" width="100%" height="15px"></b-skeleton>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
export default
    {
        name: 'BlogCategory',
        head() {
            return {
                title: this.seo_title,
                meta: [
                    { hid: 'keywords', name: 'keywords', content: this.seo_keyword },
                    { hid: 'description', name: 'description', content: this.seo_description },
                    { hid: 'og:title', property: 'og:title', content: this.seo_title },
                    { hid: 'og:description', property: 'og:description', content: this.seo_description },
                ],
            }
        },
        async fetch() {
            await this.getBlogCategory();
        },
        data() {
            return {
                seo_title: 'Bebeklere Dair Her Şey Burada! | BebegimleHayatBebegimle Hayat',
                seo_description: 'Bebeklere Dair Her Şey Burada! | BebegimleHayat',
                seo_keyword: 'BebegimVeBen',
                navigation: undefined,
                blog_category: undefined,
                screen: 'desktop'
            }
        },
        props: {
            seoLink: {
                type: String
            }
        },
        methods: {
            eventWindowResize() {
                const _this = this;
                if (window.screen.width > 0 && window.screen.width < 768) {
                    _this.screen = 'mobile'
                }
                else if (window.screen.width > 767 && window.screen.width < 992) {
                    _this.screen = 'tablet'
                }
                else {
                    _this.screen = 'desktop'
                }
            },
            getBlogCategory() {
                return new Promise((resolve, reject) => {
                    this.$repositories.blog_category.getBlogCategoryBySeoLink(this.seoLink)
                        .then(res => {
                            this.blog_category = res?.data?.response;

                            this.seo_title = this.blog_category?.seo_title;
                            this.seo_description = this.blog_category?.seo_description;
                            this.seo_keyword = this.blog_category?.seo_keyword;

                            if (this.blog_category?.parent_id) {
                                let parentCategory = this.blog_category?.other_categories?.find(x => x.id == this.blog_category.parent_id);
                                this.navigation = [
                                    {
                                        "name": parentCategory?.category_name,
                                        "url": parentCategory?.url
                                    },
                                    {
                                        "name": this.blog_category?.category_name,
                                        "url": this.blog_category?.url
                                    }
                                ]
                            }
                            else {
                                this.navigation = [
                                    {
                                        "name": this.blog_category?.category_name,
                                        "url": this.blog_category?.url
                                    }
                                ]
                            }

                            resolve(true);
                        })
                        .catch(err => {
                            resolve(false);
                        })
                })
            }
        },
        async mounted() {
            const _this = this;
            _this.eventWindowResize();
            window.addEventListener("resize", _this.eventWindowResize);
        }
    }
</script>

<style lang="scss">
#blog_category {
    min-height: 110px;

    .category-pic {
        overflow: hidden;
        position: relative;
        padding-bottom: 35%;
        width: 100%;

        @media screen and (max-width: 768px) {
            padding-bottom: 80%;
        }

        @media screen and (max-width: 540px) {
            padding-bottom: 110%;
        }

        picture {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            object-fit: cover;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
    }

    .txt {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .4);
        padding: 30px 0;

        @media screen and (max-width: 768px) {
            padding: 20px 0;
        }

        .center {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            padding: 0 30px;
            box-sizing: content-box;
            color: #fff;

            @media screen and (max-width: 768px) {
                padding: 0 20px;
            }

            @media screen and (max-width: 540px) {
                padding: 0 10px;
            }

            h1 {
                font-size: 30px;
                line-height: 1.3;

                @media screen and (max-width: 768px) {
                    font-size: 26px;
                }

                @media screen and (max-width: 540px) {
                    font-size: 20px;
                }
            }

            p {
                font-size: 17px;

                @media screen and (max-width: 768px) {
                    font-size: 15px;
                }

                @media screen and (max-width: 540px) {
                    font-size: 12px;
                }
            }
        }
    }
}</style>
