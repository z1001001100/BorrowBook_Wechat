<template>
	<view>
		<uni-collapse >
			<uni-collapse-item :disabled="isdisablecol" open="" title="借阅清单">
				<form class="item" v-for="(item, index) in Rlist" :key="index" @submit="formSubmit(item.isbn)">
					<uni-card class="flex" :title="item.bname" :extra="item.bauthor" style="margin: 0;">
						<view class="flex ">
							<view class="flex flex-sub ">
								<image class="card_img" :src="item.bimgPath" mode="aspectFit"></image>
							</view>
							<view class="flex flex-twice flex-direction ">
								<view class="flex " style="">
									<view class="flex-sub" style="">
										借阅日期：
									</view>
									<view class="flex-sub" style="">
										{{item.borrowDate}}
									</view>
								</view>
								<view class="flex " style="">
									<view class="flex-sub" style="">
										应还日期：
									</view>
									<view class="flex-sub" style="">
										{{item.returnDate}}
									</view>
								</view>
								<view class="flex justify-between" style="">
									<view class="flex-sub" style="">
										借阅状态：
									</view>
									<view class="flex-sub" style="">
										<view v-if="item.isAbnormal" class="text-red">异常</view>
										<view v-else-if="item.isReturn">已归还</view>
										<view v-else>{{item.isOverdue>0 ? '已过期' : '未到期'}}</view>
									</view>
								</view>
							</view>
							<view class="flex-sub flex  align-center" style="flex-direction: column-reverse; ">
							</view>
						</view>
					</uni-card>
				</form>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		
		data() {
			return {
				Rlist: [],
				
			}
		},
		computed: {
			...mapState(['skey'])
		},
		onLoad:function(e){
			var _self = this;
			this.$options.methods.relist(_self)
		},
		methods: {
			relist(_self){
				uni.request({
					
					url:'http://192.168.31.8:8081/getAllRecord',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						skey: _self.skey
					},
					success: res => {
						console.log(res);
						console.log(res.data.data.length);
						_self.Rlist = []
						for(let i = 0; i < res.data.data.length; i++){
							_self.Rlist.push(res.data.data[i])
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
.card_img {
	width: 100%;
	height: 60px;
}
</style>
