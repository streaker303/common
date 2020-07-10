import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 const VueRouterReplace = Router.prototype.replace;
	Router.prototype.replace = function replace (to) {
	  return VueRouterReplace.call(this, to).catch(err => err)
	}
const errorPage = () =>
	import('@/pages/error.vue');
const home = () =>
	import('@/pages/home.vue');
const login = () =>
	import('@/pages/login.vue');
const entrance = () =>
	import('@/pages/entrance.vue');

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/error',
			name: 'error',
			component: errorPage,
			meta: {
				title: '系统出错了'
			}
		},
		/*{
			path: '/entrance',
			name: 'entrance',
			component: entrance,
			meta: {
				title: '积极安全感知平台'
			}
		},*/
		{
			path: '/home',
			name: 'home',
			component: home,
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				title: '积极安全感知平台登录'
			}
		},
	]
})
