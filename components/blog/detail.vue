<template>
    <div class="container px-0">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row">
            <div class="col-12">
                <div class="row my-4 my-md-5" v-if="loading">
                    <div class="col-12 col-lg-8 mb-4 mb-md-0">
                        <div class="row ">
                            <div class="col-12 mb-2 mb-md-4">
                                <b-skeleton width="100%" height="30px"></b-skeleton>
                            </div>
                            <div class="col-12 mb-4">
                                <b-skeleton-img no-aspect height="200px"></b-skeleton-img>
                            </div>
                            <div class="col-12 mb-5">
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 pl-lg-5">
                        <div class="row">
                            <div class="col-12" id="interestYou">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <b-skeleton width="100%" height="25px"></b-skeleton>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 mb-3">
                                                <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
                                            </div>
                                            <div class="col-12">
                                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 mb-3">
                                                <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
                                            </div>
                                            <div class="col-12">
                                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 mb-3">
                                                <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
                                            </div>
                                            <div class="col-12">
                                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                                <b-skeleton class="mb-2" width="100%" height="15px"></b-skeleton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row my-4 my-md-5" v-else>                    
                    <div class="col-12 col-lg-8 mb-4 mb-md-0">
                        <div class="row">
                            <div class="col-12 mb-2 mb-md-4 blog-title">
                                <h1 class="text-left">
                                    {{ blog?.subject }}
                                </h1>
                            </div>
                            
                            <div class="col-12 mb-4" v-if="isHaftaHaftaGebelik">
                                <div id="hafta-hafta-gebelik">
                                    <!-- <ElementImage :src="`/Data/hafta-hafta-gebelik`" alt="Hafta hafta gebelik" /> -->
                                    <picture >
                                        <source type="image/jpeg" :srcset="`https://api.bebegimlehayat.com/Data/hafta-hafta-gebelik.webp`" />
                                        <img :src="`https://api.bebegimlehayat.com/Data/hafta-hafta-gebelik.jpeg`" :alt="'Hafta hafta gebelik'" :width="500" :height="500"  />
                                    </picture>
                                    <div>
                                        <span>
                                            {{ kacHaftaGebelik }}. HAFTA <br> GEBELİK
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mb-4" v-if="isAylikBebekGelisimi">
                                <div id="aylik-bebek-gelisimi">
                                    <!-- <ElementImage :src="`/Data/bebekgelisimi-temp`" alt="Aylık Bebek Gelişimi" /> -->
                                    <picture >
                                        <source type="image/jpeg" :srcset="`https://api.bebegimlehayat.com/Data/bebekgelisimi-temp.webp`" />
                                        <img :src="`https://api.bebegimlehayat.com/Data/bebekgelisimi-temp.jpeg`" :alt="'Aylık Bebek Gelişimi'" :width="500" :height="500"  />
                                    </picture>
                                    <div>
                                        <span>
                                            {{ kacAylikBebekGelisimi }} AYLIK <br> BEBEK GELİŞİMİ
                                        </span>
                                    </div>
                                </div>
                            </div>
                            

                            <div class="col-12 mb-4" v-if="blog && blog.image && !isHaftaHaftaGebelik && !isAylikBebekGelisimi">
                                <!-- <ElementImage :src="`/Data/image/medium/${blog.image}`" :alt="blog.subject" /> -->
                                <picture >
                                    <source type="image/jpeg" :srcset="`https://api.bebegimlehayat.com/Data/image/medium/${blog.image}.webp`" />
                                    <img :src="`https://api.bebegimlehayat.com/Data/image/medium/${blog.image}.jpeg`" :alt="blog.subject" :width="500" :height="500"  />
                                </picture>
                            </div>

                            <div class="col-12 mb-5">
                                <div class="float-right position-relative">
                                    <div class="share-button d-flex align-items-center"
                                        @click="shareButtonActive = !shareButtonActive">
                                        Paylaş
                                        <span class="ml-3 rounded-circle">
                                            <b-icon-share-fill variant="white" font-scale="2"></b-icon-share-fill>
                                        </span>
                                    </div>
                                    <transition name="fade">
                                        <div id="share-network-list" v-show="shareButtonActive">
                                            <ShareNetwork v-for="network in networks" :name="network.name"
                                                :network="network.network" :key="network.network"
                                                :style="{ backgroundColor: network.color }" :url="sharing.url"
                                                :title="sharing.title" :description="sharing.description"
                                                :quote="sharing.quote" :hashtags="sharing.hashtags"
                                                :twitterUser="sharing.twitterUser">
                                                <i :class="network.icon"></i>
                                                <span>{{ network.name }}</span>
                                            </ShareNetwork>
                                        </div>
                                    </transition>
                                </div>
                            </div>

                            <div class="col-12 mb-5" v-if="getBlogTitleList && getBlogTitleList.length > 0">
                                <div class="float-left w-100 p-3 border rounded" id="blog-detail-short-link">
                                    <a class="float-left w-100 h6 font-weight-normal my-1"
                                        v-for="(section, index) in getBlogTitleList" :href="`#blog_detail_${section.unique}`">
                                        <span>
                                            {{ index + 1 }}.
                                        </span>
                                        {{ section.name }} <b-icon-arrow-down scale=".8" class="font-weight-bold ml-2"></b-icon-arrow-down>
                                    </a>
                                </div>
                            </div>

                            <div class="col-12 mb-5" id="blog_detail">
                                <section v-for="(section, index) in blog?.sections" :id="`blog_detail_${section.unique}`">
                                    <div v-html="section.value" v-if="section.type == 'content'"></div>
                                </section>
                            </div>


                            <div class="col-12">
                                <div class="float-left position-relative">
                                    <div class="share-button d-flex align-items-center"
                                        @click="shareButtonActive = !shareButtonActive">
                                        Paylaş
                                        <span class="ml-3 rounded-circle">
                                            <b-icon-share-fill variant="white" font-scale="2"></b-icon-share-fill>
                                        </span>
                                    </div>
                                    <transition name="fade">
                                        <div id="share-network-list" v-show="shareButtonActive">
                                            <ShareNetwork v-for="network in networks" :name="network.name"
                                                :network="network.network" :key="network.network"
                                                :style="{ backgroundColor: network.color }" :url="sharing.url"
                                                :title="sharing.title" :description="sharing.description"
                                                :quote="sharing.quote" :hashtags="sharing.hashtags"
                                                :twitterUser="sharing.twitterUser">
                                                <i :class="network.icon"></i>
                                                <span>{{ network.name }}</span>
                                            </ShareNetwork>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 pl-lg-5">
                        <div class="row">
                            <div class="col-12" id="interestYou">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <h5 class="font-weight-bold">
                                            Bu makaleler de ilgini çekebilir
                                        </h5>
                                    </div>
                                    <div class="col-12" v-for="(blog, index) in otherBlog">
                                        <BlogCartBottom v-bind:key="`blogCartBottom${index}`" :blog="blog" :index="index"
                                            :className="'col-12'"></BlogCartBottom>
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
        name: 'MakaleDetay',
        head() {
            return {
                title: this.seo_title,
                meta: [
                    { hid: 'keywords', name: 'keywords', content: this.seo_keyword },
                    { hid: 'description', name: 'description', content: this.seo_description },
                    { hid: 'og:title', property: 'og:title', content: this.seo_title },
                    { hid: 'og:description', property: 'og:description', content: this.seo_description }
                ],
                script: [
                    {
                        type: 'application/ld+json',
                        json: this.blogPosting
                    }
                ]
            }
        },
        data() {
            return {
                loading:true,
                seo_title: 'Blog Detay',
                seo_keyword: 'blog',
                seo_description: 'Blog Detay',
                navigation: undefined,
                blog: undefined,
                sliders: undefined,
                otherBlog: undefined,
                shareButtonActive: false,
                sharing: {
                    url: "",
                    title: 'Paylaşım',
                    description: 'Paylaşım',
                    quote: '',
                    hashtags: 'eticaret,satis,shop',
                    twitterUser: 'youyuxi'
                },
                networks: [
                    { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
                    { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
                    { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin', color: '#007bb5' },
                    { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger', color: '#0084ff' },
                    { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' },
                    { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
                    { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
                    { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
                    { network: 'tumblr', name: 'Tumblr', icon: 'fab fah fa-lg fa-tumblr', color: '#35465c' },
                    { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
                    { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
                    { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' }
                ]
            }
        },
        async fetch() {           
			await this.getBlogDetail();
            this.loading = false;
        },
        props: {
            seoLink: {
                type: String
            }
        },
        computed: {
            getBlogTitleList() {
                return this.blog?.sections?.filter(x => x.unique != '')
            },
            isHaftaHaftaGebelik() {
                return this.blog?.seo_link?.indexOf('-hafta-gebelik') > -1 ? true : false;
            },
            kacHaftaGebelik() {
                return this.blog?.seo_link?.split('-')[0] || "";
            },

            isAylikBebekGelisimi() {
                return this.blog?.seo_link?.indexOf('-aylik-bebek-gelisimi') > -1 ? true : false;
            },
            kacAylikBebekGelisimi() {
                return this.blog?.seo_link?.split('-')[0] || "";
            }
        },
        methods: {
            blogViewed() {
                var _this = this;
                var seo_link = _this.seoLink;
                _this.$repositories.blog.viewed(seo_link)
                    .then(res => {
                        if (res.data.success == 'success')
                            console.log("Görüldü.")
                    });
            },
            getBlogDetail() {
                return new Promise((resolve,reject) => {
                    var _this = this;
                    var seo_link = _this.seoLink;
                    _this.$repositories.blog.show(seo_link)
                        .then(res => {
                            if (res) {
                                _this.blog = res.data.response;
    
                                if (_this.blog.sections && _this.blog.sections.length > 0) {
                                    _this.blog.sections.map((item,index) => {
                                        if(_this.$checkIsNullOrEmpty(item.name)) {
                                            item["unique"] = 'blog_' + index;
                                        }
                                        else {
                                            item["unique"] = '';
                                        }
                                    })
                                }
    
                                _this.seo_title = _this.blog.seo_title;
                                _this.seo_keyword = _this.blog.seo_keyword;
                                _this.seo_description = _this.blog.seo_description;
                                _this.otherBlog = res.data.response.otherBlogs;
                                _this.navigation = [
                                    {
                                        "name": _this.blog.category_name,
                                        "url": _this.blog.category_seo_link
                                    },
                                    {
                                        "name": _this.blog.subject,
                                        "url": _this.blog.seo_link
                                    }
                                ];

                                this.blogPosting = {
                                    "@context": "http://schema.org",
                                    "@type": "BlogPosting",
                                    "mainEntityOfPage":{
                                        "@type":"WebPage",
                                        "@id": process.env.baseUrl + '/' + this.blog?.seo_link
                                    },
                                    "headline": this.seo_title,
                                    "image": this.blog.images,
                                    "datePublished": this.blog?.updatedAt.split('T')[0],
                                    "dateModified": this.blog?.createdAt.split('T')[0],
                                    "author": {
                                        "@type": "Person",
                                        "id": "https://bebegimlehayat.com/yazar/admin",
                                        "name":"Bebegimlehayat",
                                        "url": "https://bebegimlehayat.com/yazar/admin",
                                        "image": {
                                            "type":"ImageObject",
                                            "id": "https://bebegimlehayat.com/Data/Logo%20(1)-1684804940478.png",
                                            "url": "https://bebegimlehayat.com/Data/Logo%20(1)-1684804940478.png",
                                            "caption": "bebegimlehayat.com",
                                            "inLanguage": "tr"
                                        }
                                    },
                                    "publisher": {
                                        "@type": "Organization",
                                        "name": "BebegimleHayat",
                                        "logo": {
                                            "@type": "ImageObject",
                                            "url": "https://bebegimlehayat.com/Data/Logo%20(1)-1684804940478.png", 
                                            "width": 714,
                                            "height": 83
                                        }
                                    },
                                    "description": this.seo_description,
                                    "articleBody": this.blog.articleBody
                                }

                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                })
            }
        },
        async mounted() {
            var _this = this;
            _this.sharing.url = window.location.href;
            _this.blogViewed();
        }
    }
</script>

<style lang="scss">
#hafta-hafta-gebelik div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#hafta-hafta-gebelik {
    position: relative;
}

#hafta-hafta-gebelik div span {
    @media screen and (max-width: 1200px) {
        font-size: 43px;
        line-height: 43px;
    }

    @media screen and (max-width: 1025px) {
        font-size: 38px;
        line-height: 40px;
    }

    @media screen and (max-width: 993px) {
        font-size: 43px;
        line-height: 43px;
    }

    @media screen and (max-width: 769px) {
        font-size: 35px;
        line-height: 35px;	
    }

    @media screen and (max-width: 541px) {			
        font-size: 23px;
        line-height: 23px;
    }

    color: #eaa9cb;
    font-size: 50px;
    text-align: center;
    line-height: 49px;
    font-weight: 700;
    margin-top: 3.2em;

    
}

#aylik-bebek-gelisimi div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#aylik-bebek-gelisimi {
    position: relative;
}

#aylik-bebek-gelisimi div span {
    @media screen and (max-width: 1200px) {
        font-size: 40px;
        line-height: 43px;
    }

    @media screen and (max-width: 1025px) {
        font-size: 35px;
        line-height: 48px;
    }

    @media screen and (max-width: 993px) {
        font-size: 40px;
        line-height: 43px;
    }

    @media screen and (max-width: 769px) {
        font-size: 33px;
        line-height: 35px;	
    }

    @media screen and (max-width: 541px) {			
        font-size: 19px;
        line-height: 23px;
    }

    color: #eaa9cb;
    font-size: 45px;
    text-align: center;
    line-height: 45px;
    font-weight: 700;
    margin-bottom: 2.2em;    
}

#interestYou {
    background: #f5f2ee;
    padding: 30px;
}

#blog-detail-short-link a:hover {
    color: #0196aa;
}

#blog_detail section h1 {
    font-size: 26px;
    font-weight: bold;
}

#blog_detail section h2 {
    font-size: 24px;
    line-height: 1.3;
    font-weight: 700;
    margin-top: 30px;
}

#blog_detail section h3 {
    font-size: 22px;
    font-weight: 600;
}

#blog_detail section h4 {
    font-size: 20px;
    font-weight: 500;
}

#blog_detail section h5 {
    font-size: 18px;
    font-weight: normal;
}

#blog_detail section h6 {
    font-size: 16px;
    font-weight: normal;
}

#blog_detail section h2 + p {
    margin-top: 15px;
}

#blog_detail section p {
    font-family: Merriweather,serif;
    line-height: 1.8;
    letter-spacing: .2px;
    font-size: 17px;
    font-weight: normal;
    margin-bottom: 10px;
}

#blog_detail section *+* {
    margin-top: 30px;
}

@media screen and (max-width: 1200px) {}

@media screen and (max-width: 1025px) {}

@media screen and (max-width: 993px) {}

@media screen and (max-width: 768px) {}

@media screen and (max-width: 540px) {
    .blog-title h1 {
        font-size: 20px;
        line-height: 26px;
    }
}

@media screen and (max-width: 420px) {
}

@media screen and (max-width: 360px) {
}
</style>
