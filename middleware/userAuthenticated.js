export default function ({ store, redirect, route }) {
    store.dispatch('customer/nuxtServerInit').then(response => {
      if (!store.state.customer.userLoggedIn) {
        const path = encodeURIComponent(route.path);
        return redirect(`/uye-giris?r=${path}`);
      }
    })
    .catch(err => {
      if (!store.state.customer.userLoggedIn) {
        const path = encodeURIComponent(route.path);
        return redirect(`/uye-giris?r=${path}`);
      }
    })
    
  }