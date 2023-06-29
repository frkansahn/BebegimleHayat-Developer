import Vue from 'vue';

export const state = () => ({
	user: undefined,
	token: undefined,
	userLoggedIn: false,
	platform: false,
	guest_code: null,
	payment_code: 'pay_credit_card',
	language: 'tr',
	currency: 1,
	lastAddedProduct:undefined,
	cart: {
		customer_id: null,
		is_gift_cart: false,
		is_gift_note_active: false,
		gift_note: null,
		price_gift_package: null,
		currency_id: null,
		general_note: null,
		price_personalization: null,
		is_delivery_date_active: false,
		delivery_date_text: null,
		delivery_date: null,
		selected_campaign_list: null,
		campaign_list: null,
		is_cargo_free: false,
		price_cargo: null,
		is_coupon_code: false,
		coupon_code: null,
		products: []
	},
	cartProductDetails: undefined
})

export const mutations = {
	user(state, data) {
		state.user = data;
	},
	token(state, data) {
		state.token = data;
	},
	userLoggedIn(state, data) {
		state.userLoggedIn = data;
	},
	platform(state, data) {
		state.platform = data;
	},
	guest_code(state, data) {
		state.guest_code = data;
	},
	payment_code(state, data) {
		state.payment_code = data;
	},
	language(state, data) {
		state.language = data;
	},
	settings(state, data) {
		state.settings = data;
	},
	lastAddedProduct(state, data) {
		state.lastAddedProduct = data;
	},
	cartProductDetails(state, data) {
		state.cartProductDetails = data;
	},
	updateCartInvoiceAddressId(state, data) {
		if (state.cartProductDetails)
			state.cartProductDetails.cart.invoice_address_id = data;
	},
	updateCartDeliveryAddressId(state, data) {
		if (state.cartProductDetails)
			state.cartProductDetails.cart.delivery_address_id = data;
	},
	cartAddProduct(state, product) {
		let data = {
			product_id: product.id,
			sub_product_id: product.selectedSubProductId || null,
			quantity: product.quantity
		};

		if (state.cart.products && state.cart.products.length == 0) {
			state.cart.products.push(data);
		}
		else {
			let cart_product = state.cart.products.find(x => x.product_id == product.id && x.sub_product_id == product.selectedSubProductId);
			if (cart_product) {
				cart_product.quantity += data.quantity;
			}
			else {
				state.cart.products.push(data);
			}
		}
		state.cart = JSON.parse(JSON.stringify(state.cart));
	}
}

export const getters = {
	getUser: (state) => state.user,
	getToken: (state) => state.token,
	getSetting: (state) => (code) => {
		if (state.customer.settings) {
			return state.customer.settings.find(x => x.code == code);
		}

		return false;
	}
}

export const actions = {
	nuxtServerInit({ commit }) {
		return new Promise(async (resolve, reject) => {
			try {
				let token = this.$cookiz.get('g_u_t');
				let user = this.$cookiz.get('g_u_i');
				let guest_code = this.$cookiz.get('g_u_guest_code');

				if (token) {
					commit("token", token);
					commit("userLoggedIn", true);
				}
				else
					commit("userLoggedIn", false);

				resolve(true)
			}
			catch (err) {
				reject(err);
			}
		});
	},
	getCart({ dispatch, commit, state }) {
		if (state.userLoggedIn) {
			if (state.user?.id) {
				this.$repositories.cart.getCartDetails(state.user.id)
					.then(res => {
						if (res && res.data.success == 'success') {
							commit("cartProductDetails", res.data.cartDetails);
						}
						else {
							commit("cartProductDetails", null);
						}
					})
					.catch(err => {
						commit("cartProductDetails", null);
					})
			}
			else {
				commit("cartProductDetails", null);
			}
		}
		else {
			if (state.guest_code) {
				this.$repositories.cart.getCartDetails(state.guest_code)
					.then(res => {
						if (res && res.data.success == 'success') {
							commit("cartProductDetails", res.data.cartDetails);
						}
						else {
							commit("cartProductDetails", null);
						}
					})
					.catch(err => {
						commit("cartProductDetails", null);
					})
			}
			else {
				commit("cartProductDetails", null);
			}
		}
	},
	updateCart({ dispatch, commit, state }, cart) {
		return new Promise(async (resolve, reject) => {
			try {
				if (state.cartProductDetails?.cart) {
					this.$repositories.cart.cartUpdate(state.cartProductDetails.cart)
						.then(res => {
							if (res && res.data.success == 'success') {
								resolve(true);
							}
							else {
								resolve(false);
							}
						})
						.catch(err => {
							resolve(false);
						})
				}
				else {
					resolve(false);
				}
			}
			catch (err) {
				reject(err);
			}
		});

	},
	addCartProduct({ dispatch, commit, state }, product) {
		return new Promise(async (resolve, reject) => {
			try {
				if (state.userLoggedIn) {
					let reqData = {
						customer_id: state.user.id,
						is_guest: false,
						guest_code: null,
						currency: state.currency,
						products: [
							{
								product_id: product.id,
								sub_product_id: product.selectedSubProductId,
								quantity: product.quantity
							}
						]
					};
					this.$repositories.cart.add(reqData)
						.then(res => {
							if (res && res.data.response) {
								if (res.data.response[0].code == "no_stock") {
									$nuxt.$bvToast.toast('Üründe yeteri kadar stok yok.', {
										title: `Başarısız..`,
										variant: 'warning',
										autoHideDelay: 500,
										solid: true
									});

									resolve(false);
								}
								else if (res.data.response[0].code == "required_sub_product") {
									$nuxt.$bvToast.toast('Alt ürün seçilmelidir.', {
										title: `Başarısız..`,
										variant: 'warning',
										autoHideDelay: 500,
										solid: true
									});

									if (res.data.response[0].data?.seo_link)
										$nuxt.$router.push('/product-detail/' + res.data.response[0].data?.seo_link);

									resolve(false);
								}
								else {
									commit('lastAddedProduct', res.data.response[0].data);
									resolve(true);
								}
								commit("cartProductDetails", res.data.cartDetails);
							}
							else {
								$nuxt.$bvToast.toast('Ürün sepete eklenirken bir hata oluştu.', {
									title: `Başarısız..`,
									variant: 'danger',
									autoHideDelay: 500,
									solid: true
								});
								resolve(false);
							}
						})
						.catch(err => {
							resolve(false);
						})
				}
				else {
					if (product.id && product.quantity) {
						let reqData = {
							customer_id: null,
							is_guest: true,
							guest_code: state.guest_code,
							currency: state.currency,
							products: [
								{
									product_id: product.id,
									sub_product_id: product.selectedSubProductId,
									quantity: product.quantity
								}
							]
						};
						this.$repositories.cart.add(reqData)
							.then(res => {

								if (!state.guest_code || res.data.guest_code != state.guest_code) {
									commit("guest_code", res.data.guest_code);
									this.$cookiz.set('g_u_guest_code', res.data.guest_code);
								}

								if (res && res.data.response) {
									if (res.data.response[0].code == "no_stock") {
										$nuxt.$bvToast.toast('Üründe yeteri kadar stok yok.', {
											title: `Başarısız..`,
											variant: 'warning',
											autoHideDelay: 500,
											solid: true
										});

										resolve(false);
									}
									else if (res.data.response[0].code == "required_sub_product") {
										$nuxt.$bvToast.toast('Alt ürün seçilmelidir.', {
											title: `Başarısız..`,
											variant: 'warning',
											autoHideDelay: 500,
											solid: true
										});

										if (res.data.response[0].data?.seo_link)
											$nuxt.$router.push('/product-detail/' + res.data.response[0].data?.seo_link);

										resolve(false);
									}
									else {
										commit('lastAddedProduct', res.data.response[0].data);
										resolve(true);
									}
									commit("cartProductDetails", res.data.cartDetails);
								}
								else {
									$nuxt.$bvToast.toast('Ürün sepete eklenirken bir hata oluştu.', {
										title: `Başarısız..`,
										variant: 'danger',
										autoHideDelay: 500,
										solid: true
									});
									resolve(false);
								}
							})
							.catch(err => {
								resolve(false);
							})
					}
					else {
						resolve(false);
					}
				}
			}
			catch (err) {
				reject(err);
			}
		});

	},
	updateCartProduct({ dispatch, commit, state }, product) {
		return new Promise(async (resolve, reject) => {
			try {
				if (state.userLoggedIn) {
					let reqData = {
						cart_id: state.cartProductDetails.cart.id,
						customer_id: state.user.id,
						is_guest: false,
						guest_code: null,
						currency: state.currency,
						products: [
							{
								cart_product_id: product.cart_product_id,
								quantity: product.quantity
							}
						]
					};
					this.$repositories.cart.update(reqData)
						.then(res => {
							if (res && res.data.response) {
								if (res.data.response[0].code == "no_stock") {
									$nuxt.$bvToast.toast('Üründe yeteri kadar stok yok.', {
										title: `Başarısız..`,
										variant: 'warning',
										autoHideDelay: 500,
										solid: true
									});

									resolve(false);
								}
								else if (res.data.response[0].code == "error_member_min_order") {
									$nuxt.$bvToast.toast('Ürün minimum sipariş miktarının altında olamaz.', {
										title: `Başarısız..`,
										variant: 'warning',
										autoHideDelay: 500,
										solid: true
									});

									resolve(false);
								}
								else if (res.data.response[0].code == "error_member_max_order") {
									$nuxt.$bvToast.toast('Maksimum sipariş miktarını aştınız.', {
										title: `Başarısız..`,
										variant: 'warning',
										autoHideDelay: 500,
										solid: true
									});

									resolve(false);
								}
								else {
									$nuxt.$bvToast.toast('Ürün başarıyla güncellendi.', {
										title: `Başarılı..`,
										variant: 'success',
										autoHideDelay: 500,
										solid: true
									});
									resolve(true);
								}
								commit("cartProductDetails", res.data.cartDetails);
							}
							else {
								$nuxt.$bvToast.toast('Ürün güncellenirken bir hata oluştu.', {
									title: `Başarısız..`,
									variant: 'danger',
									autoHideDelay: 500,
									solid: true
								});
								resolve(false);
							}
						})
						.catch(err => {
							resolve(false);
						})
				}
				else {
					if (product.id && product.quantity) {
						let reqData = {
							cart_id: state.cartProductDetails.cart.id,
							customer_id: null,
							is_guest: true,
							guest_code: state.guest_code,
							currency: state.currency,
							products: [
								{
									cart_product_id: product.cart_product_id,
									quantity: product.quantity
								}
							]
						};
						this.$repositories.cart.update(reqData)
							.then(res => {
								if (res && res.data.response) {
									if (res.data.response[0].code == "no_stock") {
										$nuxt.$bvToast.toast('Üründe yeteri kadar stok yok.', {
											title: `Başarısız..`,
											variant: 'warning',
											autoHideDelay: 500,
											solid: true
										});

										resolve(false);
									}
									else if (res.data.response[0].code == "error_member_min_order") {
										$nuxt.$bvToast.toast('Ürün minimum sipariş miktarının altında olamaz.', {
											title: `Başarısız..`,
											variant: 'warning',
											autoHideDelay: 500,
											solid: true
										});

										resolve(false);
									}
									else if (res.data.response[0].code == "error_member_max_order") {
										$nuxt.$bvToast.toast('Maksimum sipariş miktarını aştınız.', {
											title: `Başarısız..`,
											variant: 'warning',
											autoHideDelay: 500,
											solid: true
										});

										resolve(false);
									}
									else {
										$nuxt.$bvToast.toast('Ürün başarıyla güncellendi.', {
											title: `Başarılı..`,
											variant: 'success',
											autoHideDelay: 500,
											solid: true
										});
										resolve(true);
									}
									commit("cartProductDetails", res.data.cartDetails);
								}
								else {
									$nuxt.$bvToast.toast('Ürün güncellenirken bir hata oluştu.', {
										title: `Başarısız..`,
										variant: 'danger',
										autoHideDelay: 500,
										solid: true
									});
									resolve(false);
								}
							})
							.catch(err => {
								resolve(false);
							})
					}
					else {
						resolve(false);
					}
				}
			}
			catch (err) {
				reject(err);
			}
		});

	},
	deleteCartProduct({ dispatch, commit, state }, cart_product_id) {
		return new Promise(async (resolve, reject) => {
			try {
				if (state.userLoggedIn) {
					this.$repositories.cart.delete(cart_product_id)
						.then(res => {
							if (res && res.data.response) {
								if (res && res.data.success == 'success') {
									$nuxt.$bvToast.toast('Ürün başarıyla silindi.', {
										title: `Başarılı..`,
										variant: 'success',
										autoHideDelay: 500,
										solid: true
									});
									resolve(true);
									commit("cartProductDetails", res.data.cartDetails);
								}
								else {
									$nuxt.$bvToast.toast('Ürün silinirken bir hata oluştu.', {
										title: `Başarısız..`,
										variant: 'danger',
										autoHideDelay: 500,
										solid: true
									});
									resolve(false);
								}
							}
							else {
								$nuxt.$bvToast.toast('Ürün güncellenirken bir hata oluştu.', {
									title: `Başarısız..`,
									variant: 'danger',
									autoHideDelay: 500,
									solid: true
								});
								resolve(false);
							}
						})
						.catch(err => {
							resolve(false);
						})
				}
				else {
					if (cart_product_id) {
						this.$repositories.cart.delete(cart_product_id)
							.then(res => {
								if (res && res.data.success == 'success') {
									$nuxt.$bvToast.toast('Ürün başarıyla silindi.', {
										title: `Başarılı..`,
										variant: 'success',
										autoHideDelay: 500,
										solid: true
									});
									resolve(true);
									commit("cartProductDetails", res.data.cartDetails);
								}
								else {
									$nuxt.$bvToast.toast('Ürün silinirken bir hata oluştu.', {
										title: `Başarısız..`,
										variant: 'danger',
										autoHideDelay: 500,
										solid: true
									});
									resolve(false);
								}
							})
							.catch(err => {
								resolve(false);
							})
					}
					else {
						resolve(false);
					}
				}
			}
			catch (err) {
				reject(err);
			}
		});

	}
}