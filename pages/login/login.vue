<template>
	<view>
		<form @submit="formSubmit" class="">
			
			<view class="cu-form-group solid-top">
			    <view class="title text-center">input</view>
			    <input class="uni-input" name="sid" placeholder="学号" />
			</view>
			<view class="cu-form-group solid-top solid-bottom">
			    <view class="title">password</view>
			    <input class="uni-input" name="pwd" placeholder="密码" :password="isPassword" />
				<text :class="computed_show" @click="show_switch"></text>
			</view>
			<button class="line-green" form-type="submit"   :disabled="logining">绑定学号并登陆</button>
			
		</form>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				isPassword: true
			}
		},
		computed: {
			...mapState(['userInfo']),
			
			computed_show() {
				return this.isPassword ? 'cuIcon-attention' : 'cuIcon-attentionfill'
			},
			sid: {	get() {		return this.$store.state.sid;	},	set(val) {		this.$store.state.sid = val	}},
			skey: {	get() {		return this.$store.state.skey;	},	set(val) {		this.$store.state.skey = val	}},
			student: {  get() {	return this.$store.state.student;},set(val) {	this.$store.state.student = val}}
		},
		methods: {
			show_switch() {
				this.isPassword = !this.isPassword
			},
			formSubmit: function(e) {
				let that = this
			    console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			    var formdata = e.detail.value
			    
				uni.request({
					url:'http://192.168.31.8:8081/login',
					method:'POST',
					header: {
					                  'content-type': 'application/x-www-form-urlencoded'
					                },
					data:{
					    sid: formdata.sid,
						pwd: formdata.pwd,
						skey: that.skey
					},
					success(res) {
					    if(res.data.status == 200){
							console.log(res.data.data);
							that.student=res.data.data
							uni.navigateBack({delta:2})
							// if(res.data.status!= 200){
							// 	console.log(res.data.msg);
							// 	uni.showModal({
							// 		title:"错误",
							// 		content:"账号或密码错误",
							// 		success: function (res) {
							// 		    if (res.confirm) {
							// 		        console.log('用户点击确定');
											
							// 		    } else if (res.cancel) {
							// 		        console.log('用户点击取消');
							// 		    }
							// 		}
							// 	})
							// }
					    }else{
					        console.log('服务器异常')
					    }
					},
					fail(error) {
					    console.log(error)
					}
					
				})
			},
		}
	}
</script>

<style>
.cu-form-group .title {
		min-width: calc(4em + 20px);
	}
</style>
