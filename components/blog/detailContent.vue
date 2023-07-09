<template>
    <div class="row" v-if="blog">
        <div class="col-12">
            <div class="row my-4 my-md-5">
                <div class="col-12 mb-2 mb-md-4 blog-title">
                    <h1 class="text-left">
                        {{blog.subject}}
                    </h1>
                </div>
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-12 mb-4" v-if="blog.showcase_image">
                            <!-- <ElementImage :src="`/Data/image/big/${blog.showcase_image}`" :alt="blog.subject"/> -->

                            <picture>
                                <source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/big/${blog.showcase_image}.webp`" />
                                <img :src="`https://api.bebegimlehayat.com/Data/image/big/${blog.showcase_image}.jpeg`" :alt="blog.subject" :width="400" :height="300"  />
                            </picture>
                        </div>

                        <div class="col-12 mb-5">
                            <div class="float-right position-relative">
                                <div class="share-button d-flex align-items-center" @click="shareButtonActive=!shareButtonActive">
                                    Paylaş
                                    <span class="ml-3 rounded-circle">
                                        <b-icon-share-fill variant="white" font-scale="2"></b-icon-share-fill>
                                    </span>
                                </div>
                                <transition name="fade">
                                    <div id="share-network-list" v-show="shareButtonActive">
                                        <ShareNetwork
                                            v-for="network in networks"
                                            :name="network.name"
                                            :network="network.network"
                                            :key="network.network"
                                            :style="{backgroundColor: network.color}"
                                            :url="sharing.url"
                                            :title="sharing.title"
                                            :description="sharing.description"
                                            :quote="sharing.quote"
                                            :hashtags="sharing.hashtags"
                                            :twitterUser="sharing.twitterUser"
                                        >
                                            <i :class="network.icon"></i>
                                            <span>{{ network.name }}</span>
                                        </ShareNetwork>
                                    </div>
                                </transition>
                            </div>
                        </div>

                        <div class="col-12 mb-5">
                            <section v-for="(section,index) in blog.sections">
                                <div v-html="section.value" v-if="section.type == 'content'"></div>
                            </section>
                        </div>


                        <div class="col-12">
                            <div class="float-left position-relative">
                                <div class="share-button d-flex align-items-center" @click="shareButtonActive=!shareButtonActive">
                                    Paylaş
                                    <span class="ml-3 rounded-circle">
                                        <b-icon-share-fill variant="white" font-scale="2"></b-icon-share-fill>
                                    </span>
                                </div>
                                <transition name="fade">
                                    <div id="share-network-list" v-show="shareButtonActive">
                                        <ShareNetwork
                                            v-for="network in networks"
                                            :name="network.name"
                                            :network="network.network"
                                            :key="network.network"
                                            :style="{backgroundColor: network.color}"
                                            :url="sharing.url"
                                            :title="sharing.title"
                                            :description="sharing.description"
                                            :quote="sharing.quote"
                                            :hashtags="sharing.hashtags"
                                            :twitterUser="sharing.twitterUser"
                                        >
                                            <i :class="network.icon"></i>
                                            <span>{{ network.name }}</span>
                                        </ShareNetwork>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 pl-5">
                    <div class="row">
                        <div class="col-12" id="interestYou">
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <h5 class="font-weight-bold">
                                        Bu makaleler de ilgini çekebilir
                                    </h5>
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
        name:'MakaleDetayIcerik',
        data() {
            return {
                shareButtonActive:false,
                sharing: {
                    url: '',
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
        props: ['blog']
    }
</script>

<style>
    #interestYou {
        background: #f5f2ee;
        padding: 30px;
    }
    
    @media screen and (max-width: 768px)
    {
    }

    @media screen and (max-width: 540px)
    {
        .blog-title h1
        {
            font-size: 20px;
            line-height: 26px;
        }
    }
</style>
