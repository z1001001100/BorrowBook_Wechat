<template>
	<view>
		<!-- 搜索栏 -->
		<form @submit="confirmbut">
			<view class="cu-bar search bg-white" >
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input  :adjust-position="false" type="text" placeholder="搜索题名、作者"
					 name="content" confirm-type="search" @confirm="confirm" :value="content"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" form-type="submit">搜索</button>
				</view>
			</view>
		</form>
		
		<!-- 结果渲染 -->
		<form class="item" v-for="(item, index) in Blist" :key="index" @submit="formSubmit(item.isbn)">
			<uni-card class="flex" :title="item.bname" :extra="item.bauthor" style="margin: 0;">
				<view class="flex ">
					<view class="flex flex-sub" >
						<image class="card_img" :src="item.bimgPath" mode="aspectFit"></image>
					</view>
					<view class="flex flex-treble flex-direction ">
						<view class="flex " style="">
							<view class="flex-sub" style="">
								出版社：
							</view>
							<view class="flex-twice" style="">
								{{item.bpublishingHouse}}
							</view>
						</view>
						<view class="flex " style="">
							<view class="flex-sub" style="">
								地点&索书号：
							</view>
							<view class="flex-twice" style="">
								{{item.location}}:{{item.callNumber}}
							</view>
						</view>
						<view class="flex justify-between" style="">
							<view class="flex-sub" style="">
								库存：
							</view>
							<view class="flex-twice" style="">
								{{item.breserve}}/{{item.btotal}}
							</view>
						</view>
					</view>
					<!-- <view class="flex-sub flex  align-center" style="flex-direction: column-reverse; ">
						<button class="cu-btn line-blue around " :disabled="item.isRenew" form-type="submit">{{item.isRenew>0 ? '已续借' : '续借'}}</button>
					</view> -->
				</view>
			</uni-card>
		</form>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				Blist: [],
				content: ""
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'skey']),
		},
		methods: {
			relist(_self,text){
				uni.request({
					url:'http://192.168.31.8:8081/searchBook',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						content: text,
						skey: _self.skey
					},
					success: (res) => {
						if(res.data.status == 200) {
							
							for (let i = 0; i <= _self.Blist.length; i++){
								_self.Blist.pop()
							}
							for(let i = 0; i < res.data.data.length; i++){
								
								_self.Blist.push(res.data.data[i])
							}
							console.log(_self.Blist);
						}
					}
				})	
			},
			confirm(e){
			    var that=this;
			    var discountName=e.detail.value['search - input'] ?e.detail.value['search - input'] : e.detail.value 
			    console.log('e.detail.value', discountName)
				that.$options.methods.relist(that,discountName)
			  },
			confirmbut(res){
				var that=this;
				console.log(res.detail.value.content);
				that.$options.methods.relist(that,res.detail.value.content)
				},
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.content))
		    console.log(item); //打印出上个页面传递的参数。
		    var _self = this;
			this.content = item;
		    _self.$options.methods.relist(_self,item);
		    }
	}
</script>

<style>
.card_img {
		width: 120rpx;
		height: 60px;
		
		/* color: #007AFF; */
	}
	
</style>
