import Vue from 'vue';

export const state = () => ({
	language:'tr',
  	config: undefined,
	settings: undefined,
  	token:undefined,
	adminShowLeftMenu:false,
  	_cusId:undefined,
  	_userId:undefined,
	userLoggedIn:false,
	adminLoggedIn:false
})

export const mutations = {
  	config (state , data) {
    	state.config = data;
  	},
	settings(state, data) {
		state.settings = data;
	},
  	token (state , data) {
    	state.token = data;
  	},
	adminShowLeftMenu (state , data) {
    	state.adminShowLeftMenu = data;
  	},
  	_cusId (state , data) {
    	state._cusId = data;
  	},
  	_userId (state , data) {
    	state._userId = data;
  	},
	userLoggedIn (state , data) {
    	state.userLoggedIn = data;
  	},
	adminLoggedIn (state , data) {
    	state.adminLoggedIn = data;
  	}
}

export const getters = {
	getSetting: (state) => (code) => {
		if (state.settings) {
			return state.settings.find(x => x.code == code);
		}

		return false;
	}
}

export const actions = {
	nuxtServerInit({ commit }) {

		let adminShowLeftMenu = this.$cookiz.get('a_lm');
		if (adminShowLeftMenu)
			commit("adminShowLeftMenu", adminShowLeftMenu);

		let userToken = this.$cookiz.get('token');
		let adminToken = this.$cookiz.get('admintoken');
		let userId = this.$cookiz.get('_userId');
		let cusId = this.$cookiz.get('_cusId');

		commit("_userId", userId);
		commit("_cusId", cusId);

		if (userToken){
			commit("token", userToken);
			commit("userLoggedIn", true);
		}
		else
			commit("userLoggedIn", false);

		if (adminToken){
			commit("token", adminToken);
			commit("adminLoggedIn", true);
		}
		else
			commit("adminLoggedIn", false);
	},
  	getService({ dispatch , commit , state} , {urlParameter,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$get(`${process.env.baseUrl}${urlParameter}`, {'headers': { 'Authorization':'Bearer ' + token}})
  				.then(response => {
				    return response;
				})
				.catch(error => {
					return false;
				});
  				resolve(result.response);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	},
  	postService({ dispatch , commit , state} , {data,urlParameter,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$post(`${process.env.baseUrl}${urlParameter}` , data , {'headers': {'Content-Type':'application/json','Authorization':'Bearer ' + token}})
  				.then(response => {
				      return response;
				  })
				  .catch(error => {
					 return false;
				  });

  				resolve(result);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	},
  	uploadImage({ dispatch , commit , state} , {data,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$post(`${process.env.baseUrl}/api/v1/image/upload` , data , {'headers': {'Authorization':'Bearer ' + state.token}})
  				.then(response => {
				      return response;
				  })
				  .catch(error => {
					 return false;
				  });

  				resolve(result);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	},
  	uploadImageCustomer({ dispatch , commit , state} , {data,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$post(`${process.env.baseUrl}/api/v1/image/uploadCustomer` , data , {'headers': {'Authorization':'Bearer ' + state.token}})
  				.then(response => {
				      return response;
				  })
				  .catch(error => {
					 return false;
				  });

  				resolve(result);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	}

}