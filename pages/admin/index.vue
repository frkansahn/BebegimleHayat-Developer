<template>
	<div class="admin-index" id="adminIndex">
		<AdminHeader />
		<div class="admin-content-wrapper">
			<div class="row">
				<div class="col-12 mb-4">
					<h5>
						Dashboard
					</h5>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'AdminIndex',
		middleware: 'adminAuthenticated',
	    layout:'admin',
	    data() {
	        return {
	        	pageLoading:false,
	        }
	    },
	    props:{
	         
	    },
	    methods:{
	    },
	    mounted(){ 	
		},
		beforeMount(){
		},
		beforeUpdate(){
		},
		updated(){
		},
		computed:{
		}
	}
</script>

<style>
	.switch {
	    width: 35px;
	    height: 20px;
	    background: #ffffff;
	    border: 1px solid #cdcdcd;
	    float: left;
	    border-radius: 30px;
	    position: relative;
	    cursor: pointer;
	}

	.switch:after {
	    content: '';
	    width: 16px;
	    height: 16px;
	    background: #cdcdcd;
	    border-radius: 18px;
	    position: absolute;
	    left: 1px;
	    top: 1px;
	    transition: all .5s ease;
	}

	.switch.active:after {
	    background: #ffffff;
	    left: calc(100% - 17px);
	    transition: all .5s ease;
	}

	.switch.active {
	    border-color: #0ec302;
	    background: #0ec302;
	}
</style>
