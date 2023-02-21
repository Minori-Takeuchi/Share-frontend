export default function ({
    store,
    route,
    redirect
}) {
    if (!store.state.user && route.name !== 'login' && route.name !== 'register') {
        redirect('/login')
    }
}
