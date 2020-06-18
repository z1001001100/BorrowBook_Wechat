<template>
	<view class="content">
		<view class="title">
			{{title}}
		</view>
		<view class="art-content">
			<rich-text class="richText" :nodes="strings">
				{{strings}}
			</rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '致敬英烈，缅怀逝者——广药大下半旗哀悼抗疫牺牲烈士和逝世同胞',
				strings: '<p>4月4日，学校各校区（园）下半旗志哀，表达全校师生员工对抗击新冠肺炎疫情斗争牺牲烈士和逝世同胞的深切悼念。校党委书记刘晟、党委副书记巫宏星、副校长黎锦城和全体值班干部、留校生代表参加了大学城校园集体默哀活动。</p> <img width="375rpx" src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWQs1LAFqE7Fa2fKds4AfCFtaWBRbt3grrsPtnSQjaN94iaCZibN6soqcw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/> <p>上午10时，汽车、火车、舰船鸣笛、防空警报鸣响，大学城校园师生员工在国旗杆下列队肃立，以虔诚之心默哀三分钟，向抗击新冠肺炎疫情牺牲烈士和逝世同胞致敬并表达由衷怀念。在家师生通过及时收看央视新闻直播报道方式，就地默哀，把心中的悲伤转化为战胜疫情的坚定信念。学校各单位还结合实际，组织开展学习优秀传统文化、学习英模事迹、学习抗疫先进模范、网上向先贤先烈鞠躬献花、抒写感言寄语等系列哀悼活动。</p> <img width="375rpx" src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWlnXYeL03nlS0lq4H9dN2ZdRYRzveuMt3cZDyyYcOhHDaqEHzPhicib2A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/> <p>大学城校园集体默哀仪式后，与会人员向抗击新冠肺炎疫情斗争中因公殉职的校友王烁同志遗像献花。在刘晟书记的带领下，到场的师生员工依次在王烁同志的遗像前敬献鲜花，并三鞠躬。</p> <img width="375rpx" src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWfsXWwU7uDTMUzOfmiaNxjRCQEZR8ria5ulKibhKmNze5mI1SyKtAiblbMw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/> <p>王烁校友系我校流行病与卫生统计学专业2011届毕业研究生，毕业后任职于广东省职业病防治院，是国家流调排查和巡回督导队员、广东支援湖北荆州医疗队员。3月13日傍晚在走访查看社区疫情防控工作时不幸因公殉职，生命定格在36岁。至今，广药大人仍为这位优秀校友的突然离世感到沉痛与惋惜，时至清明这份哀思更是愈加强烈。斯人已去，风范长存。王烁校友不忘初心、牢记使命、无私奉献、精诚济世的精神将深深铭刻在每位广药大人的心中。</p> <img width="375rpx" src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWcBf07xKia0f4exicpXYBMMTQg5FbIgxl2VBHJuAriaFle3XpzsVWSJZRQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/> <p>附属第一医院举行哀悼活动</p> <img width="375rpx" src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWKhUeI7DfnRMEu8mM5kwwdCzc27hRUjat6dOwo3ibKws1MZZKNenXIMg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1&retryload=1"/>'
				// strings: '       <p>4月4日，学校各校区（园）下半旗志哀，表达全校师生员工对抗击新冠肺炎疫情斗争牺牲烈士和逝世同胞的深切悼念。校党委书记刘晟、党委副书记巫宏星、副校长黎锦城和全体值班干部、留校生代表参加了大学城校园集体默哀活动。</p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWQs1LAFqE7Fa2fKds4AfCFtaWBRbt3grrsPtnSQjaN94iaCZibN6soqcw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/><p>上午10时，汽车、火车、舰船鸣笛、防空警报鸣响，大学城校园师生员工在国旗杆下列队肃立，以虔诚之心默哀三分钟，向抗击新冠肺炎疫情牺牲烈士和逝世同胞致敬并表达由衷怀念。在家师生通过及时收看央视新闻直播报道方式，就地默哀，把心中的悲伤转化为战胜疫情的坚定信念。学校各单位还结合实际，组织开展学习优秀传统文化、学习英模事迹、学习抗疫先进模范、网上向先贤先烈鞠躬献花、抒写感言寄语等系列哀悼活动。</p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWlnXYeL03nlS0lq4H9dN2ZdRYRzveuMt3cZDyyYcOhHDaqEHzPhicib2A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/><p>大学城校园集体默哀仪式后，与会人员向抗击新冠肺炎疫情斗争中因公殉职的校友王烁同志遗像献花。在刘晟书记的带领下，到场的师生员工依次在王烁同志的遗像前敬献鲜花，并三鞠躬。</p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWfsXWwU7uDTMUzOfmiaNxjRCQEZR8ria5ulKibhKmNze5mI1SyKtAiblbMw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/><p>王烁校友系我校流行病与卫生统计学专业2011届毕业研究生，毕业后任职于广东省职业病防治院，是国家流调排查和巡回督导队员、广东支援湖北荆州医疗队员。3月13日傍晚在走访查看社区疫情防控工作时不幸因公殉职，生命定格在36岁。至今，广药大人仍为这位优秀校友的突然离世感到沉痛与惋惜，时至清明这份哀思更是愈加强烈。斯人已去，风范长存。王烁校友不忘初心、牢记使命、无私奉献、精诚济世的精神将深深铭刻在每位广药大人的心中。</p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWcBf07xKia0f4exicpXYBMMTQg5FbIgxl2VBHJuAriaFle3XpzsVWSJZRQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"/><p>附属第一医院举行哀悼活动</p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/sUVWdbRibO68ARCcJCrnm92e0miaDiaxdTWKhUeI7DfnRMEu8mM5kwwdCzc27hRUjat6dOwo3ibKws1MZZKNenXIMg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1&retryload=1"/>'
			}
		},
		methods: {
			getlocat(){
				uni.getLocation({
					success: function (res) {
					        console.log('当前位置的经度：' + res.longitude);
					        console.log('当前位置的纬度：' + res.latitude);
					    }
				})
			}
		}
	}
</script>

<style>
.content{
	padding: 10rpx;
	width: 95%;
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
