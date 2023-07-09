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
												}" :sliders="links1" />
											</div>											
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-12" v-if="isMobile">
						<div class="row">
							<div class="col-12 mb-3" v-for="(F, index) in sortedFooterMenu"
								:id="`footerMenu${index}`">
								<div class="row">
									<h3 class="col-12 d-flex align-items-center justify-content-between"
										v-b-toggle="`footweMenuToggle_${index}`">
										{{ F.title }}
										<b-icon icon="chevron-right" varinat="secondary"></b-icon>
									</h3>
									<b-collapse :id="`footweMenuToggle_${index}`" class="col-12" accordion="Menü"
										role="tabpanel" v-if="F.sub_category && F.sub_category.length > 0">
										<div class="row">
											<ul class="col-12">
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

					<div class="col-12 mt-5 d-flex d-md-none align-items-center justify-content-center"
						id="social-link">
						<a href="https://www.facebook.com/bebegimlehayatcom" target="_blank"
							class="mx-1 facebook-link">
							<svg xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" height="30"
								width="30" version="1.1" id="Layer_1" viewBox="-143 145 512 512"
								xml:space="preserve">
								<path
									d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M169.5,357.6l-2.9,38.3h-39.3  v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7c8.7-11.5,20.6-19.3,41.1-19.3c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2  c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z" />
							</svg>
						</a>

						<a href="https://www.instagram.com/bebegimlehayatcom/" target="_blank"
							class="mx-1 instagram-link">
							<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30"
								height="30" viewBox="0 0 19.2 19.2" data-name="Instagram w/circle">
								<path
									d="M13.498 6.651a1.656 1.656 0 0 0-.95-.949 2.766 2.766 0 0 0-.928-.172c-.527-.024-.685-.03-2.02-.03s-1.493.006-2.02.03a2.766 2.766 0 0 0-.929.172 1.656 1.656 0 0 0-.949.95 2.766 2.766 0 0 0-.172.928c-.024.527-.03.685-.03 2.02s.006 1.493.03 2.02a2.766 2.766 0 0 0 .172.929 1.656 1.656 0 0 0 .95.949 2.766 2.766 0 0 0 .928.172c.527.024.685.029 2.02.029s1.493-.005 2.02-.03a2.766 2.766 0 0 0 .929-.171 1.656 1.656 0 0 0 .949-.95 2.766 2.766 0 0 0 .172-.928c.024-.527.029-.685.029-2.02s-.005-1.493-.03-2.02a2.766 2.766 0 0 0-.171-.929zM9.6 12.168A2.568 2.568 0 1 1 12.168 9.6 2.568 2.568 0 0 1 9.6 12.168zm2.669-4.637a.6.6 0 1 1 .6-.6.6.6 0 0 1-.6.6zM11.267 9.6A1.667 1.667 0 1 1 9.6 7.933 1.667 1.667 0 0 1 11.267 9.6zM9.6 0a9.6 9.6 0 1 0 9.6 9.6A9.6 9.6 0 0 0 9.6 0zm4.97 11.661a3.67 3.67 0 0 1-.233 1.214 2.556 2.556 0 0 1-1.462 1.462 3.67 3.67 0 0 1-1.213.233c-.534.024-.704.03-2.062.03s-1.528-.006-2.062-.03a3.67 3.67 0 0 1-1.213-.233 2.556 2.556 0 0 1-1.462-1.462 3.67 3.67 0 0 1-.233-1.213c-.024-.534-.03-.704-.03-2.062s.006-1.528.03-2.062a3.67 3.67 0 0 1 .232-1.213 2.556 2.556 0 0 1 1.463-1.463 3.67 3.67 0 0 1 1.213-.232c.534-.024.704-.03 2.062-.03s1.528.006 2.062.03a3.67 3.67 0 0 1 1.213.232 2.556 2.556 0 0 1 1.462 1.463 3.67 3.67 0 0 1 .233 1.213c.024.534.03.704.03 2.062s-.006 1.528-.03 2.062z" />
							</svg>
						</a>

						<a href="https://www.youtube.com/@BebegimleHayatcom" target="_blank"
							class="mx-1 youtube-link">
							<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
								viewBox="0 0 48 48" fill="none">
								<circle cx="24" cy="24" r="20" fill="#fff"></circle>
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M35.3005 16.3781C35.6996 16.7772 35.9872 17.2739 36.1346 17.8187C36.9835 21.2357 36.7873 26.6324 36.1511 30.1813C36.0037 30.7261 35.7161 31.2228 35.317 31.6219C34.9179 32.021 34.4212 32.3086 33.8764 32.456C31.8819 33 23.8544 33 23.8544 33C23.8544 33 15.8269 33 13.8324 32.456C13.2876 32.3086 12.7909 32.021 12.3918 31.6219C11.9927 31.2228 11.7051 30.7261 11.5577 30.1813C10.7038 26.7791 10.9379 21.3791 11.5412 17.8352C11.6886 17.2903 11.9762 16.7936 12.3753 16.3945C12.7744 15.9954 13.2711 15.7079 13.8159 15.5604C15.8104 15.0165 23.8379 15 23.8379 15C23.8379 15 31.8654 15 33.8599 15.544C34.4047 15.6914 34.9014 15.979 35.3005 16.3781ZM27.9423 24L21.283 27.8571V20.1428L27.9423 24Z"
									fill="#000"></path>
							</svg>
						</a>

						<a href="https://www.linkedin.com/company/bebegimlehayatcom" target="_blank"
							class="mx-1 linkedin-link">
							<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"
								viewBox="0 0 32 32" fill="none">
								<rect x="2" y="2" width="28" height="28" rx="14" fill="#fff"></rect>
								<path
									d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
									fill="#000"></path>
								<path d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z" fill="#000">
								</path>
								<path
									d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
									fill="#000"></path>
							</svg>
						</a>

						<a href="https://twitter.com/bebegimlehayatt" target="_blank"
							class="mx-1 twitter-link">
							<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
								viewBox="0 0 48 48" fill="none">
								<circle cx="24" cy="24" r="20" fill="#fff"></circle>
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M36 16.3086C35.1177 16.7006 34.1681 16.9646 33.1722 17.0838C34.1889 16.4742 34.9697 15.5095 35.3368 14.36C34.3865 14.9247 33.3314 15.3335 32.2107 15.5551C31.3123 14.5984 30.0316 14 28.6165 14C25.8975 14 23.6928 16.2047 23.6928 18.9237C23.6928 19.3092 23.7368 19.6852 23.8208 20.046C19.7283 19.8412 16.1005 17.8805 13.6719 14.9015C13.2479 15.6287 13.0055 16.4742 13.0055 17.3766C13.0055 19.0845 13.8735 20.5916 15.1958 21.4747C14.3878 21.4491 13.6295 21.2275 12.9647 20.8587V20.9203C12.9647 23.3066 14.663 25.296 16.9141 25.7496C16.5013 25.8616 16.0661 25.9224 15.6174 25.9224C15.2998 25.9224 14.991 25.8912 14.6902 25.8336C15.3166 27.7895 17.1357 29.2134 19.2899 29.2534C17.6052 30.5733 15.4822 31.3612 13.1751 31.3612C12.7767 31.3612 12.3848 31.338 12 31.2916C14.1791 32.6884 16.7669 33.5043 19.5475 33.5043C28.6037 33.5043 33.5562 26.0016 33.5562 19.4956C33.5562 19.282 33.5522 19.0693 33.5418 18.8589C34.5049 18.1629 35.34 17.2958 36 16.3086Z"
									fill="#000"></path>
							</svg>
						</a>

						<a href="https://www.threads.net/@bebegimlehayatcom" target="_blank"
							class="mx-1 threads-link">
							<svg xmlns="http://www.w3.org/2000/svg" aria-label="Threads"
								viewBox="0 0 192 192" width="35" height="35">
								<path class="x19hqcy"
									d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
							</svg>
						</a>
					</div>
				</div>
				<div class="row mb-5">
					<div class="col-12 mb-4 d-flex align-items-center justify-content-between" id="links">
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
								<span class="text-white" @click="isCookiePolitical = true;">
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
						<div class="d-none d-md-flex align-items-center" id="social-link">
							<a href="https://www.facebook.com/bebegimlehayatcom" target="_blank" class="ml-3 facebook-link">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
									fill="#fff" height="30" width="30" version="1.1" id="Layer_1" viewBox="-143 145 512 512"
									xml:space="preserve">
									<path
										d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M169.5,357.6l-2.9,38.3h-39.3  v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7c8.7-11.5,20.6-19.3,41.1-19.3c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2  c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z" />
								</svg>
							</a>

							<a href="https://www.instagram.com/bebegimlehayatcom/" target="_blank"
								class="ml-3 instagram-link">
								<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30" height="30"
									viewBox="0 0 19.2 19.2" data-name="Instagram w/circle">
									<path
										d="M13.498 6.651a1.656 1.656 0 0 0-.95-.949 2.766 2.766 0 0 0-.928-.172c-.527-.024-.685-.03-2.02-.03s-1.493.006-2.02.03a2.766 2.766 0 0 0-.929.172 1.656 1.656 0 0 0-.949.95 2.766 2.766 0 0 0-.172.928c-.024.527-.03.685-.03 2.02s.006 1.493.03 2.02a2.766 2.766 0 0 0 .172.929 1.656 1.656 0 0 0 .95.949 2.766 2.766 0 0 0 .928.172c.527.024.685.029 2.02.029s1.493-.005 2.02-.03a2.766 2.766 0 0 0 .929-.171 1.656 1.656 0 0 0 .949-.95 2.766 2.766 0 0 0 .172-.928c.024-.527.029-.685.029-2.02s-.005-1.493-.03-2.02a2.766 2.766 0 0 0-.171-.929zM9.6 12.168A2.568 2.568 0 1 1 12.168 9.6 2.568 2.568 0 0 1 9.6 12.168zm2.669-4.637a.6.6 0 1 1 .6-.6.6.6 0 0 1-.6.6zM11.267 9.6A1.667 1.667 0 1 1 9.6 7.933 1.667 1.667 0 0 1 11.267 9.6zM9.6 0a9.6 9.6 0 1 0 9.6 9.6A9.6 9.6 0 0 0 9.6 0zm4.97 11.661a3.67 3.67 0 0 1-.233 1.214 2.556 2.556 0 0 1-1.462 1.462 3.67 3.67 0 0 1-1.213.233c-.534.024-.704.03-2.062.03s-1.528-.006-2.062-.03a3.67 3.67 0 0 1-1.213-.233 2.556 2.556 0 0 1-1.462-1.462 3.67 3.67 0 0 1-.233-1.213c-.024-.534-.03-.704-.03-2.062s.006-1.528.03-2.062a3.67 3.67 0 0 1 .232-1.213 2.556 2.556 0 0 1 1.463-1.463 3.67 3.67 0 0 1 1.213-.232c.534-.024.704-.03 2.062-.03s1.528.006 2.062.03a3.67 3.67 0 0 1 1.213.232 2.556 2.556 0 0 1 1.462 1.463 3.67 3.67 0 0 1 .233 1.213c.024.534.03.704.03 2.062s-.006 1.528-.03 2.062z" />
								</svg>
							</a>

							<a href="https://www.youtube.com/@BebegimleHayatcom" target="_blank" class="ml-3 youtube-link">
								<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 48 48"
									fill="none">
									<circle cx="24" cy="24" r="20" fill="#fff"></circle>
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M35.3005 16.3781C35.6996 16.7772 35.9872 17.2739 36.1346 17.8187C36.9835 21.2357 36.7873 26.6324 36.1511 30.1813C36.0037 30.7261 35.7161 31.2228 35.317 31.6219C34.9179 32.021 34.4212 32.3086 33.8764 32.456C31.8819 33 23.8544 33 23.8544 33C23.8544 33 15.8269 33 13.8324 32.456C13.2876 32.3086 12.7909 32.021 12.3918 31.6219C11.9927 31.2228 11.7051 30.7261 11.5577 30.1813C10.7038 26.7791 10.9379 21.3791 11.5412 17.8352C11.6886 17.2903 11.9762 16.7936 12.3753 16.3945C12.7744 15.9954 13.2711 15.7079 13.8159 15.5604C15.8104 15.0165 23.8379 15 23.8379 15C23.8379 15 31.8654 15 33.8599 15.544C34.4047 15.6914 34.9014 15.979 35.3005 16.3781ZM27.9423 24L21.283 27.8571V20.1428L27.9423 24Z"
										fill="#000"></path>
								</svg>
							</a>

							<a href="https://www.linkedin.com/company/bebegimlehayatcom" target="_blank"
								class="ml-3 linkedin-link">
								<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 32 32"
									fill="none">
									<rect x="2" y="2" width="28" height="28" rx="14" fill="#fff"></rect>
									<path
										d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
										fill="#000"></path>
									<path d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z" fill="#000"></path>
									<path
										d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
										fill="#000"></path>
								</svg>
							</a>

							<a href="https://twitter.com/bebegimlehayatt" target="_blank" class="ml-3 twitter-link">
								<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48"
									fill="none">
									<circle cx="24" cy="24" r="20" fill="#fff"></circle>
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M36 16.3086C35.1177 16.7006 34.1681 16.9646 33.1722 17.0838C34.1889 16.4742 34.9697 15.5095 35.3368 14.36C34.3865 14.9247 33.3314 15.3335 32.2107 15.5551C31.3123 14.5984 30.0316 14 28.6165 14C25.8975 14 23.6928 16.2047 23.6928 18.9237C23.6928 19.3092 23.7368 19.6852 23.8208 20.046C19.7283 19.8412 16.1005 17.8805 13.6719 14.9015C13.2479 15.6287 13.0055 16.4742 13.0055 17.3766C13.0055 19.0845 13.8735 20.5916 15.1958 21.4747C14.3878 21.4491 13.6295 21.2275 12.9647 20.8587V20.9203C12.9647 23.3066 14.663 25.296 16.9141 25.7496C16.5013 25.8616 16.0661 25.9224 15.6174 25.9224C15.2998 25.9224 14.991 25.8912 14.6902 25.8336C15.3166 27.7895 17.1357 29.2134 19.2899 29.2534C17.6052 30.5733 15.4822 31.3612 13.1751 31.3612C12.7767 31.3612 12.3848 31.338 12 31.2916C14.1791 32.6884 16.7669 33.5043 19.5475 33.5043C28.6037 33.5043 33.5562 26.0016 33.5562 19.4956C33.5562 19.282 33.5522 19.0693 33.5418 18.8589C34.5049 18.1629 35.34 17.2958 36 16.3086Z"
										fill="#000"></path>
								</svg>
							</a>

							<a href="https://www.threads.net/@bebegimlehayatcom" target="_blank" class="ml-3 threads-link">
								<svg xmlns="http://www.w3.org/2000/svg" aria-label="Threads" viewBox="0 0 192 192"
									width="35" height="35">
									<path class="x19hqcy"
										d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
								</svg>
							</a>
						</div>
					</div>
					<div class="col-12 tumHaklar">
						Bu sitede yer alan içerikler tamamen bilgilendirme amaçlıdır. Doktor tavsiyesi yerine kesinlikle
						geçmez. Tanı ve tedavi için hekiminize danışınız.
					</div>
				</div>
			</div>
		</div>
		<CookiePolitical v-if="isCookiePolitical" @close="isCookiePolitical = false;" />
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
			links1: [
				{
					name: "Adet (Regl) Kanamasının Az Olmasının Nedenleri",
					url: "https://bebegimlehayat.com/adet-regl-kanamasinin-az-olmasinin-nedenleri",
					image: "https://api.bebegimlehayat.com/Data/image/small/adet-kanamam-az-1684260822427.jpeg"
				},
				{
					name: "Bebek Cinsiyeti Anne Karnında Belirlenebilir Mi? Bebek Cinsiyeti Belirleme Yöntemleri",
					url: "https://bebegimlehayat.com/bebek-cinsiyeti-anne-karninda-belirlenebilir-mi-bebek-cinsiyeti-belirleme-yontemleri",
					image: "https://api.bebegimlehayat.com/Data/image/small/bebek-cinsiyeti-nasil-belirlenir-1684932798765.jpeg"
				},
				{
					name: "Progestan Nedir? Progesteron Hormonunun Yan Etkileri Nelerdir?",
					url: "https://bebegimlehayat.com/progestan-nedir-progesteron-hormonunun-yan-etkileri-nelerdir",
					image: "https://api.bebegimlehayat.com/Data/image/small/progestan-yan-etkileri-nelerdir-1684932532365.jpeg"
				},
				{
					name: "Hamilelikte Adet Görülür Mü?",
					url: "https://bebegimlehayat.com/hamilelikte-adet-gorulur-mu",
					image: "https://api.bebegimlehayat.com/Data/image/small/WhatsApp%20Image%202023-05-23%20at%2018-1684874422133.jpeg"
				},
				{
					name: "Bebeklerde Kuru Öksürük",
					url: "https://bebegimlehayat.com/bebeklerde-kuru-oksuruk",
					image: "https://api.bebegimlehayat.com/Data/image/small/bebeklerde-kuru-oksuruk-1684275123747.jpeg"
				},
				{
					name: "Gebelikte Bebeğin Gelişmesi ve Kilo Alması İçin Uygulanması Gereken Beslenme Düzeni",
					url: "https://bebegimlehayat.com/gebelikte-bebegin-gelismesi-ve-kilo-almasi-icin-uygulanmasi-gereken-beslenme-duzeni",
					image: "https://api.bebegimlehayat.com/Data/image/small/hamilelikte-bebek-gelisimi-icin-ne-yemeli-1684932682612.jpeg"
				}
			],
			isCookiePolitical: false
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
						else if (res.data.code == "email_duplicate") {
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
#social-link a {
	transition: all .5s ease;
}

#social-link a:hover {
	transform: scale(1.2);
	transition: all .5s ease;
}


#footer #links ul li {
	float: left;
	margin-right: 2em;
}

.threads-link {
	width: 31px;
	height: 31px;
	background: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.threads-link svg {
	width: 20px;
	height: 19px;
}

#footer #links ul li a,
#footer #links ul li span {
	text-decoration: underline;
	font-size: 13px;
	cursor: pointer;
	float: left;
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
}

@media screen and (max-width: 768px) {
	[id*=footerMenu] h3:before {
		bottom: 8px;
	}

	#footer #links ul li {
		width: 768px;
	}
}

</style>
