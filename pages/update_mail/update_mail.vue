<template>
	<view>
		<form @submit="mailSubmit" class="">
			<view class="cu-form-group solid-top">
				<view class="title text-center">邮箱</view>
				<input type="email" class="uni-input" name="smail" placeholder="邮箱" :value="mail" 
					pattern="^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"/>
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
			
			mail: {
				get() {	return this.$store.state.student.smail;},
				set(val) {	this.$store.state.student.smail = val}
			},
			
			
		},
		methods: {
			
			mailSubmit(res1) {
				console.log("mail="+res1.detail.value.smail);
				console.log("skey="+this.skey);
				//校验邮箱格式
				var RegExp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (!RegExp.test(res1.detail.value.smail)) {
					uni.showToast({title: '邮箱格式错误',icon: 'none'});
				}
				else{
				//保存到store
				this.mail = res1.detail.value.smail
				console.log("this.mail+"+this.mail);
				//保存到数据库
				uni.request({
					url: 'http://192.168.31.8:8081/updateMail',
					method:'POST',
					header: {
					                  'content-type': 'application/x-www-form-urlencoded'
					                },
					data: {
						mail: res1.detail.value.smail,
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
