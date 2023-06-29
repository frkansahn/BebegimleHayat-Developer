<template>
	<div class="col-12 blog-showcase" id="blogShowcase" v-if="loaded && blogs">
		<div class="row" v-if="blogs.length > 0">
			<div class="col-12 mb-3 mt-5 text-center block-title">
				<span class="float-left w-100">
					{{$t('blog')}}
				</span>
				<small class="float-left w-100">
					{{$t('blogDescription')}}
				</small>
			</div>
			<div class="col-12 px-md-2">
				<div class="row">
					<BlogCart v-for="(b,index) in blogs" v-bind:key="`NewsCart${index}`" :blog="b" :index="index"/>
				</div>
			</div>
			<div class="col-12 mt-3 mb-5 d-flex align-items-center justify-content-center">
				<NuxtLink to="/blogs" class="show-all">
					{{$t('showAll')}}
				</NuxtLink>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'BlogShowcase',
	    data() {
	        return {
	        	blogs:[],
	        	loaded:false
	        }
	    },
	    props:{
	         
	    },
	    methods:{

	    },
	    created(){
	    	var _this = this;
			_this.$repositories.blog.get(12)
			.then(res => {
				_this.blogs = res.data.response;
				_this.loaded = true;
			});			
		}
	}
</script>

<style>
	a.show-all {
	    padding: .5em 2em;
	    background: var(--main-background-color);
	    border: 1px solid var(--main-background-color);
	    color: #ffffff;
	    font-weight: 500;
	    font-size: 16px;
	    border-radius: 6px;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}

	a.show-all:hover {
	    border: 1px solid var(--main-background-color);
	    background: #ffffff;
	    color: var(--main-background-color);
	    text-decoration: none;
	    -webkit-transition: all .5s ease;
	    -moz-transition: all .5s ease;
	    -o-transition: all .5s ease;
	    -ms-transition: all .5s ease;
	    transition: all .5s ease;
	}
</style>
