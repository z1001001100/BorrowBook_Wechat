<template>
    <view class="container flex-direction">
		<view class="text-center text-sl padding bg-white solid-bottom">
			登录
		</view>
        
		<button class="cu-btn line-green lg round padding" style="width: 100%;" open-type="getUserInfo" @getuserinfo="wxLogin" :disabled="logining">微信授权登录</button>
    </view>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
var self =this;
export default {
    data() {
        return {
            logining: false
        };
    },
	computed: {
		//一个按钮调用另一个按钮=》一个方法调用另一个方法=》。。。尝试中
		...mapState(['hasLogin', 'userInfo', 'student']),
		skey: {
			get() {
				return this.$store.state.skey;
			},
			set(val) {
				this.$store.state.skey = val
			}
		},
		sid: {
			get() {
				return this.$store.state.sid;
			},
			set(val) {
				this.$store.state.sid = val
			}
		},
		student: {
			get() {
				return this.$store.state.student;
			},
			set(val) {
				this.$store.state.student = val
			}
		}
	},
	created(){
		self = this;
	 },
    onLoad() {},
    methods: {
		wxLogin: function(e) {
		const that = this;
		// console.log(this.logining);
		self.logining = true;
		// console.log(self.logining);
		let userInfo = e.detail.userInfo;
		uni.login({
		    provider:"weixin",
		    success:(login_res => {
		        let code = login_res.code;
		        uni.getUserInfo({
		            success(info_res) {
						// console.log("info_res");
		    //             console.log(info_res)
		                uni.request({
		                    url:'http://192.168.31.8:8081/wxlogin',
		                    method:"POST",
		                    header: {
		                                      'content-type': 'application/x-www-form-urlencoded'
		                                    },
		                    data:{
		                        code : code,
		                        rawData : info_res.rawData
								
		                    },
		                    success(res) {
		                        if(res.data.status == 200){
									// console.log("suerInfo"+userInfo.city);
		                            self.$store.commit('login',userInfo);
									// uni.setStorageSync("userInfo",userInfo);
									// uni.setStorage("skey", res.data.data);
									self.skey = res.data.msg
									console.log("msg="+res.data.msg);
									console.log("data="+JSON.stringify(res.data));
									if(res.data.data!=null) {
										console.log("data="+res.data.data);
										self.student = res.data.data
										uni.navigateBack()
										// uni.switchTab({
										// 	url: '../user/user'
										// })
									}else{
										uni.navigateTo({
											url:'../login/login'
										})
									}
									// 1600502101
									// console.log("here");
									// uni.getStorage({
									// 	key: 'skey',
									// 	success: function(res) {
									// 		// console.log("skye=");
									// 		console.log(res.data)
									// 	}
									// })
									
		                        }else{
		                            console.log('服务器异常')
		                        }
		                    },
		                    fail(error) {
		                        console.log(error)
		                    }
		                })
		                uni.hideLoading()
		                // uni.navigateBack()
						self.logining=false;
		            }
		        })
		        
		    })
		    })
		},
		
		
	}
};
</script>
​
<style lang="scss">

</style>