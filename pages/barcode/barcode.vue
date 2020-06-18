<template>
	<view class="content">
		<view class="flex align-center justify-center code" >
			<tkiBarcode cid="code128" :loadMake="false" :opations="opations" :onval="true" format="code128" :val="student.sid" ref="code128" @result="code128" />
		</view>
		<view class="flex align-center justify-center">
			此条形码请在进入图书馆时使用
		</view>
	</view>
</template>

<script>
	import tkiBarcode from "../../components/tki-barcode/tki-barcode.vue"
	import { mapState } from 'vuex'
	
	export default { 
		computed: {
			...mapState(['student']),
		},
		components: {tkiBarcode},
		data() {
			return {
				bar: ['code128'],
				opations: {
					// format: "CODE128",//选择要使用的条形码类型 微信支持的条码类型有 code128\code39\ena13\ean8\upc\itf14\
					width: 4,//设置条之间的宽度
					height: 120,//高度
					displayValue: true,//是否在条形码下方显示文字
					// text: "FB19A1650-100S",//覆盖显示的文本
					textAlign: "center",//设置文本的水平对齐方式
					textPosition: "bottom",//设置文本的垂直位置
					textMargin: 0,//设置条形码和文本之间的间距
					// fontSize: 24,//设置文本的大小
					// fontColor: "#0000ef",//设置文本的颜色
					// lineColor: "#0000ef",//设置条形码的颜色
					background: "#FFFFFF",//设置条形码的背景色
					margin: 0,//设置条形码周围的空白边距
					// marginTop: 10,//设置条形码周围的上边距
					// marginBottom: 20,//设置条形码周围的下边距
					// marginLeft: 30,//设置条形码周围的左边距
					// marginRight: 40,//设置条形码周围的右边距
					}
			}
		},
		methods: {
			code128(v) {
				// console.log('code128:', v)
			},
		},
		onLoad() {
			console.log(this.student.sid),
			this.$refs.code128._makeCode();
			// setTimeout(() => {
			// 	for (let index = 0; index < this.bar.length; index++) {
			// 		setTimeout(() => {
			// 			console.log(index)
			// 			this.$refs[this.bar[index]]._makeCode()
			// 		}, 1000 * index);
			// 	}
			// }, 1000);
		}
	}
</script>

<style>
.code{
	width: 100%;
	height: auto;
}
</style>
