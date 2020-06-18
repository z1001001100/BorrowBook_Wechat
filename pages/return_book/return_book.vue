<template>
	<view>
		<uniSection title="使用说明" type="line"/>
		<view class="content">
			<view>1、点击扫描按钮，打开微信扫码功能。</view>
			<view>2、扫描归还点二维码</view>
			<view>3、扫描借阅书籍的ISBN条形码。</view>
			<view>4、确认归还书籍</view>
			<view>5、成功还书</view>
		</view>
		<button type="default" class="bg-green" :disabled="getCode" @click="checkCode">扫描归还点二维码</button>
		<view v-if="getCode" class="">
			<button type="default" class="bg-green"  @click="checkBook">扫描归还图书ISBN</button>
		</view>
		<view v-if="getBook" class="">
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
									{{item.isOverdue>0 ? '已过期' : '未到期'}}
								</view>
							</view>
						</view>
						<view class="flex-sub flex  align-center" style="flex-direction: column-reverse; ">
							<!-- <button class="cu-btn line-blue around "  form-type="submit">归还</button> -->
						</view>
					</view>
				</uni-card>
			</form>
			<button type="default" class="bg-green" @click="submitReturn">一键还书</button>
			<view class="center">
				逾期记录：{{OverdueCount}}
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uniCollapse from '../../components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue';
	import uniSection from '../../components/uni-section/uni-section.vue';
	export default {
		data() {
			return {
				getBook: false,//找到书籍
				getCode: false,//校验二维码成功
				Rlist: [],//记录实体list
				Blist: [],//书编号list
				code: '',//二维码信息
				OverdueCount: 0 //过期记录个数
			}
		},
		computed:{
			...mapState([ 'skey','student']),
			student: {
				get() {
					return this.$store.state.student;
				},
				set(val) {
					this.$store.state.student = val
				}
			}
		},
		onShow() {
			var _self = this;
			// _self.$options.methods.rellist(_self)
		},
		
		methods: {
			checkCode(){
				var _self = this;
				//扫码，初步校验，传到后台校验
				uni.scanCode({
					scanType: 'qrCode',
					success(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.request({
							url: 'http://192.168.31.8:8081/checkCode',
							method: "POST",
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							data: {
								code: res.result
							},
							success(res1) {
								console.log(res1.data);
								if(res1.data.msg=="OK"){
									_self.getCode= true;
									console.log("res.result="+res.result);
									_self.code =res.result;
									uni.showToast({
										duration: 1000
									})
								}
								else{
									uni.showToast({
										icon: "none",
										title: "二维码错误"
									})
								}
							}
						})
					}
				})
			},
			checkBook(){
				var _self = this
				//查找是否有该书未还记录
				//验证条形码
				uni.scanCode({
				    scanType: 'barCode',
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						//检验是否为isbn
						var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;
						if(regex.test(res.result)){
							// 进入借书流程
							_self.$options.methods.checkReturn(_self,res.result);
						}else{
							uni.showToast({
								icon: "none",
								title:"无法识别此条码"
							})
						}
				    }
					
				})
			},
			checkReturn(_self,isbn){
				uni.request({
					url: 'http://192.168.31.8:8081/checkReturn',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						isbn: isbn,
						skey: _self.skey
					},
					success(res) {
						console.log(res.data);
						if(res.data.msg=="OK"){
							let flag = 0;
							//检查重复
							for(let i=0 ;i<_self.Blist.length ;i++){
								if(_self.Blist[i] == res.data.data.isbn){
									flag = flag + 1;
									}
								console.log(flag);
							}
							if(flag == 0){
								_self.Rlist.push(res.data.data);
								_self.getBook = true;
								_self.Blist.push(res.data.data.isbn)
								console.log("_self.Rlist="+_self.Rlist);
								console.log("_self.Blist="+_self.Blist);
								 if(res.data.data.isOverdue == 1){
									 _self.OverdueCount ++;
									 uni.showToast({
									 	icon:"none",
									 	title:"该图书已经逾期"
									 })
								 }
							}else{
								console.log("flag="+flag); 
								uni.showToast({
									icon:"none",
									title:"该图书已在归还列表中"
								})
							}
						}else{
							uni.showToast({
								icon:"none",
								title: res.data.msg
							})
						}
					}
				})
			},
			submitReturn(){
				var _self = this
				//提交blist
				uni.request({
					url: 'http://192.168.31.8:8081/submitReturn',
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						Blist: _self.Blist,
						skey: _self.skey,
						code: _self.code
					},
					success(res) {
						console.log("res.data="+res.data);
						if(res.data.msg=="OK"){
							//更新积分
							//获得返回学生
							_self.student=res.data.data
							//刷新当前
							_self.getBook = false;
							_self.Blist = [];
							_self.Rlist = [];
							//显示成功
							uni.showToast()
							if(_self.OverdueCount > 0){
								uni.showModal({
									title: "您有借阅的图书已经逾期",
									content: "需要缴纳"+_self.OverdueCount+"元",
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
											// uni.navigateTo({
											// 	url: ""
											// })
											console.log("缴纳");
										} 
									}
								})
							}
						}else{
							uni.showToast({
								icon:"none",
								title:res.data.msg
							})
							//刷新当前
							_self.getBook = false;
							_self.Blist = [];
							_self.Rlist = [];
						}
					}
				})
			},
			
		}
	}
</script>

<style>
.card_img {
		width: 100%;
		height: 60px;
		/* color: #007AFF; */

	}
</style>
