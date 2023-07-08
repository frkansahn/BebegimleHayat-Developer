<template>
	<div class="col-12 blog-list-pagination" id="blogListPagination" v-if="blogs">
        <div class="row" v-if="blogs.length > 0">
            <div class="col-12 d-flex align-items-center justify-content-center" id="sort">
                <button class="btn mx-4 p-0" :class="sort == 'new' ? 'active':''" @click="sort = 'new'">
                    En yeni
                </button>
                <button class="btn mx-4 p-0" :class="sort == 'popular' ? 'active':''" @click="sort = 'popular'">
                    En popüler
                </button>
            </div>
            <div class="col-12 px-1 mb-3" v-if="blogCategory && blogCategory.parent_id">
                <h6 class="font-weight-bold text-primary">
                    {{ getParentCategory }}
                </h6>
                <h3 class="font-weight-bold">
                    {{ blogCategory.category_name }}
                </h3>
            </div>
			<div class="col-12 px-md-2">
				<div class="row">
					<BlogCartCategory v-for="(b,index) in blogs" v-bind:key="`blogsCart${index}`" :blog="b" :index="index"/>
				</div>
			</div>
            <div class="col-12 mt-3 mb-5 d-flex align-items-center justify-content-center">
				<div class="show-more" @click="showMore">
					{{ categoryBlogOverlay ? '...' : '+ DAHA FAZLA İÇERİK GÖSTER' }}
                </div>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'BlogListPagination',
	    data() {
	        return {
	        	blogs:[],
                categoryBlogOverlay:false,
                sort:'new',
                paging: {
                    currentPage: 1,
                    total: undefined,
                    length: 10
                },
                selectedSort:null
	        }
	    },
	    props:["seoLink" ,"blogCategory"],
        async fetch() {
            await this.getCategoryBlogs(); 
        },
        watch: {
            async $route(to, from) {
                this.blogs = [];
                this.getCategoryBlogs();
            },
            sort() {
                this.paging.currentPage == 1;
                this.getCategoryBlogs();
            }
        },
        computed: {
            getParentCategory() {
                if(this.blogCategory && this.blogCategory.parent_id) {
                    return this.blogCategory.other_categories?.find(x => x.parent_id == null)?.category_name;
                }
                else {
                    return null;
                }
            }
        },
	    methods:{
			showMore() {
				if((this.paging.currentPage*this.paging.length) < this.paging.total) {
					this.paging.currentPage += 1;
					this.getCategoryBlogs();
				}
			},
            getCategoryBlogs(){
                return new Promise((resolve, reject) => {
                    var _this = this;
                    if(_this.seoLink) {
                        _this.categoryBlogOverlay = true;
                        let reqData = {
                            "seo_link": _this.seoLink,
                            "filters": {
                                "property1": _this.$route.query?.p1 || "",
                                "property2": _this.$route.query?.p2 || "",
                                "brands": _this.$route.query?.brand || "",
                                "attributes":"",
                                "price":_this.$route.query?.price || "",
                                "categories":""
                            },
                            "sort": _this.sort || "",
                            "paging": {
                                "start": (_this.paging.currentPage - 1) * _this.paging.length,
                                "end": _this.paging.length
                            }
                        }
                        _this.$repositories.blog.getBlogsByCategory(reqData)
                        .then(res => {
                            if(this.paging.currentPage == 1) {
                                this.blogs = [];
                            }
                            _this.blogs.push(...res.data.response.blogs);
                            _this.paging.total = res.data.response.total;
                            _this.categoryBlogOverlay = false;
                            resolve(true);
                        });
                    }
                    else {
                        resolve(false);
                    }
                });
                
            }
	    },
        mounted(){
            this.selectedSort = this.$route.query?.sort || null;
        }
	}
</script>

<style lang="scss">
    #sort {
        margin-bottom: 2em;

        button {
            font-size: 25px;
            font-weight: bold;
            line-height: normal;
            color:#000;
            position: relative;

            @media screen and (max-width: 768px) {
                font-size: 22px;   
            }

            @media screen and (max-width: 540px) {
                font-size: 18px;
            }

            &:before {
                content: '';
                width:100%;
                height: 4px;
                position: absolute;
                bottom: 0px;
                left:0;
                background-color: transparent;
            }
            
            &.active {
                color:#00cfda;

                &:before {
                    background-color: #00cfda;
                }
            }
        }
    }
</style>
