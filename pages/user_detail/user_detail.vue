<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">姓名</view>
			<view class="picker">
				{{student.sname}}
			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">学号</view>
			<view class="picker ">
				{{student.sid}}
			</view>
		</view>
		<view class="cu-form-group " @click="update_mail">
			<view class="title">邮箱</view>
			<view class="picker text-gray">
				{{student.smail}} >
			</view>
		</view>
		<view class="cu-form-group " @click="update_phone">
			<view class="title">手机</view>
			<view class="picker text-gray">
				{{student.sphone}} >
			</view>
		</view>
		<view class="cu-form-group margin-top" @click="updatePwd">
			<view class="title">修改密码</view>
			<view class="picker text-gray">
				>
			</view>
		</view>
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
		    ...mapState(['hasLogin', 'userInfo', 'student'])			
		},
		methods: {
			updatePwd() {
				uni.navigateTo({
					url: '../update_pwd/update_pwd'
				})
			},
			update_mail() {
				uni.navigateTo({
					url: '../update_mail/update_mail'
				})
			},
			update_phone() {
				uni.navigateTo({
					url: '../update_phone/update_phone'
				})
			}
			
		}
	}
</script>

<style>

</style>
