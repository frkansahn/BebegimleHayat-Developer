<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation"/>
        <div class="row my-3 my-md-0 py-5" v-if="contents">
            <div class="col-md-2" v-if="otherContents.length > 1">
                <div class="row">
                    <OtherContents :otherContents="otherContents" title="İçerikler"/>
                </div>
            </div>
            <div :class="[otherContents.length > 1 ? 'col-12 col-md-10':'col-md-12']">
                <div class="row mt-4 mt-md-0">
                    <div class="col-12 mb-4">
                        <h1 class="text-left" id="contentsTitle">
                            {{contents.subject}}
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-6" v-if="contents.image">
                                <img :src="contents.image"/>
                            </div>
                            <div :class="[contents.image ? 'col-6' : 'col-12']">
                                <p v-html="contents.description"></p>
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
        name:'ContentsDetails',
        transition: {
            name: 'page-transition',
            mode: 'out-in'
        },
        props: {
            seoLink: {
                type: String
            }
        },
        async fetch() {
            await this.getContentDetail();
        },
        head() {
           return {
                title: this.seo_title,
                meta: [
                    { hid: 'description', name: 'description', content: this.seo_description },
                    { hid: 'og:title' ,  property: 'og:title', content: this.seo_title },
                    { hid: 'og:description' , property: 'og:description', content: this.seo_description },
                    { hid:'robots' , name: 'robots', content: this.indexing }
                ],
            }
        },
        data() {
            return {
                seo_title:'Bebegimle Hayat - İçerikler',
                seo_description: 'Bebegimle Hayat',
                seo_keyword:'Bebegimle Hayat',
                indexing:'index,follow',
                isLoading:false,
                navigation:undefined,
                contents:undefined,
                otherContents:[]
            }
        },
        methods: {
            getContentDetail() {
                return new Promise((resolve,reject) => {
                    var _this = this;
                    var seo_link = _this.seoLink;
                    _this.$repositories.content.getContentsBySeoLink(seo_link)
                    .then(res => {
                        if(res.data.success == 'success')
                        {
                            _this.contents = res.data.response;
                            _this.otherContents = _this.contents.other_contents;
                            _this.seo_title = _this.contents.seo_title;
                            _this.seo_keyword = _this.contents.seo_keyword;
                            _this.seo_description = _this.contents.seo_description;
                            _this.navigation = [
                                {
                                    "name": _this.contents.subject,
                                    "url": _this.contents.seo_link
                                }
                            ]
                            resolve(true);
                            
                        }
                        else
                        {
                            _this.$router.push('/');
                            resolve(false);
                        }
                    });
                })
            }
        }
    }
</script>

<style>
    @media screen and (max-width: 768px)
    {
    }

    @media screen and (max-width: 540px)
    {
        h1#contentsTitle
        {
            font-size: 24px;
        }
    }
</style>
