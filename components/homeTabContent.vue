<template>
	<div class="col-12 px-lg-2 tab-content" id="tabContent">
		<div class="row my-4">
			<div class="col-12" v-if="contents">
				<div class="row">
				  	<div class="col-12 col-md-10 mx-auto">
				  		<div class="row shadow">
				  			<div class="col-12 col-md-4 px-lg-0">
				  				<ul class="row list-unstyled">
				  					<li class="col-12" v-for="(C,index) in contents" :key="`contentKey${index}`">
				  						<button class="float-left w-100 btn btn-primary rounded-0 py-4 px-4 d-flex align-items-center" @click="selectedTabIndex = index;" :class="[selectedTabIndex == index ? 'active':'']">
					                        <img :src="C.icon" :alt="C.title" v-if="C.icon" class="mr-2" style="max-height: 22px;">
					                        <h5 class="font-weight-normal">{{C.title}}</h5>			                        
					                    </button>
				  					</li>
				  				</ul>
				  			</div>
				  			<div class="col-12 col-md-8 border-top border-right border-bottom border-light">
				  				<p class="px-4 py-3" v-for="(C,index) in contents" :key="`contentIndex${index}`" v-if="index == selectedTabIndex"  v-html="C.content">
				  					
				  				</p>
				  			</div>
				  		</div>
				  	</div>
				</div>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'TabContent',
	    data() {
	        return {
	        	selectedTabIndex:0
	        }
	    },
	    props:{
	         
	    },
	    methods:{

	    },
	    created(){
		},
		computed:{
			contents: function() {
				try{
					function compare(a, b) {
						if (a.sort < b.sort)
							return -1;
						if (a.sort > b.sort)
							return 1;
						return 0;
					}
					if(this.$store.state.config)
					{
						return JSON.parse(this.$store.state.config.additional_field_4).sort(compare);
					}
					else
						return null;
				}
				catch(err){
					return null
				}
				
			},
		}
	}
</script>

<style>
	.notices-subject {
	    font-size: 15px;
	    color: #000000;
	    font-weight: 400;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    min-height: 45px;
	}
</style>
