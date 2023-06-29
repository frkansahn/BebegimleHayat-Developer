export default function ({ store, redirect }) {
    store.dispatch('customer/nuxtServerInit').then(response => {
      if (store.state.customer.userLoggedIn) {
        return redirect('/')
      }
    });
    
  }