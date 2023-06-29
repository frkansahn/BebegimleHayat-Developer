<template>
	<div class="col-12 blog-showcase" id="blogShowcase" v-if="loaded && blogs">
		<div class="row" v-if="blogs.length > 0">
			<div class="col-12 mb-4 mt-5 px-0 block-title">
				<span class="float-left w-100">
					En çok okunanlar
				</span>
			</div>
			<div class="col-12">
				<div class="row">
					<BlogCart v-for="(b,index) in blogs" v-bind:key="`MostReadCart${index}`" :blog="b" :index="index"/>
				</div>
			</div>
			<div class="col-12 mt-3 mb-5 d-flex align-items-center justify-content-center">
				<div class="show-more" @click="showMore">
					+ DAHA FAZLA İÇERİK GÖSTER
                </div>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'ReadMoreBlogs',
	    data() {
	        return {
	        	blogs:[],
	        	loaded:false,
				paging: {
                    currentPage: 1,
                    total: undefined,
                    length: 6
                }
	        }
	    },
	    props:{
	         
	    },
	    methods:{
			showMore() {
				if((this.paging.currentPage*this.paging.length) < this.paging.total) {
					this.paging.currentPage += 1;
					this.getBlogs();
				}
			},
			getBlogs() {
				const _this = this;
				let reqData = {
					"paging": {
						"start": (_this.paging.currentPage - 1) * _this.paging.length,
						"end": _this.paging.length
					}
				}
				_this.$repositories.blog.getMostRead(reqData)
				.then(res => {
					_this.blogs.push(...res.data.response.blogs);
					_this.paging.total = res.data.response.total;
					_this.loaded = true;
				});	
			}
	    },
	    created(){
	    	this.getBlogs();		
		}
	}
</script>

<style lang="scss">

	.show-more {
	    padding: .8em 2em;
	    background: #000;
	    border: 1px solid #000;
	    color: #ffffff;
	    font-weight: normal;
	    font-size: 18px;
	    border-radius: 2px;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
        cursor: pointer;
		
		&:hover {
			background: #ffffff;
			color: #000;
			text-decoration: none;
			-webkit-transition: all .5s ease;
			-moz-transition: all .5s ease;
			-o-transition: all .5s ease;
			-ms-transition: all .5s ease;
			transition: all .5s ease;
		}

		@media screen and (max-width:768px) {
			font-size: 16px;
		}
	}	
</style>