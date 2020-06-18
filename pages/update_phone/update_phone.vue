<template>
	<view>
		<form @submit="phoneSubmit" class="">
			<view class="cu-form-group solid-top">
				<view class="title text-center">手机</view>
				<input type="number" class="uni-input" name="phone" placeholder="请填写正确的手机号" :value="phone" />
			</view>
			<button class="bg-green sm" form-type="submit" :disabled="logining">保存</button>
		</form>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	
	export default {
		
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['skey']),
			
			phone: {
				get() {	return this.$store.state.student.sphone;},
				set(val) {	this.$store.state.student.sphone = val}
			},
			
			
		},
		methods: {
			
			phoneSubmit(res1) {
				console.log("phone="+res1.detail.value.phone);
				console.log("skey="+this.skey);
				//校验手机号格式
				var RegExp = /^1\d{10}$/;
				if (!RegExp.test(res1.detail.value.phone)) {
					uni.showToast({title: '手机号格式错误',icon: 'none'});
				}
				else{
				//保存到store
				this.phone = res1.detail.value.phone
				console.log("this.phone+"+this.phone);
				//保存到数据库
				uni.request({
					url: 'http://192.168.31.8:8081/updatePhone',
					method:'POST',
					header: {
					                  'content-type': 'application/x-www-form-urlencoded'
					                },
					data: {
						phone: res1.detail.value.phone,
						skey: this.skey
					},
					success: (res) => {
						if(res.data.status == 200) {
							console.log("data+"+res.data);
							console.log("msg="+res.data.msg);
							uni.navigateBack()
						}
					}
				})
				}
			}
		}
	}
</script>

<style>

</style>
