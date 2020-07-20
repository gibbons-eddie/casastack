import cookie from 'js-cookie'
import Router from 'next/router'
//import User from '../models/userModel'
import parseCookies from 'nookies'

export default function handleLogin(token) {
    cookie.set('userToken', token);
    
    //console.log();
    Router.push('/profile')
}