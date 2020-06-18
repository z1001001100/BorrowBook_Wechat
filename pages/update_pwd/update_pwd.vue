<template>
	<view>
		<form @submit="checkPassword" class="">
			<view class="cu-form-group solid-top">
				<view class="title text-center">旧密码</view>
				<input type="" class="uni-input" name="oldpassword" placeholder="密码" :value="password" />
			</view>
			<view class="cu-form-group solid-top">
				<view class="title text-center">新密码</view>
				<input class="uni-input" name="newpassword" placeholder="请输入复杂密码" :password="isPassword" />
				<text :class="computed_show" @click="show_switch"></text>
			</view>
			<view class="cu-form-group ">
				<view class="title text-center">确认密码</view>
				<input type="password" class="uni-input" name="password" placeholder="重复新密码"  />
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
				isPassword: true
			}
		},
		computed: {
			...mapState(['skey']),
			computed_show() {
				return this.isPassword ? 'cuIcon-attention' : 'cuIcon-attentionfill'
			},
			password: {
				get() {	return this.$store.state.student.spassword;},
				set(val) {	this.$store.state.student.spassword = val}
			},
			
			
		},
		methods: {
			show_switch() {
				this.isPassword = !this.isPassword
			},
			checkPassword(res1) {
				console.log("password="+res1.detail.value.password);
				console.log("skey="+this.skey);
				//检验旧密码
				if(res1.detail.value.oldpassword!=this.password) {
					uni.showToast({title: '旧密码错误，请校验',icon: 'none'});
					return
				}
				//校验密码格式
				var RegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if (!RegExp.test(res1.detail.value.password)) {
					uni.showToast({title: '请输入(6-16位)数字和字母组成的密码',icon: 'none'});
					return
				}
				//校验新旧密码
				if(res1.detail.value.newpassword!=res1.detail.value.password) {
					uni.showToast({title: '新密码不一致！',icon: 'none'});
					return
				}
				console.log("ok");
				// this.$options.methods.save()
				//保存到store
				this.password = res1.detail.value.password
				console.log("this.password+"+this.password);
				//保存到数据库
				uni.request({
					url: 'http://192.168.31.8:8081/updatePassword',
					method:'POST',
					header: {
					                  'content-type': 'application/x-www-form-urlencoded'
					                },
					data: {
						password: res1.detail.value.password,
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
			},
			save() {
				
			}
		}
	}
</script>

<style>

</style>
