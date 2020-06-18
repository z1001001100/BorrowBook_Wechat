<template>
	<view class="content">
		<jyf-parser :html="html" ref="article"></jyf-parser>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad:function(e){
			var _self = this
			uni.request({
				url: 'http://192.168.31.8:8081/getArticleById',
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: e.articleId
				},
				success(res) {
					console.log(res);
					uni.request({
						url: res.data,
						method: 'GET',
						success(res) {
							console.log(res);
							_self.$refs.article.setContent(res.data);
						}
					})
					
				}
			})
			
		}
	}
</script>

<style>
.content{
	padding: 10rpx;
	/* width: 95%; */
	flex-wrap:wrap;
}
.title{
	line-height: 2em;
	font-weight: 700;
	font-size: 38rpx;
}
.art-content{
	line-height: 2em;
	font-weight: 300;
	font-size: 20rpx;
}
</style>
