import Vue from 'vue';

export const state = () => ({
    noImageProduct:undefined,
})

export const mutations = {
	noImageProduct (state , data) {
    	state.noImageProduct = data;
  	}
}

export const getters = {
}

export const actions = {
	nuxtServerInit({ commit }) {
	}
}