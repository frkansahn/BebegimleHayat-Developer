<template>
	<div class="header" id="header">
		<div class="row" :class="[stickyActive == true ? 'sticky' : '']" id="headerWrapper">
			<div class="col-12 headerMiddle">
				<div class="container">
					<div class="row pl-md-3">
						<div class="col-12 position-static">
							<div class="row align-items-center mb-0 py-0">								
								<b-sidebar v-if="isMobileMenuSidebar" id="mobileMenu" title="Menü" backdrop-variant="dark" bg-variant="white" backdrop
									shadow>
									<ul class="col-12 mt-4">
										<li class="row" v-for="(M, index) in menus" :key="`headerMobileMenu${index}`">								
											<span class="col-12 my-2 text-secondary d-flex align-items-center justify-content-between" :aria-controls="`mobile-accordion-${index}`" v-b-toggle="`mobile-accordion-${index}`" v-if="M.children && M.children.length > 0">
												{{M.category_name}}
												<b-icon icon="chevron-down" varinat="secondary"></b-icon>
											</span>
											<NuxtLink :to="`/${M.url}`" class="col-12 my-2 text-secondary" v-else>
												{{M.category_name}}
											</NuxtLink>
											<b-collapse :id="`mobile-accordion-${index}`" class="col-12 my-2" accordion="Menü" role="tabpanel" v-if="M.children && M.children.length > 0">
												<div class="row">
													<div class="col-12 mobile-child-menu" v-if="M.children && M.children.length > 0">
														<div class="row">
															<ul class="col-12 px-4 py-3">
																<li class="row mb-2" v-for="(ChildMenu,index2) in M.children" :key="`headerMobileChildMenu${index2}`">
																	<NuxtLink class="d-flex align-items-center"
																		:to="`/${ChildMenu.url}`"
																		:title="ChildMenu.category_name">
																		<span class="col-2 px-0 menu-image mr-2">
																			<!-- <ElementImage :src="`/Data/image/extra_small/${ChildMenu.image}`" width="100" height="100" :alt="ChildMenu.category_name"/> -->
																			<picture >
																				<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/extra_small/${ChildMenu.image}.webp`" />
																				<img :src="`https://api.bebegimlehayat.com/Data/image/extra_small/${ChildMenu.image}.jpeg`" :alt="ChildMenu.category_name" :width="100" :height="100"  />
																			</picture>
																		</span>
																		<small class="">
																			{{ ChildMenu.category_name }}
																		</small>
																	</NuxtLink>
																</li>
															</ul>
														</div>
													</div>
												</div>									
											</b-collapse>								
										</li>							
									</ul>
								</b-sidebar>
								<b-sidebar id="searchMenu" title="Arama" backdrop-variant="dark" bg-variant="white" no-header backdrop
									shadow>
									<div class="col-12 col-md-10 col-lg-8 mx-auto">
										<div class="row">
											<div class="col-12 py-4 py-lg-5 d-flex justify-content-end">
												<span class="close-serach-button" v-b-toggle.searchMenu>
													&times;
												</span>
											</div>
										</div>
										<span class="d-flex align-items-center justify-content-between search-page w-100 pt-4">
											<b-form-input id="searchInput" size="lg" v-model="searchInput" type="text" @keydown="searchKeyDown" @keyup="searchKeyUp" placeholder="Ne aramıştın" class="border-secondary px-0 rounded-0 border-left-0 border-right-0 border-top-0"></b-form-input>
											<b-icon-search class="search-button" role="button" variant="dark" font-scale="1"></b-icon-search>
											<button class="btn-search btn btn-dark px-4 py-2" @click="search">ARA</button>
										</span>
										<div class="col-12 mb-4" id="searchContent" v-if="searchResult && searchInput.length > 0">
											<div class="row">
												<ul class="col-12">
													<li class="row mb-4 pb-2 align-items-center" role="button" v-for="(R,index) in searchResult" @click="routeBlog(R.url)">
														<div class="col-5 col-lg-3 px-0">
															<span>
																<picture data-not-lazy>
																	<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/small/${R.image}.webp`" />
																	<img :src="`https://api.bebegimlehayat.com/Data/image/small/${R.image}.jpeg`" :alt="R.title" :width="308" :height="268"  />
																</picture>
															</span>
														</div>
														<div class="col-7 col-lg-9">
															<h6>
																{{ R.subject }}
															</h6>
															<p>
																{{ R.description }}
															</p>
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</b-sidebar>
								<div class="col-6 col-sm-5 col-md-6 col-lg-3 pl-0">
									<NuxtLink to="/" id="logo" v-html="config && config.logo">
									</NuxtLink>
								</div>
								<div class="col-8 position-static d-none d-lg-block" id="headerMenu">
									<div class="row">
										<ul class="col-12 d-flex align-items-center justify-content-end text-center m-0 position-static">
											<li class="text-left list-unstyled" v-for="(M, index) in menus"
												:key="`headerMenu${index}`"
												:class="[M.children && M.children.length > 0 ? 'parentChild' : '']"
												@mouseover="headerIndex = index" @mouseleave="headerIndex = null">
												<NuxtLink :to="`/${M.url}`" class="float-left">
													{{ M.category_name }}
												</NuxtLink>
												<div class="child-menu" v-if="index == headerIndex &&  M.children && M.children.length > 0">
													<div class="container">
														<ul class="row pl-0">
															<li class="col-12 col-md-4 col-lg-3"
																v-for="(ChildMenu, index) in M.children"
																:key="`headerChildMenu${index}`">
																<NuxtLink class="d-flex align-items-center"
																	:to="`/${ChildMenu.url}`"
																	:title="ChildMenu.category_name">
																	<span class="menu-image">
																		<!-- <ElementImage :src="`/Data/image/small/${ChildMenu.image}`" width="100" height="100" :alt="ChildMenu.category_name"/> -->
																		<picture >
																			<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/small/${ChildMenu.image}.webp`" />
																			<img :src="`https://api.bebegimlehayat.com/Data/image/small/${ChildMenu.image}.jpeg`" :alt="ChildMenu.category_name" :width="100" :height="100"  />
																		</picture>
																	</span>
																	<span class="">
																		{{ ChildMenu.category_name }}
																	</span>
																</NuxtLink>
															</li>
														</ul>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div class="col-4 col-lg-1 px-0 d-flex align-items-center justify-content-end">
									<div class="d-flex align-items-center justify-content-end search-menu" v-b-toggle.searchMenu>
										<b-icon-search variant="secondary" font-scale="2.3"></b-icon-search>
									</div>
									<div class="d-flex align-items-center justify-content-end justify-content-lg-center mx-lg-3 ml-3" id="headerAccount" v-if="customer && customer.userLoggedIn">
										<span class="title d-flex align-items-center justify-content-center flex-column">
											<b-icon-person variant="secondary" font-scale="1.4"></b-icon-person>
											Hesabım
										</span>	
										<ul>
											<li class="float-left w-100">
												<NuxtLink to="/account/personal-information" title="Üye kişisel bilgiler sayfası">
													Kişisel Bilgiler
												</NuxtLink>
											</li>
											<li class="float-left w-100">
												<NuxtLink to="/account/change-password" title="Üye şifre değiştirme sayfası">
													Şifre Değiştir
												</NuxtLink>
											</li>
											<li class="float-left w-100 logout">
												<span @click="logout">
													<b-icon-box-arrow-in-left variant="secondary" font-scale="1"></b-icon-box-arrow-in-left>
													Çıkış
												</span>
											</li>
										</ul>
									</div>
									<div class="d-flex align-items-center justify-content-end justify-content-lg-center mx-lg-3 ml-3" id="headerAccount" v-if="!(customer && customer.userLoggedIn)">
										<span class="title d-flex align-items-center justify-content-center flex-column">
											<b-icon-person variant="secondary" font-scale="3"></b-icon-person>
										</span>	
										<ul>
											<li class="float-left w-100">
												<NuxtLink to="/uye-giris" title="Giriş sayfası">
													Giriş Yap
												</NuxtLink>
											</li>
											<li class="float-left w-100">
												<NuxtLink to="/uye-kayit" title="Kayıt sayfası">
													Üye Ol
												</NuxtLink>
											</li>
										</ul>
									</div>
								</div>
								<div class="col-2 px-0 d-flex align-items-center justify-content-end mobile-menu d-lg-none" @click="isMobileMenuSidebar = true" v-b-toggle.mobileMenu>
									<b-icon-list variant="secondary" font-scale="3.8"></b-icon-list>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import { IconsPlugin,BSidebar } from 'bootstrap-vue'
Vue.use(IconsPlugin);
Vue.component('b-sidebar', BSidebar)

export default {
	name: 'Header',
	data() {
		return {
			customerAccount: false,
			isMobile: false,
			stickyActive: false,
			backTopActive: false,
			loading: true,
			siteLoadedPopup: false,
			headerIndex:null,
			isMobileMenuSidebar:false,
			searchInput:"",
			searchResult:undefined,
			searchInterval:undefined,
			keyHistory:undefined,
			searchPaging : {
				start:0,
				end:20
			}
		}
	},
	props:{
		menus: {
			type:Array,
			default:[]
		}
	},
	computed: {
		config() {
			return this.$store?.state?.config || null;
		},
		customer() {
			return this.$store?.state?.customer || null;
		},
		CART() {
			return this.$store.state.customer.cartProductDetails
		}
	},
	methods: {
		routeBlog(url) {
			this.searchInput = '';
			this.$router.push(`/${url}`)
		},
		closeSearch() {
			this.searchInput = '';
		},
		searchKeyDown(){
			var _this = this;
			clearInterval(_this.searchInterval);
		},
		searchKeyUp(){
			var _this = this;
			_this.searchInterval = setInterval(() => {
				if(_this.searchInput != _this.keyHistory)
				{
					_this.search();
					_this.keyHistory = _this.searchInput;
				}
			} , 1000);
		},
		search(){
			var _this = this;
			if(_this.$checkIsNullOrEmpty(_this.searchInput)) {
				_this.$repositories.search.getSearch(_this.searchInput , _this.searchPaging.start, _this.searchPaging.end)
				.then(res => {
					if(res) {
						_this.searchResult = res.data.response;
					}
				});
			}
			else {
				_this.searchResult = undefined;
			}
		},
		async logout() {
			var _this = this;
			_this.$cookiz.removeAll();
			_this.$bvToast.toast('Çıkış yapıldı.', {
				title: `Başarılı..`,
				variant: 'success',
				autoHideDelay: 500,
				solid: true
			});
			_this.$store.commit("customer/token", undefined);
			_this.$store.commit("customer/user", undefined);
			_this.$store.commit("customer/userLoggedIn", undefined);

			_this.$router.push('/');
		},
		eventWindowResize() {
			this.isMobile = window.screen.width > 768 ? false : true;
		},
		closeSiteLoaded() {
			this.siteLoadedPopup = false;
			this.$cookiz.set('site_loaded_popup', true, {
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});
		},
		getBlogCategory() {
			return new Promise(async (resolve, reject) => {
				const _this = this;
				_this.$repositories.blog_category.getBlogCategory()
					.then(res => {
						if (res) {
							_this.menus = res.data.response;
							resolve(true)
						}
					})
					.catch(err => {
						resolve(false)
					})
			})
		}
	},
	async mounted() {
		var _this = this;

		_this.isMobile = window.screen.width > 768 ? false : true;
		window.addEventListener("resize", _this.eventWindowResize);

		window.document.onscroll = () => {
			if (window.scrollY > 500)
				_this.backTopActive = true;
			else
				_this.backTopActive = false;
		}

		setTimeout(() => {
			_this.siteLoadedPopup = true;
		}, 5000);
	},
	destroyed() {
		window.removeEventListener("resize", this.eventWindowResize);
	},
	updated() {
		this.loading = false;
	}
}
</script>

<style>	
	#searchMenu {
		width: 100%;
		padding:2em;
	}

	#headerCart .mini-cart {
		display: none;
		position: absolute;
		top: 100%;
		z-index: 99;
		right: 0;
		width: 350px;
		padding: 2em 0;
	}

	#headerCart:hover .mini-cart {
		display: block;
	}

	#headerCart .mini-cart-content:before {
		content: '';
		border-color: transparent transparent #fff transparent;
		border-style: solid;
		border-width: 0 10px 11px;
		width: 0;
		height: 0;
		right: 9px;
		position: absolute;
		top: -9px;
	}

	#headerCart .mini-cart .mini-cart-content {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		padding: 1em 2.5em;
		box-shadow: 0px 1px 21px -7px #000;
		border-top: 1px solid #ececec;
		position: relative;
	}

	#headerMenu ul::-webkit-scrollbar {
		display: none;
	}

	#headerWrapper {
		background: #ffffff;
	}

	#headerContact a {
		color: #6c757d !important;
		font-weight: 400;
	}

	.headerTop {
		padding: 0.4em 0;
		border-bottom: 1px solid #cdcdcd;
	}

	.search-page {
		position: relative;
		font-size: 14px;
		color: #7c7c7c;
	}

	.search-button {
		position: absolute;
		left: -81px;
		top: 30px;
		font-size: 59px;
	}

	.btn-search.btn {
		position: absolute;
		right: 0;
		bottom: 7px;
		padding: 10px 50px !important;
	}

	.close-serach-button {
		position: fixed;
		top: 0;
		right: 50px;
		font-size: 100px;
		font-weight: 100;
		font-family: auto;
		line-height: 113px;
	}

	#searchContent h6 {
		font-size: 16px;
		color: #0095DB;
		margin-bottom: 10px;
		font-weight: 600;
		text-transform: uppercase;
	}

	#searchContent p {
		font-size: 16px;
		margin-bottom: 10px;
		display: -webkit-box;
		-webkit-line-clamp: 2; /*Kaç Stırda sınırlamak istiyorsanız */
		-webkit-box-orient: vertical;
		overflow:hidden;
	}

	#headerWrapper.sticky {
		padding-top: 0em !important;
		padding-bottom: 0em !important;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	.cart-total-product-count {
		position: absolute;
		top: -6px;
		right: -1px;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		font-size: 10px;
		line-height: 15px;
		text-align: center;
		color: var(--main-text-color);
		background-color: var(--main-background-color);
		border: 1px solid var(--main-background-color);
	}

	.back-to-top {
		position: fixed;
		right: 120px;
		bottom: 20px;
		z-index: 9999;
		width: 40px;
		height: 40px;
		background: #000000;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		-webkit-transition: all .3s ease;
		-moz-transition: all .3s ease;
		-o-transition: all .3s ease;
		-ms-transition: all .3s ease;
		transition: all .3s ease;
	}

	.back-to-top:hover {
		box-shadow: 0px 0px 7px 0px;
		-webkit-transition: all .3s ease;
		-moz-transition: all .3s ease;
		-o-transition: all .3s ease;
		-ms-transition: all .3s ease;
		transition: all .3s ease;
	}

	#logo:hover {
		text-decoration: none;
	}

	#logo p {
		margin: 0;
		display: flex;
		align-items: center;
    	height: 122px;
    	float: left;
	}

	#headerWrapper.sticky #logo img {
		max-height: 54px;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	#logo img {
    	max-height: 122px;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
		width: auto;
	}

	#headerMenu a {
		font-size: 20px;
		font-weight: 500;
		padding: 2.2em 1em;
		position: relative;
		-webkit-transition: all .1s ease;
		-moz-transition: all .1s ease;
		-o-transition: all .1s ease;
		-ms-transition: all .1s ease;
		transition: all .1s ease;
	}

	#headerMenu li.parentChild:hover>a {
		border-radius: .2em .2em 0 0;
		background: var(--main-text-color);
		color: var(--main-background-color) !important;
		text-decoration: none;
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	#headerMenu li.parentChild .child-menu {
		z-index: 9;
		position: absolute;
		left: 0;
		top: calc(100% - 1px);
		width: 100%;
		background-color: #fff;
		padding: 1em 1.5em;
		box-shadow: 0 15px 15px rgba(0, 0, 0, .1);
	}

	#headerMenu li.parentChild .child-menu ul li {
		list-style-type: none;
	}

	#headerMenu li.parentChild .child-menu ul li a {
		font-size: 16px;
		color: #000;
		transition: all .5s ease;
		padding: 1em 0;
	}

	#headerMenu li.parentChild .child-menu ul li a:hover {
		text-decoration: none;
		transition: all .5s ease;
	}

	#headerMenu li.parentChild .child-menu .menu-image {
		margin-right: 15px;
		overflow: hidden;
		width: calc(111 / 298 * 105%);
		flex-shrink: 0;
		border-radius: 0;
		position: relative;
		padding-bottom: 80px;
	}

	#headerMenu li.parentChild .child-menu .menu-image img {
		transition: all .5s ease;
		position: absolute;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	#headerMenu li.parentChild .child-menu .menu-image:hover img{
		transform: scale(1.2);
		transition: all .5s ease;
	}

	#headerAccount ul {
		position: absolute;
		top: calc(100% + 15px);
		background: #efefef;
		padding: 1.5em;
		max-width: 170px;
		min-width: 140px;
		border-radius: 5px;
		z-index: 99;
		-webkit-transform: translateY(100px);
		-moz-transform: translateY(100px);
		-ms-transform: translateY(100px);
		-o-transform: translateY(100px);
		transform: translateY(100px);
		-webkit-transition: all .5s ease-in-out;
		-moz-transition: all .5s ease-in-out;
		-o-transition: all .5s ease-in-out;
		-ms-transition: all .5s ease-in-out;
		transition: all .5s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	#headerAccount:hover ul {
		-webkit-transform: translateY(0px);
		-moz-transform: translateY(0px);
		-ms-transform: translateY(0px);
		-o-transform: translateY(0px);
		transform: translateY(0px);
		-webkit-transition: all .5s ease-in-out;
		-moz-transition: all .5s ease-in-out;
		-o-transition: all .5s ease-in-out;
		-ms-transition: all .5s ease-in-out;
		transition: all .5s ease-in-out;
		opacity: 1;
		visibility: visible;
	}

	#headerAccount:hover ul:before {
		content: "";
		border-color: transparent transparent #efefef transparent;
		border-style: solid;
		border-width: 0px 10px 15px 10px;
		width: 0px;
		height: 0px;
		position: absolute;
		bottom: 100%;
		left: calc(50% - 10px);
	}

	#headerAccount:hover ul:after {
		content: "";
		background: transparent;
		width: 100%;
		height: 25px;
		position: absolute;
		bottom: 100%;
		left: 0;
		right: 0;
	}

	#headerAccount ul li a {
		color: #6c757d !important;
		font-weight: 500;
		line-height: 2em;
		font-size: 14px;
		margin-bottom: 4px;
		float: left;
	}

	#headerAccount ul li a:hover {
		text-decoration: underline;
	}

	#headerRight .title {
		color: #6c757d !important;
		font-weight: 400;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	#headerAccount ul li {
		list-style-type: none;
	}

	#headerAccount ul li.logout span {
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		#searchMenu {
			padding: 1em;
		}

		#searchContent h6 {
			font-size: 14px;
			margin-bottom: 5px;
		}

		#searchContent p {
			font-size: 14px;
		}

		.btn-search.btn {
			padding: 7px 20px !important;
			bottom: 0;
		}

		#searchMenu {
			padding: 1em;
		}

		.btn-search.btn {
			padding: 4px 20px !important;
			bottom: -2px;
			font-size: 14px;
			border-radius: 0;
		}

		.search-button {
			left: 0;
			font-size: 22px;
		}

		#searchInput {
			padding-left: 31px !important;
		}

		#searchInput::placeholder {
			font-size: 15px;
		}

		.close-serach-button {
			font-size: 50px;
			right: 20px;
			line-height: 75px;
		}

		#headerMenu ul {
			overflow: auto;
		}

		#headerWrapper.sticky {
			padding: 0 !important;
		}

		.search-page {
			height: 55px;
		}

		#headerWrapper.sticky #search {
			display: none !important;
		}

		#headerAccount ul {
			right: 0;
		}

		.mobile-child-menu {
			font-size: 12px;
		}

		#logo p {
			height: 80px;
		}
	}

	@media screen and (max-width: 540px) {
	}
</style>
