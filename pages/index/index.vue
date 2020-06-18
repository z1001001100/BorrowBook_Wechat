<template>
	
	<view class="">
		<form @submit="confirmbut">
			<view class="cu-bar search bg-white" >
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input  :adjust-position="false" type="text" placeholder="搜索题名、作者"
					 name="content" confirm-type="search" @confirm="confirm"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" form-type="submit">搜索</button>
				</view>
			</view>
		</form>
		
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true" :duration="1000">
			<form v-for="(item, index) in Slist" :key="index">
				<swiper-item>
					<image class="img1 boxs" :src="item.articleImg"
					 mode="scaleToFill" @click="click(item.articleId)"></image>
				</swiper-item>
			</form>
		</swiper>
		
		
		<view @click="change">
			<uni-collapse >
				<uni-collapse-item :disabled="isdisablecol" title="已借清单">
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
											<!-- {{item.isOverdue>0 ? '已过期' : '未到期'}} -->
											<view v-if="item.isOverdue==0" class="">
												未过期
											</view>
											<view v-if="item.isOverdue==1" class="text-red">
												已过期
											</view>
										</view>
									</view>
								</view>
								<view class="flex-sub flex  align-center" style="flex-direction: column-reverse; ">
									<view v-if="item.isOverdue == 1">
										<button class="cu-btn line-blue around " :disabled="item.isOverdue" form-type="submit">已过期</button>
									</view>
									<view v-else>
										<button class="cu-btn line-blue around " :disabled="item.isRenew" form-type="submit">{{item.isRenew>0 ? '已续借' : '续借'}}</button>
									</view>
								</view>
							</view>
						</uni-card>
					</form>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {
		mapState
	} from 'vuex';


	export default {
		
		data() {
			return {
				Rlist: [],
				Blist: [],
				Slist: [],
			}
		},
		onLoad: function() {
			var _self = this
			//获取轮播图
			uni.request({
				url:'http://192.168.31.8:8081/getArticle',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
				},
				success: res => {
					console.log(res);
					console.log(res.data.data.length);
					_self.Slist = []
					for(let i = 0; i < res.data.data.length; i++){
						_self.Slist.push(res.data.data[i])
					}
					
				},
			})


		},

		computed: {
			...mapState(['hasLogin', 'userInfo', 'skey']),
			isdisablecol: function() {
				return !this.hasLogin
			},
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				var timer1 = year + '-' + month + '-' + day;
				console.log("time1" + timer);
				console.log("date" + date);
				return timer1;
			},


		},

		

		onShow() {
			// 未登录
			if (!this.hasLogin) {
				uni.showModal({
					title: "未登录",
					content: "是否现在登录?",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateTo({
								url: "../wxlogin/wxlogin"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
			//已登录
			else{
				var _self = this;
				_self.$options.methods.relist(_self);
			}
		},
		
		methods: {
			confirm:function(e){
			    var that=this;
			    var discountName=e.detail.value['search - input'] ?e.detail.value['search - input'] : e.detail.value 
			    console.log('e.detail.value', discountName)
				that.$options.methods.searchBook(discountName)
			  },
			confirmbut(res){
				var that=this;
				console.log(res.detail.value.content);
				that.$options.methods.searchBook(res.detail.value.content)
				},
			searchBook(content){
				console.log("search",content);
				var text = JSON.stringify(content);
				uni.navigateTo({
					url: '../search_result/search_result?content='+ encodeURIComponent(text),
				})
				console.log("aa");
			},
			relist(_self){
				uni.request({
					
					url:'http://192.168.31.8:8081/getBorrowingRecord',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						skey: _self.skey
					},
					success: res => {
						console.log(res);
						console.log(res.data.length);
						_self.Rlist = []
						for(let i = 0; i < res.data.length; i++){
							_self.Rlist.push(res.data[i])
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},

			change() {
				// 未登录
				if (!this.hasLogin) {
					uni.showModal({
						title: "未登录",
						content: "是否现在登录?",
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: "../wxlogin/wxlogin"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
					return
				} else {
					// 已经登录，加载数据
					uni.showLoading({
						title: "Loding---"
					})
					var _self = this;
					_self.$options.methods.relist(_self);
					
					uni.hideLoading()
				}
			},
			click(e) {
				console.log(e);
				uni.navigateTo({
					url: '../article/article?articleId='+e
				})
			},
			click1() {
				console.log("click1!");
			},

			toLogin() {
				console.log(this.hasLogin);
				if (!this.hasLogin) {
					uni.switchTab({
						url: '../user/user'
					});
				}
			},

			formSubmit(isbn) {
				var _self = this;
				uni.showLoading()
				uni.request({
					url: 'http://192.168.31.8:8081/renew',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						isbn: isbn,
						skey: this.skey
						
					},
					success(res) {
						if (res != null) {
							console.log("成功");
							console.log(res);
							uni.showToast({
								duration:2000
							})
						} else {
							console.log('服务器异常')
						}
					},
					fail(error) {
						console.log(error)
					},
					complete() {
						_self.$options.methods.relist(_self);
						uni.hideLoading()
					}
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		/* color: #8f8f94; */
		color: #242424;
		width: 30%;
	}

	.coll {
		display: flex;
		width: 100%;
	}

	.header {
		padding-top: 0;
		margin-top: 0;
	}

	.card_img {
		width: 100%;
		height: 60px;
		/* color: #007AFF; */

	}

	.img1 {
		/* justify-content: center; */
		margin: 0px 40rpx;
		width: 90%;
		height: 95%;
	}

	.img13 {
		width: 25%;
		height: auto;
	}

	.boxs {
		box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.1);

	}

	.square-color {
		width: 300rpx;
		height: 200px;
		background-color: #007AFF;
	}
</style>
