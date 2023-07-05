<template>
	<div class="navigation my-2" id="navigation">
		<div class="row" v-if="nav">
			<div class="col-12">
				<div class="row" id="nav-content">
					<ul class="col-12 d-flex align-items-center justify-content-md-center" itemscope itemtype="http://schema.org/BreadcrumbList">
						<li class="float-left home-navigation" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
							<NuxtLink itemprop="item" to="/">
								<span itemprop="name">
									<b-icon-house-door-fill variant="dark" font-scale="1.2"></b-icon-house-door-fill>
									Ana Sayfa
								</span>
							</NuxtLink>
							<meta itemprop="position" content="1">
						</li>
						<li class="float-left pl-1" v-for="(N,index) in nav" :key="`navigation${index}`" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
							/ 
							<NuxtLink :to="N.url" :title="N.name" itemprop="item">
								<span itemprop="name">
									{{N.name}}
								</span>
							</NuxtLink>
							<meta itemprop="position" :content="index+2">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'Navigation',
	    data() {
	        return {
				isMobile: false
	        }
	    },
	    props:["nav"],
		methods:{
			eventWindowResize(){
	    		this.isMobile = window.screen.width > 768 ? false : true;
	    	}
		},
		async mounted(){
			var _this = this;
			_this.isMobile = window.screen.width > 768 ? false : true;
			window.addEventListener("resize", _this.eventWindowResize);
		}
	}
</script>

<style>

	#navigation {
	    display: flex;
	    align-items: center;
	}
	#navigation ul li {
	    list-style-type: none;
	    font-size: 12px;
	}

	#navigation ul li a {
	    color: #000;
	    font-size: 12px;
	}

	@media screen and (max-width: 768px)
   	{
		#navigation {
			justify-content: flex-start;
			overflow-x: auto;
		}

		#navigation::-webkit-scrollbar{
			display: none;
		}

		#nav-content {
			position: static;
			white-space: nowrap;
		}

		#navigation ul li a , #navigation ul li {
			color: #000000;
		}
   	}

   	@media screen and (max-width: 540px)
   	{
      	#navigation ul li , #navigation ul li a {
      		font-size: 12px;
		}

		#blog_category_page #navigation ul li ,#blog_category_page #navigation ul li a {
      		font-size: 11px;
		}
   	}
</style>
