# 名称
	像素大战
	[demo](https://tristandongmaster.github.io/H5-Canvas-Pixel-Wars/)
	see [demo](https://tristandongmaster.github.io/H5-Canvas-Pixel-Wars/)

## 操作
	1. 像素人自动运动
	2.也可以上，下，左，右键可以控制方向

## 说明
	1. 像素人以一定速度运动
	2. 只在黑色区域来回，碰壁后自动弹回
	3. 圆圈进入像素人的嘴巴区域才会被吃掉

## 实现方式
	1. Canvas画布
	2. 跟随显示器频率刷新，这样更流畅
	3. 每次都会重绘像素人和圆圈
	4. 圆圈存在数组中，像素人是一个扇形区域
	5. 监听键盘事件来改变像素人方向
