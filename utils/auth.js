import cookie from 'js-cookie'
import Router from 'next/router'

export default function handleLogin(token) {
    cookie.set('userToken', token);
    Router.push('/profile')
}