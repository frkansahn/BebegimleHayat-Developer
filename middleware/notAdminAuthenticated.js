export default function ({ store, redirect }) {
    store.dispatch('nuxtServerInit').then(response => {
      if (store.state.adminLoggedIn) {
        return redirect('/admin')
      }
    })
  }