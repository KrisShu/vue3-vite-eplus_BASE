<template>
    <!-- 本体部分 -->
    <div :id="id" :class="['vue-puzzle-vcode', { show: props.show }]" @mousedown="onCloseMouseDown" @mouseup="onCloseMouseUp"
        @touchstart="onCloseMouseDown" @touchend="onCloseMouseUp">
        <div class="vue-auth-box" @mousedown.stop @touchstart.stop>
            <div class="auth-body" :style="`height: ${props.canvasHeight}px`">
                <!-- 主图，有缺口 -->
                <canvas ref="canvas1" :width="props.canvasWidth" :height="props.canvasHeight"
                    :style="`width:${props.canvasWidth}px;height:${props.canvasHeight}px`" />
                <!-- 成功后显示的完整图 -->
                <canvas ref="canvas3" :class="['auth-canvas3', { show: data.isSuccess }]" :width="props.canvasWidth"
                    :height="props.canvasHeight" :style="`width:${props.canvasWidth}px;height:${props.canvasHeight}px`" />
                <!-- 小图 -->
                <canvas width="70" class="auth-canvas2" :height="props.canvasHeight" ref="canvas2"
                    :style="`width:70px;height:${props.canvasHeight}px;transform:translateX(${styleWidth - 50 - 20 * ((styleWidth - 50) / (props.canvasWidth - 50))}px)`" />
                <div :class="['loading-box', { hide: !data.loading }]">
                    <img :src="loadingSvg" />
                </div>
                <div :class="['info-box', { show: infoBoxShow }, { fail: infoBoxFail }]">{{ infoText }}</div>
                <div :class="['flash', { show: data.isSuccess }]"
                    :style="`transform: translateX(${data.isSuccess ? `${props.canvasWidth + 100}px` : '-50px'}) skew(-30deg, 0);`">
                </div>
                <img class="reset" @click="reset" :src="resetSvg" />
            </div>
            <div class="auth-control">
                <div class="range-box">
                    <div class="range-text">{{ sliderText }}</div>
                    <div class="range-slider" ref="rangeslider" :style="`width:${styleWidth}px`">
                        <div :class="['range-btn', { isDown: data.mouseDown }]" @mousedown="onRangeMouseDown($event)"
                            @touchstart="onRangeMouseDown($event)">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import resetSvg from "../../assets/images/reset.png";
    import loadingSvg from "../../assets/script/loading";

    import { ref,reactive,computed,watch,defineEmits,onMounted,onBeforeUnmount,getCurrentInstance } from "vue";

    console.log("loadingSvg",loadingSvg)
    const data = reactive({
                mouseDown: false, // 鼠标是否在按钮上按下
                startWidth: 50, // 鼠标点下去时父级的width
                startX: 0, // 鼠标按下时的X
                newX: 0, // 鼠标当前的偏移X
                pinX: 0, // 拼图的起始X
                pinY: 0, // 拼图的起始Y
                loading: true, // 是否正在加在中，主要是等图片onload
                isCanSlide: false, // 是否可以拉动滑动条
                error: false, // 图片加在失败会出现这个，提示用户手动刷新
                infoBoxShow: false, // 提示信息是否出现
                infoText: "", // 提示等信息
                infoBoxFail: false, // 是否验证失败
                timer1: null, // setTimout1
                closeDown: false, // 为了解决Mac上的click BUG
                isSuccess: false, // 验证成功
                resetSvg,
                loadingSvg,
                imgIndex: -1 // 用于自定义图片时不会随机到重复的图片
            })

    const props = defineProps({
            id: {
                type: String
            },
            canvasWidth: {
                type: Number,
                default: 310
            }, // 主canvas的宽
            canvasHeight: {
                type: Number,
                default: 160
            }, // 主canvas的高
            // 是否出现，由父级控制
            show: {
                type: Boolean,
                default: false
            },
            // 所有的背景图片
            imgs: {
                type: Array
            },
            successText: {
                type: String,
                default: "验证通过！"
            },
            failText: {
                type: String,
                default: "验证失败，请重试"
            },
            sliderText: {
                type: String,
                default: "拖动滑块完成拼图"
            }
    })
    onMounted(()=>{
        // console.log("instance",pageInstance.refs)
        document.body.appendChild(ctx.$root.$el);
            document.addEventListener("mousemove", onRangeMouseMove, false);
            document.addEventListener("mouseup", onRangeMouseUp, false);
            document.addEventListener("touchmove", onRangeMouseMove, {
                passive: false
            });
            document.addEventListener("touchend", onRangeMouseUp, false);
            if (props.show) {
                document.body.classList.add("vue-puzzle-overflow");
            }
            reset();
	})

    // beforeDestroy
    onBeforeUnmount(()=>{
            clearTimeout(data.timer1);
            document.body.removeChild(ctx.$root.$el);
            document.removeEventListener("mousemove", onRangeMouseMove, false);
            document.removeEventListener("mouseup", onRangeMouseUp, false);
            document.removeEventListener("touchmove", onRangeMouseMove, {
                passive: false
            });
            document.removeEventListener("touchend", onRangeMouseUp, false);
	})
    const { ctx} = getCurrentInstance()
    console.log("ctx",ctx)
    watch(()=>props.show,(newval,oldval)=>{
			// 每次出现都应该重新初始化
            if (newval) {
                document.body.classList.add("vue-puzzle-overflow");
                reset();
            } else {
                document.body.classList.remove("vue-puzzle-overflow");
            }
	})
    const styleWidth = computed(()=>{
        const w = data.startWidth + data.newX - data.startX;
        return w < 50 ? 50 : w > props.canvasWidth ? props.canvasWidth : w;
    })
    const emit = defineEmits(['close','success','fail'])
    // 关闭
    const onClose =()=> {
        if (!data.mouseDown) {
            clearTimeout(data.timer1);
            emit("close")
        }
    }
    const onCloseMouseDown =()=>{
                data.closeDown = true;
            }
    const  onCloseMouseUp =()=> {
                if (data.closeDown) {
                    onClose();
                }
                data.closeDown = false;
            }
            // 鼠标按下准备拖动
    const rangeslider = ref(null)
    const onRangeMouseDown =(e)=> {
                if (data.isCanSlide) {
                    data.mouseDown = true;
                    data.startWidth = rangeslider.value.clientWidth;
                    data.newX = e.clientX || e.changedTouches[0].clientX;
                    data.startX = e.clientX || e.changedTouches[0].clientX;
                }
    }
            // 鼠标移动
    const onRangeMouseMove = (e)=> {
                if (data.mouseDown) {
                    e.preventDefault();
                    data.newX = e.clientX || e.changedTouches[0].clientX;
                }
            }
            // 鼠标抬起
    const onRangeMouseUp =()=>{
                if (data.mouseDown) {
                    data.mouseDown = false;
                    submit();
                }
            }
            const canvas1 = ref(null)
            const canvas2 = ref(null)
            const canvas3 = ref(null)
                console.log("22222222222",canvas1)
            /**
             * 开始进行
             * @param withCanvas 是否强制使用canvas随机作图
             */
    const init = (withCanvas)=> {
       
                data.loading = true;
                data.isCanSlide = false;
               
               
                const c = canvas1;
                const c2 = canvas2;
                const c3 = canvas3;
                // const c = this.$refs.canvas1;
                // const c2 = this.$refs.canvas2;
                // const c3 = this.$refs.canvas3;
                const ctx = c.value.getContext("2d");
                const ctx2 = c2.value.getContext("2d");
                const ctx3 = c3.value.getContext("2d");
                const img = document.createElement("img");
                ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
                ctx2.clearRect(0, 0, 70, props.canvasHeight);
                // 取一个随机坐标，作为拼图块的位置
                data.pinX = getRandom(90, props.canvasWidth - 90); // 留20的边距
                data.pinY = getRandom(20, props.canvasHeight - 90);
                img.crossOrigin = "anonymous"; // 匿名，想要获取跨域的图片
                img.onload = () => {
                    const [x, y, w, h] = makeImgSize(img);
                    ctx.save();
                    // 先画小图
                    paintBrick(ctx);
                    ctx.closePath();
                    if (
                        !(
                            navigator.userAgent.indexOf("Firefox") >= 0 &&
                            navigator.userAgent.indexOf("Windows") >= 0
                        )
                    ) {
                        // 非火狐，在此画外阴影
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 0;
                        ctx.shadowColor = "#000";
                        ctx.shadowBlur = 5;
                        ctx.fill();
                    }
                    ctx.clip(); // 按照外阴影区域切割
                    ctx.save();
                    // 小图外阴影
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowColor = "#000";
                    ctx.shadowBlur = 3;
                    ctx.fill();
                    ctx.restore();
                    ctx.drawImage(img, x, y, w, h);
                    ctx3.drawImage(img, x, y, w, h);
                    // 设置小图的内阴影
                    ctx.globalCompositeOperation = "source-atop";
                    paintBrick(ctx);
                    ctx.arc(data.pinX + 35, data.pinY + 35, 80, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.shadowColor = "rgba(255, 255, 255, .8)";
                    ctx.shadowOffsetX = -1;
                    ctx.shadowOffsetY = -1;
                    ctx.shadowBlur = 10;
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
                    // 将小图赋值给ctx2
                    const imgData = ctx.getImageData(
                        data.pinX - 3, // 为了阴影 是从-3px开始截取，判定的时候要+3px
                        data.pinY - 20,
                        data.pinX + 75,
                        data.pinY + 50
                    );
                    ctx2.putImageData(imgData, 0, data.pinY - 20);
                    // 清理
                    ctx.restore();
                    ctx.clearRect(0, 0, props.canvasWidth, props.canvasHeight);
                    // 画缺口
                    ctx.save();
                    paintBrick(ctx);
                    ctx.globalAlpha = 0.8;
                    ctx.fillStyle = "#ffffff";
                    ctx.fill();
                    ctx.restore();
                    // 画缺口的内阴影
                    ctx.save();
                    ctx.globalCompositeOperation = "source-atop";
                    paintBrick(ctx);
                    ctx.arc(data.pinX + 35, data.pinY + 35, 80, 0, Math.PI * 2, true);
                    ctx.shadowColor = "#fff";
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    ctx.shadowBlur = 16;
                    ctx.fill();
                    ctx.restore();
                    // 画整体背景图
                    ctx.save();
                    ctx.globalCompositeOperation = "destination-over";
                    // ctx.drawImage(img, 0, 0, props.canvasWidth, props.canvasHeight);
                    ctx.drawImage(img, x, y, w, h);
                    ctx.restore();
                    data.loading = false;
                    data.isCanSlide = true;
                };
                img.onerror = () => {
                    init(true); // 如果图片加载错误就重新来，并强制用canvas随机作图
                };
                if (!withCanvas && props.imgs && props.imgs.length) {
                    let randomNum = getRandom(0, props.imgs.length - 1);
                    if (randomNum === data.imgIndex) {
                        if (randomNum === props.imgs.length - 1) {
                            randomNum = 0;
                        } else {
                            randomNum++;
                        }
                    }
                    data.imgIndex = randomNum;
                    img.src = props.imgs[randomNum];
                } else {
                    img.src = makeImgWithCanvas();
                }
            }
            // 工具 - 范围随机数
    const getRandom = (min, max)=>{
                return Math.round(Math.random() * (max - min) + min);
            }
            // 工具 - 设置图片尺寸cover方式贴合canvas尺寸 w/h
    const makeImgSize =(img)=> {
                const imgScale = img.width / img.height;
                const canvasScale = props.canvasWidth / props.canvasHeight;
                let x = 0,
                    y = 0,
                    w = 0,
                    h = 0;
                if (imgScale > canvasScale) {
                    h = props.canvasHeight;
                    w = imgScale * h;
                    y = 0;
                    x = (props.canvasWidth - w) / 2;
                } else {
                    w = props.canvasWidth;
                    h = w / imgScale;
                    x = 0;
                    y = (props.canvasHeight - h) / 2;
                }
                return [x, y, w, h];
            }
            // 绘制拼图块的路径
    const paintBrick =(ctx)=> {
                ctx.beginPath();
                ctx.moveTo(data.pinX, data.pinY);
                ctx.lineTo(data.pinX + 15, data.pinY);
                ctx.bezierCurveTo(
                    data.pinX + 15,
                    data.pinY - 20,
                    data.pinX + 15 + 20,
                    data.pinY - 20,
                    data.pinX + 15 + 20,
                    data.pinY
                );
                ctx.lineTo(data.pinX + 15 + 20 + 15, data.pinY);
                ctx.lineTo(data.pinX + 15 + 20 + 15, data.pinY + 15);
                ctx.bezierCurveTo(
                    data.pinX + 15 + 20 + 15 + 20,
                    data.pinY + 15,
                    data.pinX + 15 + 20 + 15 + 20,
                    data.pinY + 15 + 20,
                    data.pinX + 15 + 20 + 15,
                    data.pinY + 15 + 20
                );
                ctx.lineTo(data.pinX + 15 + 20 + 15, data.pinY + 15 + 20 + 15);
                ctx.lineTo(data.pinX, data.pinY + 15 + 20 + 15);
                ctx.lineTo(data.pinX, data.pinY + 15 + 20);
                ctx.bezierCurveTo(
                    data.pinX + 20,
                    data.pinY + 15 + 20,
                    data.pinX + 20,
                    data.pinY + 15,
                    data.pinX,
                    data.pinY + 15
                );
                ctx.lineTo(data.pinX, data.pinY);
            }
            // 用canvas随机生成图片
    const makeImgWithCanvas = ()=>{
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = props.canvasWidth;
                canvas.height = props.canvasHeight;
                ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
          100,
          255
        )},${getRandom(100, 255)})`;
                ctx.fillRect(0, 0, props.canvasWidth, props.canvasHeight);
                // 随机画10个图形
                for (let i = 0; i < 10; i++) {
                    ctx.fillStyle = `rgb(${getRandom(100, 255)},${getRandom(
            100,
            255
          )},${getRandom(100, 255)})`;
                    ctx.strokeStyle = `rgb(${getRandom(100, 255)},${getRandom(
            100,
            255
          )},${getRandom(100, 255)})`;
                    if (getRandom(0, 2) > 1) {
                        // 矩形
                        ctx.save();
                        ctx.rotate((getRandom(-90, 90) * Math.PI) / 180);
                        ctx.fillRect(
                            getRandom(-20, props.canvasWidth - 20),
                            getRandom(-20, props.canvasHeight - 20),
                            getRandom(10, props.canvasWidth / 2 + 10),
                            getRandom(10, props.canvasHeight / 2 + 10)
                        );
                        ctx.restore();
                    } else {
                        // 圆
                        ctx.beginPath();
                        const ran = getRandom(-Math.PI, Math.PI);
                        ctx.arc(
                            getRandom(0, props.canvasWidth),
                            getRandom(0, props.canvasHeight),
                            getRandom(10, props.canvasHeight / 2 + 10),
                            ran,
                            ran + Math.PI * 1.5
                        );
                        ctx.closePath();
                        ctx.fill();
                    }
                }
                return canvas.toDataURL("image/png");
            }
            // 开始判定
    const submit =()=>{
                // 偏差
                const x = Math.abs(
                    data.pinX -
                    (styleWidth - 50) +
                    20 * ((styleWidth - 50) / (props.canvasWidth - 50)) -
                    3
                );
                if (x < 10) {
                    // 成功
                    data.infoText = props.successText;
                    data.infoBoxFail = false;
                    data.infoBoxShow = true;
                    data.isCanSlide = false;
                    data.isSuccess = true;
                    // 成功后准备关闭
                    clearTimeout(data.timer1);
                    data.timer1 = setTimeout(() => {
                        // 成功的回调
                        emit("success", x);
                    }, 800);
                } else {
                    // 失败
                    data.infoText = props.failText;
                    data.infoBoxFail = true;
                    data.infoBoxShow = true;
                    data.isCanSlide = false;
                    // 失败的回调
                    emit("fail", x);
                    // 800ms后重置
                    clearTimeout(data.timer1);
                    data.timer1 = setTimeout(() => {
                        reset();
                    }, 800);
                }
            }
            // 重置
    const reset =()=> {
                data.infoBoxFail = false;
                data.infoBoxShow = false;
                data.isCanSlide = true;
                data.isSuccess = false;
                data.startWidth = 50; // 鼠标点下去时父级的width
                data.startX = 0; // 鼠标按下时的X
                data.newX = 0; // 鼠标当前的偏移X
                init();
            }


    

</script>
<style lang="scss">
    .vue-puzzle-vcode {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 200ms;

        &.show {
            opacity: 1;
            pointer-events: auto;
        }
    }

    .vue-auth-box {
        position: absolute;
        top: -moz-calc((100vh - 50px) / 2) !important;
        top: -webkit-calc((100vh - 50px) / 2) !important;
        top: calc((100vh - 50px) / 2) !important;
        // left: -moz-calc(50%) !important;
        // left: -webkit-calc(50%) !important;
        // left: calc(50%) !important;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px;
        background: #fff;
        user-select: none;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

        .auth-body {
            position: relative;
            overflow: hidden;
            border-radius: 3px;

            .loading-box {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 20;
                opacity: 1;
                transition: opacity 200ms;
                display: flex;
                align-items: center;
                justify-content: center;

                &.hide {
                    opacity: 0;
                    pointer-events: none;
                }

                img {
                    width: 120px;
                    height: auto;
                }
            }

            .info-box {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 24px;
                line-height: 24px;
                text-align: center;
                overflow: hidden;
                font-size: 13px;
                background-color: #83ce3f;
                opacity: 0;
                transform: translateY(24px);
                transition: all 200ms;
                color: #fff;
                z-index: 10;

                &.show {
                    opacity: 0.95;
                    transform: translateY(0);
                }

                &.fail {
                    background-color: #ce594b;
                }
            }

            .auth-canvas2 {
                position: absolute;
                top: 0;
                left: 0;
                width: 70px;
                height: 100%;
                z-index: 2;
            }

            .auth-canvas3 {
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                transition: opacity 600ms;
                z-index: 3;

                &.show {
                    opacity: 1;
                }
            }

            .flash {
                position: absolute;
                top: 0;
                left: -50px;
                width: 30px;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.1);
                z-index: 3;

                &.show {
                    transition: transform 600ms;
                }
            }

            .reset {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 24px;
                height: auto;
                z-index: 12;
                cursor: pointer;
                transition: transform 200ms;
                transform: rotate(0deg);

                &:hover {
                    transform: rotate(-90deg);
                }
            }
        }

        .auth-control {
            .range-box {
                position: relative;
                width: 100%;
                height: 50px;
                background-color: #eef1f8;
                margin-top: 20px;
                border-radius: 3px;
                box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;

                .range-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 14px;
                    color: #b7bcd1;
                }

                .range-slider {
                    position: absolute;
                    height: 100%;
                    width: 50px;
                    background-color: rgba(0, 175, 173, .8);
                    border-radius: 3px;

                    .range-btn {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        right: 0;
                        width: 50px;
                        height: 50px;
                        background-color: #fff;
                        border-radius: 3px;
                        box-shadow: 0 0 4px #ccc;
                        cursor: pointer;

                        &>div {
                            width: 0;
                            height: 40%;
                            transition: all 200ms;

                            &:nth-child(2) {
                                margin: 0 4px;
                            }

                            border: solid 1px red;
                        }

                        &:hover,
                        &.isDown {
                            &>div:first-child {
                                border: solid 4px transparent;
                                height: 0;
                                border-right-color: red;
                            }

                            &>div:nth-child(2) {
                                border-width: 3px;
                                height: 0;
                                border-radius: 3px;
                                margin: 0 6px;
                                border-right-color: red;
                            }

                            &>div:nth-child(3) {
                                border: solid 4px transparent;
                                height: 0;
                                border-left-color: red;
                            }
                        }
                    }
                }
            }
        }
    }

    .vue-puzzle-overflow {
        overflow: hidden !important;
    }
</style>