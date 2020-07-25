import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token) {
    cookie.set('token', token); // cookie is named token
    Router.push('/profile');
}

export function redirectUser(ctx, location) { // location = path to redirect user to
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end(); // redirect on server
    } else {
        Router.push(location); // since user is authenticated, the route is unlocked for them
    }
}

export function handleLogout() {
    cookie.remove('token');
    Router.push('/');
}
