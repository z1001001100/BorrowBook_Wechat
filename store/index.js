import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {	//全局变量
		
		forcedLogin: false,		//强制登录？
		hasLogin: false, 		//已经登录？
		userName: ""	
	},
	mutations: {	//全局方法
		login(state, userName) {	//login时获取全局变量，传入用户名
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {		//logout时 设用户名为空,登录状态为空
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store
