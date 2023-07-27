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
                    <div class="col-12 col-lg-8 mb-4 mb-md-0" id="blogDetail">
                        <div class="row">
                            <div class="col-12 mb-2 mb-md-4 blog-title">
                                <h1 class="text-left">
                                    {{ blog?.subject }}
                                </h1>
                            </div>

                            <div class="col-12 mb-4" v-if="isHaftaHaftaGebelik">
                                <div id="hafta-hafta-gebelik">
                                    <!-- <ElementImage :src="`/Data/hafta-hafta-gebelik`" alt="Hafta hafta gebelik" /> -->
                                    <picture>
                                        <source type="image/webp"
                                            :srcset="`https://api.bebegimlehayat.com/Data/hafta-hafta-gebelik.webp`" />
                                        <img :src="`https://api.bebegimlehayat.com/Data/hafta-hafta-gebelik.jpeg`"
                                            :alt="'Hafta hafta gebelik'" :width="500" :height="500" />
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
                                    <picture>
                                        <source type="image/webp"
                                            :srcset="`https://api.bebegimlehayat.com/Data/bebekgelisimi-temp.webp`" />
                                        <img :src="`https://api.bebegimlehayat.com/Data/bebekgelisimi-temp.jpeg`"
                                            :alt="'Aylık Bebek Gelişimi'" :width="500" :height="500" />
                                    </picture>
                                    <div>
                                        <span>
                                            {{ kacAylikBebekGelisimi }} AYLIK <br> BEBEK GELİŞİMİ
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div class="col-12 mb-4"
                                v-if="blog && blog.image && !isHaftaHaftaGebelik && !isAylikBebekGelisimi">
                                <!-- <ElementImage :src="`/Data/image/medium/${blog.image}`" :alt="blog.subject" /> -->
                                <picture>
                                    <source type="image/webp"
                                        :srcset="`https://api.bebegimlehayat.com/Data/image/medium/${blog.image}.webp`" />
                                    <img :src="`https://api.bebegimlehayat.com/Data/image/medium/${blog.image}.jpeg`"
                                        :alt="blog.subject" :width="500" :height="500" />
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
                                            <a :href="`https://www.facebook.com/sharer/sharer.php?u=${href}`"
                                                target="_blank"
                                                class="d-flex align-items-center justify-content-center border border-dark p-2 rounded-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1"
                                                    width="25" height="25" viewBox="0 0 512 512" xml:space="preserve">
                                                    <g id="7935ec95c421cee6d86eb22ecd11b7e3">
                                                        <path style="display: inline;"
                                                            d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379   c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302   c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263   l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z">

                                                        </path>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a :href="`http://twitter.com/share?text=Bebegimle&url=${href}&hashtags=baby`"
                                                target="_blank"
                                                class="d-flex align-items-center justify-content-center border border-dark p-2 rounded-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25"
                                                    viewBox="0 -2 20 20" version="1.1">
                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none"
                                                        fill-rule="evenodd">
                                                        <g id="Dribbble-Light-Preview"
                                                            transform="translate(-60.000000, -7521.000000)" fill="#000000">
                                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                                <path
                                                                    d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                                                                    id="twitter-[#154]">

                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a :href="`https://api.whatsapp.com/send?text=${href}`" target="_blank"
                                                class="d-flex align-items-center justify-content-center border border-dark p-2 rounded-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                    viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                                                        fill="#0F0F0F" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                                                        fill="#0F0F0F" />
                                                </svg>
                                            </a>
                                        </div>
                                    </transition>
                                </div>
                            </div>

                            <div class="col-12 mb-5" v-if="$route.fullPath == '/bebek-isimleri'">
                                <div class="row mb-3">
                                    <p class="baby-names-description">
                                        Bebeğinize isim mi arıyorsunuz? Hem kız hem de erkek bebekler için en güzel ve hoş
                                        isimleri sizler için bir araya topladık. Listemizde rahatça gezerek erkek ve kız
                                        bebek isimlerini ve anlamlarını rahatlıkla keşfedebilirsiniz. Kız ve erkek
                                        bebekleriniz için en güzel isimleri sayfamızda bulabilirsiniz!
                                    </p>
                                </div>
                                <BlogDetailBabyNames :gender="null" />
                            </div>
                            <div class="col-12 mb-5" v-else-if="$route.fullPath == '/kiz-bebek-isimleri'">
                                <div class="row mb-3">
                                    <p class="baby-names-description">
                                        Kız bebeğinize isim mi arıyorsunuz? Güzel ve tatlı kız bebek isimlerini kolayca
                                        bulabilmeniz için sayfamızda bir araya getirdik. Kız bebek isimlerini ve anlamlarını
                                        isim listemizde öğrenebilir ve kız bebeğiniz için en iyi ismi keşfedebilirsiniz!
                                    </p>
                                </div>
                                <BlogDetailBabyNames :gender="1" />
                            </div>
                            <div class="col-12 mb-5" v-else-if="$route.fullPath == '/erkek-bebek-isimleri'">
                                <div class="row mb-3">
                                    <p class="baby-names-description">
                                        Erkek bebeğiniz için isim mi arıyorsunuz? Birbirinden güzel ve ilgi çekici erkek
                                        bebek isimlerini sizin için bir araya getirdik. Erkek bebek isimlerini ve
                                        anlamlarını isim listemizde kolayca gezerken bulabilir ve erkek bebeğiniz için doğru
                                        ismi keşfedebilirsiniz!
                                    </p>
                                </div>
                                <BlogDetailBabyNames :gender="0" />
                            </div>
                            <div class="col-12" v-else>
                                <div class="row">
                                    <div class="col-12 mb-5" v-if="getBlogTitleList && getBlogTitleList.length > 0">
                                        <div class="float-left w-100 p-3 border rounded" id="blog-detail-short-link">
                                            <a class="float-left w-100 h6 font-weight-normal my-1"
                                                v-for="(section, index) in getBlogTitleList"
                                                :href="`#blog_detail_${section.unique}`">
                                                <span>
                                                    {{ index + 1 }}.
                                                </span>
                                                {{ section.name }} <b-icon-arrow-down scale=".8"
                                                    class="font-weight-bold ml-2"></b-icon-arrow-down>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-5" id="blog_detail">
                                        <section v-for="(section, index) in blog?.sections"
                                            :id="`blog_detail_${section.unique}`">
                                            <div v-html="section.value" v-if="section.type == 'content'"></div>
                                        </section>
                                    </div>
                                </div>
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
                                            <a :href="`https://www.facebook.com/sharer/sharer.php?u=${href}`"
                                                target="_blank"
                                                class="d-flex align-items-center justify-content-center border border-dark p-2 rounded-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1"
                                                    width="25" height="25" viewBox="0 0 512 512" xml:space="preserve">
                                                    <g id="7935ec95c421cee6d86eb22ecd11b7e3">
                                                        <path style="display: inline;"
                                                            d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379   c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302   c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263   l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z">

                                                        </path>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a :href="`http://twitter.com/share?text=Bebegimle&url=${href}&hashtags=baby`"
                                                target="_blank"
                                                class="d-flex align-items-center justify-content-center border border-dark p-2 rounded-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25"
                                                    viewBox="0 -2 20 20" version="1.1">
                                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none"
                                                        fill-rule="evenodd">
                                                        <g id="Dribbble-Light-Preview"
                                                            transform="translate(-60.000000, -7521.000000)" fill="#000000">
                                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                                <path
                                                                    d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                                                                    id="twitter-[#154]">

                                                                </path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <a :href="`https://api.whatsapp.com/send?text=${href}`" target="_blank"
                                                class="d-flex align-items-center justify-content-center border border-dark p-2 rounded-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                    viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                                                        fill="#0F0F0F" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                                                        fill="#0F0F0F" />
                                                </svg>
                                            </a>
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
import Vue from 'vue'
import { SkeletonPlugin } from 'bootstrap-vue'
Vue.use(SkeletonPlugin)

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
                loading: true,
                seo_title: 'Blog Detay',
                seo_keyword: 'blog',
                seo_description: 'Blog Detay',
                navigation: undefined,
                blog: undefined,
                sliders: undefined,
                otherBlog: undefined,
                href: null,
                shareButtonActive: false
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
                return new Promise((resolve, reject) => {
                    var _this = this;

                    if (_this.$route.fullPath == '/bebek-isimleri'
                        || _this.$route.fullPath == '/kiz-bebek-isimleri'
                        || _this.$route.fullPath == '/erkek-bebek-isimleri') {
                        var seo_link = _this.seoLink;
                        _this.$repositories.blog.showNoSection(seo_link)
                            .then(res => {
                                if (res) {
                                    _this.blog = res.data.response;
                                    _this.href = "https://bebegimlehayat.com/" + _this.blog.seo_link;
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
                                        "mainEntityOfPage": {
                                            "@type": "WebPage",
                                            "@id": process.env.baseUrl + '/' + this.blog?.seo_link
                                        },
                                        "headline": this.seo_title,
                                        "image": this.blog.images,
                                        "datePublished": this.blog?.updatedAt.split('T')[0],
                                        "dateModified": this.blog?.createdAt.split('T')[0],
                                        "author": {
                                            "@type": "Person",
                                            "id": "https://bebegimlehayat.com/yazar/admin",
                                            "name": "Bebegimlehayat",
                                            "url": "https://bebegimlehayat.com/yazar/admin",
                                            "image": {
                                                "type": "ImageObject",
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
                    }
                    else {
                        var seo_link = _this.seoLink;
                        _this.$repositories.blog.show(seo_link)
                            .then(res => {
                                if (res) {
                                    _this.blog = res.data.response;

                                    if (_this.blog.sections && _this.blog.sections.length > 0) {
                                        _this.blog.sections.map((item, index) => {
                                            if (_this.$checkIsNullOrEmpty(item.name)) {
                                                item["unique"] = 'blog_' + index;
                                            }
                                            else {
                                                item["unique"] = '';
                                            }
                                        })
                                    }
                                    _this.href = "https://bebegimlehayat.com/" + _this.blog.seo_link;
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
                                        "mainEntityOfPage": {
                                            "@type": "WebPage",
                                            "@id": process.env.baseUrl + '/' + this.blog?.seo_link
                                        },
                                        "headline": this.seo_title,
                                        "image": this.blog.images,
                                        "datePublished": this.blog?.updatedAt.split('T')[0],
                                        "dateModified": this.blog?.createdAt.split('T')[0],
                                        "author": {
                                            "@type": "Person",
                                            "id": "https://bebegimlehayat.com/yazar/admin",
                                            "name": "Bebegimlehayat",
                                            "url": "https://bebegimlehayat.com/yazar/admin",
                                            "image": {
                                                "type": "ImageObject",
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
                    }
                })
            }
        },
        async mounted() {
            this.blogViewed();
            this.interestYouClientWidth = document.getElementById('interestYou').clientWidth;
            let interestYou = document.getElementById('interestYou')
            document.addEventListener('scroll', function (e) {
                if (window.screen.width > 992 && interestYou.clientHeight > window.innerHeight) {
                    if (window.innerHeight - interestYou.getBoundingClientRect().bottom > 30) {
                        if (!interestYou.classList.contains('sticky')) {
                            interestYou.style.maxWidth = interestYou.clientWidth + 'px';
                            interestYou.classList.add('sticky');
                            interestYou.style.bottom = '30px';
                        }
                    }

                    if (document.getElementById('blogDetail').getBoundingClientRect().top > 0) {
                        if (interestYou.classList.contains('sticky')) {
                            interestYou.classList.remove('sticky')
                            interestYou.style.maxWidth = null;
                            interestYou.style.bottom = null;
                        }
                    }

                    if (window.innerHeight - document.getElementById('footer').getBoundingClientRect().top > 30) {
                        if (interestYou.classList.contains('sticky')) {
                            interestYou.style.bottom = window.innerHeight - document.getElementById('footer').getBoundingClientRect().top + 30 + 'px';
                        }
                    }
                    else {
                        interestYou.style.bottom = '30px';
                    }
                }
            });
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

#interestYou.sticky {
    position: fixed;
    width: 100%;
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

#blog_detail section h2+p,
#blog_detail section h3+p {
    margin-top: 15px;
}

#blog_detail section p {
    line-height: 1.8;
    letter-spacing: .2px;
    font-size: 17px;
    font-weight: normal;
    margin-bottom: 10px;
}

#blog_detail section *+* {
    margin-top: 30px;
}

.baby-names-description {
    line-height: 1.8;
    letter-spacing: 0.2px;
    font-size: 17px;
    font-weight: normal;
    margin-bottom: 10px;
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

@media screen and (max-width: 420px) {}

@media screen and (max-width: 360px) {}</style>
