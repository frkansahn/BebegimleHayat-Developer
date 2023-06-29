export default function ({ store, redirect, route }) {
    store.dispatch('nuxtServerInit').then(response => {
      if (!store.state.adminLoggedIn) {
        const path = encodeURIComponent(route.path);
        return redirect(`/admin/login?r=${path}`);
      }
    })
    
  }