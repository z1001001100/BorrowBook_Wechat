<template>
	<view>
		<view class="flex my-basicMsg-top  bg-white" @click="clickname">
		    <image class="flex-sub image" mode="aspectFit" :src="userInfo.avatarUrl || '/static/img/user_select.png'"></image>
			<view class="flex-twice  ">
				<view class="loginnow   " >
					{{hasLogin ? student.sname || '未设置昵称' : '立即登录'}}
				</view>
				<view v-if="hasLogin" class="flex">
					<view class="text-sm">积分:</view>
					<view class="text-df">{{student.stotalIntegral}}</view>
				</view>
				
			</view>
			<view class="my-basicMsg-top-r flex-sub flex" style="flex-direction: column-reverse;">
				<text>详细信息></text>
			</view> 
		</view>
		<view v-if="hasLogin" class="">
			<!-- <navigator url="../borrow/borrow">借书</navigator> -->
			<button class='cu-btn line-green shadow block margin-tb-sm lg '  @click="toBorrow">借书</button>
			<button class='cu-btn line-green shadow block margin-tb-sm lg '  @click="toReturn">还书</button>
			<button class='cu-btn line-green shadow block margin-tb-sm lg '  @click="toRecord">借书记录</button>
			<button class='cu-btn line-green shadow block margin-tb-sm lg '  @click="toBarcode">二维码</button>
		</view>
		
		
	</view>
	
</template>

<script>
	import { mapMutations } from 'vuex';
	import { mapState } from 'vuex';
	import uniSection from "../../components/uni-section/uni-section.vue"
	export default {
	    data() {
	        return {
	            logining: false
	        };
	    },
	    onLoad() {console.log("onload");},
		onReady() {
			
		},
		
		computed: {
		    ...mapState(['hasLogin', 'userInfo', 'student', 'skey'])
		},
	    methods: {
			toBorrow(){
				uni.navigateTo({
					url:'../borrow/borrow'
				})
			},
			check(){
				if(!this.hasLogin) {
					uni.navigateTo({
						url: '../wxlogin/wxlogin'
					})
				}
			},
			getlocat(){
				uni.getLocation({
					success: function (res) {
					        console.log('当前位置的经度：' + res.longitude);
					        console.log('当前位置的纬度：' + res.latitude);
					    }
				})
			},
			scan() {
				uni.scanCode({
				    scanType: 'barCode',
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				})
			},
	        wxLogin(e) {
	        const that = this;
	        that.logining = true;
	        let userInfo = e.detail.userInfo;
	        uni.login({
	            provider:"weixin",
	            success:(login_res => {
	                let code = login_res.code;
	                uni.getUserInfo({
	                    success(info_res) {
							console.log("info_res");
	                        console.log(info_res)
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
	                                    that.$store.commit('login',userInfo);
	                                    // uni.setStorageSync("userInfo",userInfo);
	                                    // uni.setStorageSync("skey", res.data.data);
	                                }else{
	                                    console.log('服务器异常')
	                                }
	                            },
	                            fail(error) {
	                                console.log(error)
	                            }
	                        })
	                        uni.hideLoading()
	                        uni.navigateBack()
	                    }
	                })
	                
	            })
	            })
	        },
	    
			clickname() {
				//未登录
				if(!this.hasLogin) {
					uni.navigateTo({
						url: '../wxlogin/wxlogin'
					})
				}
				//已经登录
				else {
					uni.navigateTo({
						//信息详情
						url: '../user_detail/user_detail'
					})
				}
			},
			
			toReturn(){
				uni.navigateTo({
					url: '../return_book/return_book'
				})
			},
			
			toRecord(){
				console.log(this.skey);
				uni.navigateTo({
					url: '../record/record'
				})
			},
			toBarcode(){
				uni.navigateTo({
					url: '../barcode/barcode'
				})
			}
		}
	};
</script>


<style lang="scss">
.logo{
	// width: 100%;
	// width: 100%;
	// height: 200rpx;
}
.my-basicMsg-top{
	padding-top: 10px;
	padding-bottom: 10px;
	padding-left: 15rpx;
	height: 100px;
	
}
.image{
	height: 80%;
}
.loginnow {
	font-size: 30px;
	
}
.my-basicMsg-top-r {
	padding-bottom: 20px;
}
</style>
​


