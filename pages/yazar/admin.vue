<template>
    <div id="uye_admin_page">
        <div class="row">
            <div class="container">
                <Navigation :nav="navigation" v-if="navigation" />
                <div class="row my-5">
                    <div class="col-3">
                        <div id="logo" v-html="config && config.logo"></div>
                    </div>
                    <div class="col-9">
                        <div class="row">
                            <div class="col-12 px-0">
                                <span class="h6 font-weight-normal">
                                    <strong>
                                        {{ pagingNewBlogs.total }}
                                    </strong>
                                    Adet
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <BlogNewBlogs :blogs="newBlogsData" :paging="pagingNewBlogs"/>
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
        name: 'BlogCategory',
        head() {
            return {
                title: this.seo_title 
            }
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
        },
        data() {
            return {
                seo_title: 'Bebeklere Dair Her Şey Burada! | BebegimleHayatBebegimle Hayat',
                navigation: undefined,
                newBlogsData:[],
                pagingNewBlogs: {
                    currentPage: 1,
                    total: undefined,
                    length: 6
                }
            }
        },
        computed: {
            config() {
                return this.$store?.state?.config || null;
            }
        },
        async created() {
            this.navigation = [
                {
                    "name": "Admin",
                    "url": "/yazar/admin"
                }
            ]
        }
    }
</script>

<style lang="scss">
#uye_admin_page {
    #logo {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 1px solid #e7e7e7;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
    }
}
</style>
