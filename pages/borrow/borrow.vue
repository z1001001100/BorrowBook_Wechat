<template>
	<view>
		<view class="">
			<uni-section title="使用说明" type="line"/>
			<view class="text-grey text-lg">
				<view>1、点击扫描按钮，打开微信扫码功能。</view>
				<view>2、扫描借阅书籍的ISBN条形码。</view>
			</view>
		</view>
		<view class="">
			<button class=" bg-green" @click="scan">扫描书籍条形码</button>
		</view>
		<view>{{book.isbn}}</view>
		
		<view v-if="getBook" class="">
			<uni-card class="flex" :title="book.bname" :extra="book.bauthor" style="margin: 0;">
				<view class="flex ">
					<view class="flex flex-sub" >
						<image class="card_img" :src="book.bimgPath" mode="aspectFit"></image>
					</view>
					<view class="flex flex-treble flex-direction ">
						<view class="flex " style="">
							<view class="flex-sub" style="">
								出版社：
							</view>
							<view class="flex-twice" style="">
								{{book.bpublishingHouse}}
							</view>
						</view>
						<view class="flex " style="">
							<view class="flex-sub" style="">
								地点&索书号：
							</view>
							<view class="flex-twice" style="">
								{{book.location}}:{{book.callNumber}}
							</view>
						</view>
						<view class="flex justify-between" style="">
							<view class="flex-sub" style="">
								库存：
							</view>
							<view class="flex-twice" style="">
								{{book.breserve}}/{{book.btotal}}
							</view>
						</view>
					</view>
				</view>
			</uni-card>
			<button type="default" class="bg-green" @click="submitBorrow">确认借书</button>
		</view>
	</view>
</template>

<script>
	import uniSection from '../../components/uni-section/uni-section.vue';
	import uniCollapse from '../../components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue';
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				getBook: false,
				book: {}
			}
		},
		computed: {
			...mapState([ 'skey']),
		},
		methods: {
			scan() {
				var _self = this
				uni.scanCode({
				    scanType: 'barCode',
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						//检验是否为isbn
						var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
						if(regex.test(res.result)){
							// 进入借书流程
							_self.$options.methods.borrow(_self,res.result);
						}else{
							uni.showToast({
								icon: "none",
								title:"无法识别此条码"
							})
						}
				    }
				})
			},
			borrow(_self,isbn){
				_self.getBook = false
				uni.request({
					url: 'http://192.168.31.8:8081/checkBorrow',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						isbn: isbn,
						skey: _self.skey
					},
					success(res) {
						console.log(res);
						console.log(res.data);
						console.log(res.message);
						// _self.book.pop()
						if(res.data.msg == "OK"){
							_self.book=res.data.data
							_self.getBook = true
						}else{
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
						
					}
				})
			},
			submitBorrow(){
				var _self = this
				uni.request({
					url: 'http://192.168.31.8:8081/submitBorrow',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						isbn: this.book.isbn,
						skey: this.skey
						
					},
					success(res) {
						console.log(res);
						if(res.data.msg == "OK"){
							uni.showToast()
							//清空页面
							_self.getBook=false
							_self.book={}
						}
					}
				})
				
			}
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
 