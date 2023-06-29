<template>
	<div class="admin-header" id="adminHader">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 p-3 shadow" id="adminHeader">	
					<span class="float-left btn h-100 d-flex align-items-center pl-0" v-b-toggle.sidebarAdmin>
						<b-icon-list variant="dark" font-scale="1"></b-icon-list>
					</span>				
					<span class="float-right text-danger" @click="logout">
						<b-icon-box-arrow-in-left variant="danger" font-scale="1"></b-icon-box-arrow-in-left>
						Çıkış
					</span>

					<span class="float-right mx-4 position-relative" v-if="messages" @click="openMessages">
						<span class="admin-messages" v-if="messages.length > 0">
							{{messages.length}}
						</span>
						<b-icon-bell-fill variant="black" font-scale="1"></b-icon-bell-fill>
					</span>

					<b-modal id="modal-messages" hide-footer @hide="readMessages" title="Mesajlar">
						<b-card no-body>
			                <b-tabs card>
			                    <b-tab title="Tümü" active>
			                    	<ul class="col-12">
							    		<li class="row border rounded mb-2" :class="[message.is_read == 0 ? 'border-info':'border-light']" v-for="(message,index) in all_messages" :key="`messages${index}`">
							    			<div class="col-12 pt-1 d-flex align-items-center">
							    				<h5>
							    					<small><strong>{{message.name}}</strong></small>
							    				</h5>
							    				<h6 class="mx-3">
							    					<small>{{message.phone}}</small>
							    				</h6>
							    				<h6>
							    					<small>{{message.email}}</small>
							    				</h6>
							    			</div>
							    			<div class="col-12 py-2">
							    				<small>
							    					{{message.message}}
							    				</small>
							    			</div>
							    			<div class="col-12 pb-2">
							    				<small class="float-right">
							    					{{message.createdAt | dateTimeFormat}}
							    				</small>
							    			</div>
							    		</li>
							    	</ul>
			                    </b-tab>
			                    <b-tab>
			                    	<template #title>
								        <b-spinner type="border" small></b-spinner> Okunmamış
								    </template>
			                    	<ul class="col-12">
							    		<li class="row border  border-info rounded mb-2" v-for="(message,index) in messages" :key="`messages${index}`">
							    			<div class="col-12 pt-1 d-flex align-items-center">
							    				<h5>
							    					<small><strong>{{message.name}}</strong></small>
							    				</h5>
							    				<h6 class="mx-3">
							    					<small>{{message.phone}}</small>
							    				</h6>
							    				<h6>
							    					<small>{{message.email}}</small>
							    				</h6>
							    			</div>
							    			<div class="col-12 py-2">
							    				<small>
							    					{{message.message}}
							    				</small>
							    			</div>
							    			<div class="col-12 pb-2">
							    				<small class="float-right">
							    					{{message.createdAt | dateTimeFormat}}
							    				</small>
							    			</div>
							    		</li>
							    	</ul>
			                    </b-tab>
			                </b-tabs>
			            </b-card>
				    	
				    </b-modal>
				</div>
			</div>
			<div class="row">
				<div class="col-12" id="content">
					<b-sidebar id="sidebarAdmin" bg-variant="white" :visible="$store.state.adminShowLeftMenu" title="" shadow @shown="shownSidebar" @hidden="hiddenSidebar">
						<div class="col-12">
							<div class="row">
								<ul class="col-12 px-4 list-unstyled">
									<li class="row mb-4">
										<div class="col-12 pr-5">
											<NuxtLink to="/admin" class="float-left text-secondary" title="Admin Index" v-html="$store.state.config.logo">
											</NuxtLink>
										</div>
									</li>
									<li class="float-left w-100 mb-3">
										<NuxtLink to="/" class="text-secondary" title="Site">
											<span>
												<b-icon-eye variant="dark" font-scale="0.8" class="mr-1"></b-icon-eye>
												Siteyi Görüntüle
											</span>
										</NuxtLink>
									</li>

									<li class="float-left w-100 mb-3">
										<span v-b-toggle:menu-content class="d-flex align-items-center justify-content-between">
											<span>
												<b-icon-card-list variant="dark" font-scale="0.8" class="mr-1"></b-icon-card-list>
												İçerikler
											</span>
											<b-icon-chevron-down variant="dark" font-scale="0.9"></b-icon-chevron-down>
										</span>
										<b-collapse id="menu-content">
											<ul class="col-12 py-2 list-unstyled bg-light">
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/blogs" class="text-secondary" title="Blog Listeleme Sayfası">
														Makaleler
													</NuxtLink>
												</li>
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/blog-category" class="text-secondary" title="Haber Blog Kategori Sayfası">
														Makale Kategori
													</NuxtLink>
												</li>												
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/contents-category" class="text-secondary" title="İçerik Kategori Sayfası">
														İçerik Kategori
													</NuxtLink>
												</li>
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/contents" class="text-secondary" title="İçerik Düzenleme Sayfası">
														İçerikler
													</NuxtLink>
												</li>
											</ul>
										</b-collapse>
									</li>
									<!-- <li class="float-left w-100 mb-3">
										<span v-b-toggle:menu-product class="d-flex align-items-center justify-content-between">
											<span>
												<b-icon-tags variant="dark" font-scale="0.8" class="mr-1"></b-icon-tags>
												Ürünler
											</span>
											<b-icon-chevron-down variant="dark" font-scale="0.9"></b-icon-chevron-down>
										</span>
										<b-collapse id="menu-product">
											<ul class="col-12 py-2 list-unstyled bg-light">
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/product" class="text-secondary" title="Admin Ürünler Sayfası">
														<span>
															<b-icon-tags variant="dark" font-scale="0.8" class="mr-1"></b-icon-tags>
															Ürünler
														</span>
													</NuxtLink>
												</li>
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/category" class="text-secondary" title="Admin Kategoriler Sayfası">
														<span>
															<b-icon-bounding-box variant="dark" font-scale="0.8" class="mr-1"></b-icon-bounding-box>
															Kategoriler
														</span>
													</NuxtLink>
												</li>
											</ul>
										</b-collapse>
									</li> -->
									
									
									<li class="float-left w-100 mb-3">
										<NuxtLink to="/admin/file-manager" class="text-secondary" title="Dosya Yöneticisi">
											<span>
												<b-icon-paperclip variant="dark" font-scale="0.8" class="mr-1"></b-icon-paperclip>
												Dosya Yöneticisi
											</span>
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-3">
										<NuxtLink to="/admin/add-image" class="text-secondary" title="Resim Yükleyici">
											<span>
												<b-icon-paperclip variant="dark" font-scale="0.8" class="mr-1"></b-icon-paperclip>
												Resim Yükleyici
											</span>
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-3">
										<NuxtLink to="/admin/users" class="text-secondary" title="Başvuru Görüntüleme Sayfası">
											<span>
												<b-icon-lock variant="dark" font-scale="0.8" class="mr-1"></b-icon-lock>
												Panel Kullanıcı İşlemleri
											</span>
										</NuxtLink>
									</li>

									<li class="float-left w-100 mb-3">
										<span v-b-toggle:menu-sliders class="d-flex align-items-center justify-content-between">
											<span>
												<b-icon-card-list variant="dark" font-scale="0.8" class="mr-1"></b-icon-card-list>
												Sliderlar
											</span>
											<b-icon-chevron-down variant="dark" font-scale="0.9"></b-icon-chevron-down>
										</span>
										<b-collapse id="menu-sliders">
											<ul class="col-12 py-2 list-unstyled bg-light">
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/sliders/slider-page" class="text-secondary" title="İnteraktif Vitrin Sayfası">
														<span>
															<b-icon-arrow-down-left-circle variant="dark" font-scale="0.8" class="mr-1"></b-icon-arrow-down-left-circle>
															İnteraktif Vitrin
														</span>
													</NuxtLink>
												</li>
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/sliders/surdurulebilir-yasam" class="text-secondary" title="Sürdürülebilir Yaşam Slider">
														<span>
															<b-icon-arrow-down-left-circle variant="dark" font-scale="0.8" class="mr-1"></b-icon-arrow-down-left-circle>
															Sürdürülebilir Yaşam
														</span>
													</NuxtLink>
												</li>
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/sliders/herkes-onu-konusuyor" class="text-secondary" title="Herkes Onu Konuşuyor Slider">
														<span>
															<b-icon-arrow-down-left-circle variant="dark" font-scale="0.8" class="mr-1"></b-icon-arrow-down-left-circle>
															Herkes Onu Konuşuyor
														</span>
													</NuxtLink>
												</li>
												<li class="row px-2 mt-2">
													<NuxtLink to="/admin/sliders/editorlerimizin-sectikleri" class="text-secondary" title="Editörlerimizin seçtikleri Slider">
														<span>
															<b-icon-arrow-down-left-circle variant="dark" font-scale="0.8" class="mr-1"></b-icon-arrow-down-left-circle>
															Editörlerimizin seçtikleri
														</span>
													</NuxtLink>
												</li>
											</ul>
										</b-collapse>
									</li>

									<li class="float-left w-100 mb-3">
										<NuxtLink to="/admin/header-menu" class="text-secondary" title="Üst Menü Sayfası">
											<span>
												<b-icon-diagram3-fill variant="dark" font-scale="0.8" class="mr-1"></b-icon-diagram3-fill>
												Üst Menü
											</span>
										</NuxtLink>
									</li>
									<li class="float-left w-100 mb-3">
										<NuxtLink to="/admin/settings" class="text-secondary" title="Site Ayarlar Sayfası">
											<span>
												<b-icon-gear variant="dark" font-scale="0.8" class="mr-1"></b-icon-gear>
												Ayarlar
											</span>
										</NuxtLink>
									</li>
								</ul>
							</div>
						</div>						
					</b-sidebar>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:'AdminHeader',
	    components:{
	    },
	    data() {
	        return {
	        	all_messages:undefined,
	        	messages:undefined
	        }
	    },
	    props:{
	         
	    },
	    methods:{
			shownSidebar(){
				this.$cookiz.set('a_lm',true)
				this.$store.commit('adminShowLeftMenu' , true);
			},
			hiddenSidebar(){
				this.$cookiz.set('a_lm',false)
				this.$store.commit('adminShowLeftMenu' , false);
			},
	    	async logout(){
	    		var _this = this;
	    		_this.$cookiz.removeAll();
	    		_this.$router.push("/admin/login");
	    	},
	    	async getMessages(){
	    		var _this = this;
	    		var token = _this.$cookiz.get("admintoken");
	    		_this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contact_application/" , "token": token})
	            .then(response => {
	                if(response)
	                {
	                	_this.messages = response;	                	
	                }	               
	            });

	            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contact_application/getAllMessages" , "token": token})
	            .then(response => {
	                if(response)
	                {
	                	_this.all_messages = response;	                	
	                }	               
	            });
	    	},
	    	readMessages(){
	    		try
	      		{
	      			var _this = this;
	      			var token = _this.$cookiz.get("admintoken");
	      			if(_this.messages.length > 0)
	      			{
	      				_this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contact_application/isRead" , "token": token})
			            .then(response => {
			                if(response.success == "success")
			                {
			                	_this.getMessages();
			                	_this.$bvToast.toast('Mesajlar okundu.', {
					        		title: `Başarılı..`,
					        		variant: 'success',
					        		autoHideDelay: 500,
					        		solid: true
					        	});
			                }	               
			            });
	      			}	      			
	      		}
	      		catch(err)
	      		{
	      			console.log(err);
	      		}
	    	},
	    	openMessages(){
	    		this.$bvModal.show("modal-messages");
	    	}
	    },
	    async created(){
	    	this.getMessages(); 		
		}
	}
</script>

<style>
	.b-sidebar {
	    width: 260px;
	}
	
	#adminHeader span
	{
		cursor: pointer;
	}

	.admin-messages {
	    width: 15px;
	    height: 15px;
	    background: #ffffff;
	    border: 1px solid #0074b5;
	    color: #ffffff;
	    position: absolute;
	    top: -4px;
	    right: -7px;
	    font-size: 11px;
	    line-height: 12px;
	    text-align: center;
	    border-radius: 50%;
	    animation-name: color;
	    animation-duration: 2s;
	    animation-iteration-count: infinite;
	}

	@keyframes color {
	    0%{
	        background: #0074b5;
	        color: #ffffff;
	    }
	    50%{
	        background: #ffffff;
	        color: #0074b5;
	    }
	    100%{
	        background: #0074b5;
	        color: #ffffff;
	    }
	}
</style>
