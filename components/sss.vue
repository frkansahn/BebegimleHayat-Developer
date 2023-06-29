<template>
	<div class="col-12 px-2 sss" id="sss" v-if="sss">
		<div class="row mb-4">
			<div class="col-12 mb-4 mt-5">
				<h2>
					Sık Sorulan Sorular
				</h2>
			</div>
			<div class="col-12">
				<div class="row">
					<ul class="col-12">
						<li class="row mb-2" v-for="(S,index) in sss" :key="`sssKey${index}`"> 
                            <div class="col-12" v-b-toggle="`sss_${index}`">
			                    <h5 class="border-bottom border-secondary py-3 d-flex align-items-center justify-content-between">
			                        <small class="text-secondary">{{S.ask}}</small>
			                        <b-icon-plus variant="secondary" font-scale="1.4"></b-icon-plus>
			                    </h5>
			                </div>                                       
                            <b-collapse :id="`sss_${index}`" class="col-12">
                                <div class="row">
                                    <div class="col-12 py-4 mt-2">
                                    	<p v-html="S.question"></p>
                                    </div>
                                </div>
                            </b-collapse>
						</li>
					</ul>
				</div>
			</div>
		</div>		
	</div>
</template>
<script>
	export default{
		name:'SSS',
	    data() {
	        return {
	        }
	    },
	    props:{
	         
	    },
	    methods:{

	    },
	    created(){
		},
		computed:{
			sss: function() {
				try
				{
					function compare(a, b) {
						if (a.sort < b.sort)
							return -1;
						if (a.sort > b.sort)
							return 1;
						return 0;
					}
					if(this.$store.state.config)
					{
						return JSON.parse(this.$store.state.config.additional_field_1).sort(compare);
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
