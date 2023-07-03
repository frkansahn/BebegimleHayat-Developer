<template>
	<div class="row">
		<div class="col-12 footer" id="footer" v-if="$store.state.config">
			<button @click="backToTop" class="btn" id="backToTop">
				<b-icon-arrow-up varinat="white" sclae="1.4" class="mr-1"></b-icon-arrow-up>
				BAŞA DÖN
			</button>
			<div class="container">
				<div class="row mb-5">
					<div class="col-12 col-lg-6" v-if="!isMobile">
						<div class="row">
							<div class="col-12 col-sm-6 col-md-4 mb-3" v-for="(F, index) in sortedFooterMenu"
								:id="`footerMenu${index}`">
								<div class="row">
									<h3 class="col-12">
										{{ F.title }}
									</h3>
									<ul class="col-12">
										<li class="float-left w-100" v-for="(Sub, index) in F.sub_category">
											<NuxtLink :to="Sub.url">
												{{ Sub.name }}
											</NuxtLink>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-lg-6">
						<div class="row">
							<div class="col-12 col-lg-10 offset-lg-2">
								<div class="row">
									<div class="col-12 col-lg-9">
										<h5 class="text-white mb-4">
											Sana özel içerik ve ipuçlarını görebilmek için hemen üye ol!
										</h5>
										<div class="w-100 position-relative">
											<b-form-group class="w-100" id="email_group" label="" label-for="email_input"
												description="">
												<b-form-input size="lg"
													class="border-top-0 border-right-0 border-left-0 pl-0 rounded-0 border-bottom border-white bg-transparent text-white"
													id="email_subscription_input" v-model="email" type="email"
													placeholder="E-posta adresin"
													@keyup.enter="sendEmailSubscription"></b-form-input>
											</b-form-group>
											<b-button class="btn" id="sendEmailSubscription" @click="sendEmailSubscription">
												ÜYE OL
											</b-button>
										</div>
									</div>
									<div class="col-12">
										<div class="row my-5">
											<div class="col-12">
												<h5 class="text-white font-weight-bold mb-4">
													Popüler İçerikler
												</h5>
												<SliderFooterLinks :breakpoints="{
													1024: {
														slidesPerView: 3,
														spaceBetween: 10
													},
													768: {
														slidesPerView: 2,
														spaceBetween: 10
													},
													640: {
														slidesPerView: 2,
														spaceBetween: 8
													},
													320: {
														slidesPerView: 2,
														spaceBetween: 8
													}
												}" :sliders="links1"/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12 col-lg-6" v-if="isMobile">
						<div class="row">
							<div class="col-12 col-sm-6 col-md-4 mb-3" v-for="(F, index) in sortedFooterMenu"
								:id="`footerMenu${index}`">
								<div class="row">
									<h3 class="col-12 d-flex align-items-center justify-content-between" v-b-toggle="`footweMenuToggle_${index}`">
										{{ F.title }}
										<b-icon icon="chevron-right" varinat="secondary"></b-icon>
									</h3>
									<b-collapse :id="`footweMenuToggle_${index}`" class="col-12" accordion="Menü" role="tabpanel" v-if="F.sub_category && F.sub_category.length > 0">
										<div class="row">
											<ul class="col-12" >
												<li class="float-left w-100" v-for="(Sub, index) in F.sub_category">
													<NuxtLink :to="Sub.url">
														{{ Sub.name }}
													</NuxtLink>
												</li>
											</ul>
										</div>
									</b-collapse>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row mb-5">
					<div class="col-12 mb-4" id="links">
						<ul class="list-unstyled">
							<li>
								<NuxtLink class="text-white" to="/kisisel-verilerin-korunmasi-politikasi">
									Kişisel Verilerin Korunması
								</NuxtLink>
							</li>
							<li>
								<NuxtLink class="text-white" to="/kullanim-sart-ve-kosullari">
									Kullanım Şart ve Koşulları
								</NuxtLink>
							</li>
							<li>
								<NuxtLink class="text-white" to="/cerez-politikasi">
									Çerez Politikası
								</NuxtLink>
							</li>
							<li>
								<span class="text-white" @click="isCookiePolitical=true;">
									Çerez Ayarları
								</span>
							</li>
							<li>
								<NuxtLink class="text-white" to="/hakkimizda">
									Hakkımızda
								</NuxtLink>
							</li>
							<li>
								<NuxtLink class="text-white" to="/iletisim">
									İletişim
								</NuxtLink>
							</li>
						</ul>
					</div>
					<div class="col-12 tumHaklar">
						Bu sitede yer alan içerikler tamamen bilgilendirme amaçlıdır. Doktor tavsiyesi yerine kesinlikle geçmez. Tanı ve tedavi için hekiminize danışınız.
					</div>
				</div>
			</div>
		</div>
		<CookiePolitical v-if="isCookiePolitical" @close="isCookiePolitical = false;"/>
	</div>
</template>
<script>

export default {
	name: 'Footer',
	components: {
	},
	props: {

	},
	data() {
		return {
			isMobile: false,
			email: null,
			links1 : [
				{
					name:"Adet (Regl) Kanamasının Az Olmasının Nedenleri",
					url:"https://bebegimlehayat.com/adet-regl-kanamasinin-az-olmasinin-nedenleri",
					image:"https://api.bebegimlehayat.com/Data/image/small/adet-kanamam-az-1684260822427.jpeg"
				},
				{
					name:"Bebek Cinsiyeti Anne Karnında Belirlenebilir Mi? Bebek Cinsiyeti Belirleme Yöntemleri",
					url:"https://bebegimlehayat.com/bebek-cinsiyeti-anne-karninda-belirlenebilir-mi-bebek-cinsiyeti-belirleme-yontemleri",
					image:"https://api.bebegimlehayat.com/Data/image/small/bebek-cinsiyeti-nasil-belirlenir-1684932798765.jpeg"
				},
				{
					name:"Progestan Nedir? Progesteron Hormonunun Yan Etkileri Nelerdir?",
					url:"https://bebegimlehayat.com/progestan-nedir-progesteron-hormonunun-yan-etkileri-nelerdir",
					image:"https://api.bebegimlehayat.com/Data/image/small/progestan-yan-etkileri-nelerdir-1684932532365.jpeg"
				},
				{
					name:"Hamilelikte Adet Görülür Mü?",
					url:"https://bebegimlehayat.com/hamilelikte-adet-gorulur-mu",
					image:"https://api.bebegimlehayat.com/Data/image/small/WhatsApp%20Image%202023-05-23%20at%2018-1684874422133.jpeg"
				},
				{
					name:"Bebeklerde Kuru Öksürük",
					url:"https://bebegimlehayat.com/bebeklerde-kuru-oksuruk",
					image:"https://api.bebegimlehayat.com/Data/image/small/bebeklerde-kuru-oksuruk-1684275123747.jpeg"
				},
				{
					name:"Gebelikte Bebeğin Gelişmesi ve Kilo Alması İçin Uygulanması Gereken Beslenme Düzeni",
					url:"https://bebegimlehayat.com/gebelikte-bebegin-gelismesi-ve-kilo-almasi-icin-uygulanmasi-gereken-beslenme-duzeni",
					image:"https://api.bebegimlehayat.com/Data/image/small/hamilelikte-bebek-gelisimi-icin-ne-yemeli-1684932682612.jpeg"
				}
			],
			isCookiePolitical:false
		}
	},
	methods: {
		getContactInfo(type) {
			var _this = this;
			var contact = JSON.parse(_this.$store.state.config.contact);
			var result = "";
			contact.forEach(C => {
				if (C.name == type)
					result = C.value;
			});
			return result;
		},
		backToTop() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		},
		sendEmailSubscription() {
			var _this = this;
			try {
				if (!_this.$checkIsNullOrEmpty(_this.email)) {
					_this.$bvToast.toast('E-Posta zorunlu', {
						title: `Başarısız..`,
						variant: 'warning',
						autoHideDelay: 500,
						solid: true
					});
					return false;
				}

				if (!_this.$checkEmail(_this.email)) {
					_this.$bvToast.toast('E-Posta formatı uygun değil', {
						title: `Başarısız..`,
						variant: 'warning',
						autoHideDelay: 500,
						solid: true
					});
					return false;
				}

				let reqData = {
					email: _this.email
				};

				_this.$repositories.customer.addEmailSubscription(reqData)
					.then(res => {
						if (res.data.code == "customer_added") {

							_this.$bvToast.toast('Abonelik başarıyla oluşturuldu.', {
								title: `Başarılı..`,
								variant: 'success',
								autoHideDelay: 500,
								solid: true
							});

							_this.email = null;
						}
						else if(res.data.code == "email_duplicate") {
							_this.$bvToast.toast('E-mail adresi zaten kayıtlı.', {
								title: `Başarısız..`,
								variant: 'danger',
								autoHideDelay: 500,
								solid: true
							});
							
						}
						else {
							_this.$bvToast.toast('Abonelik oluşturulamadı.', {
								title: `Başarısız..`,
								variant: 'danger',
								autoHideDelay: 500,
								solid: true
							});
							
						}
					})
					.catch(err => {
						_this.$bvToast.toast('Beklenmeyen bir hata oluştu.', {
							title: `Başarısız..`,
							variant: 'danger',
							autoHideDelay: 500,
							solid: true
						});
					});

			}
			catch (error) {
				console.log(error);
			}
		}
	},
	async mounted() {

		this.isMobile = window.screen.width > 768 ? false : true;
	},
	computed: {
		sortedFooterMenu: function () {
			if (this.$store.state.config.footer_menu) {
				function compare(a, b) {
					if (a.sort < b.sort)
						return -1;
					if (a.sort > b.sort)
						return 1;
					return 0;
				}

				return JSON.parse(this.$store.state.config.footer_menu).sort(compare);
			}
		},
		sortedSocialMedia: function () {
			if (this.$store.state.config.social_media) {
				function compare(a, b) {
					if (a.sort < b.sort)
						return -1;
					if (a.sort > b.sort)
						return 1;
					return 0;
				}

				return JSON.parse(this.$store.state.config.social_media).sort(compare);
			}
		}
	}
}
</script>

<style>
	#footer #links ul li {
		float:left;
		margin-right: 2em;
	}
	
	#footer #links ul li a, #footer #links ul li span{
		text-decoration: underline;
		font-size: 13px;
		cursor:pointer;
		float:left;
		margin-bottom: 8px;
	}

	#email_subscription_input::placeholder {
		color: #fff;
		font-size: 12px;
	}

	#email_subscription_input {
		font-size: 15px;
	}

	#sendEmailSubscription {
		background-color: #fff;
		color: #000;
		border-radius: 0;
		font-size: 14px;
		padding: 0.5em 1em;
		position: absolute;
		top: 0;
		right: 0;
	}

	#backToTop {
		position: absolute;
		top: 0;
		background-color: #00cfda;
		color: #fff;
		font-size: 12px;
		right: 50%;
		transform: translateX(50%);
		border-radius: 0;
		padding-top: 0.8em;
		padding-bottom: 0.8em;
	}

	#footer {
		background: #000;
		border-top: 7px solid #00cfda;
		padding: 6em 0 0 0;
	}

	.social-media h3 {
		color: #ffffff;
	}

	.social-media ul li {
		list-style-type: none;
	}

	.social-media ul li a {
		color: #ffffff;
	}

	.social-media ul li a:hover svg {
		transform: scale(1.5);
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	.social-media ul li a svg {
		-webkit-transition: all .5s ease;
		-moz-transition: all .5s ease;
		-o-transition: all .5s ease;
		-ms-transition: all .5s ease;
		transition: all .5s ease;
	}

	[id*=footerMenu] h3 {
		font-size: 15px;
		color: #ffffff;
		padding-bottom: 1em;
	}

	[id*=footerMenu] h3:before {
		content: '';
		width: 22px;
		height: 2px;
		background-color: #00cfda;
		position: absolute;
		left: 15px;
		bottom: 12px;
	}

	[id*=footerMenu] ul li {
		list-style-type: none;
		margin-bottom: 3px;
	}

	[id*=footerMenu] ul li a {
		color: #ffffff;
		font-size: 12px;
	}

	#footerMenuIletisim li {
		display: flex;
		align-items: baseline;
	}

	#footerMenuIletisim li span {
		color: #ffffff;
		font-size: 14px;
	}

	#footerMenuIletisim li span a {
		font-size: 15px;
	}

	.tumHaklar {
		font-size: 13px;
		font-weight: normal;
		color: #8e8e8e;
		line-height: 2;
	}</style>
