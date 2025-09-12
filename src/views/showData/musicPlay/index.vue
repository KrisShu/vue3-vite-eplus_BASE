<template>
    <div>
        <h1>用vue3写音乐播放器</h1>

        <div class="box-section">
            <div class="left">
                <div class="music-cover-box">
                    <div class="muscic-cover" :class="{ playing: isPlaying }">
                        <img :src="musicInfo.cover" alt="Music Cover" />
                    </div>
                </div>
                <!--  -->
                <div class="music-info-box">
                    <!-- 歌手&歌名 -->
                    <div class="artist-title marquee-box">
                        <div class="marquee" ref="marquee">
                            <p class="marquee-content" ref="marqueeContent">
                                <span>
                                    {{ musicInfo.title }} -
                                    {{ musicInfo.artist }}
                                </span>
                                <span
                                    class="content-repeat"
                                    v-if="contentRepeat"
                                >
                                    {{ musicInfo.title }} -
                                    {{ musicInfo.artist }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <!-- 相关操作 -->
                    <div class="music-operation">
                        <div class="share-icon icon">
                            <i class="iconfont icon-fenxiang"></i>
                        </div>
                        <div class="download-icon icon">
                            <i class="iconfont icon-xiazai"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="play-control-box">
                    <div class="next-icon icon">
                        <i class="iconfont icon-shangyishouweidianji"></i>
                    </div>
                    <div @click="playMusic" class="play-icon-box">
                        <i v-if="!isPlaying" class="iconfont icon-bofang-1"></i>
                        <i v-else class="iconfont icon-zanting"></i>
                    </div>
                    <div class="previous-icon icon">
                        <i class="iconfont icon-xiayishouweidianji"></i>
                    </div>
                </div>
                <div class="music-progress-box">
                    <div class="time-info">
                        <span class="current-time">{{
                            musicInfo.currentTime
                        }}</span>
                    </div>
                    <div
                        class="progress-bar"
                        @mouseover="onHover"
                        @mousedown="onProgressMouseDown"
                        ref="progressBar"
                    >
                        <div
                            class="progress"
                            :style="{ width: progressPercent + '%' }"
                        ></div>
                    </div>
                    <div class="time-info">
                        <span class="duration">{{
                            musicInfo.minutesTime
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, nextTick, computed } from 'vue';
    import musicUrl from '@/assets/files/lalisa.mp3'; // 替换为实际音乐文件路径

    const musicInfo = ref({
        cover: 'https://y.qq.com/music/photo_new/T002R300x300M000001QcgDL1nMrF9_2.jpg?max_age=2592000', // 替换为实际音乐封面图片链接
        title: 'LALISA',
        artist: 'LISA (리사)',
        album: 'Alter Ego',
        duration: '203', // 音乐总时长，单位为秒
        minutesTime: '00:00', // 音乐总时长，格式化为分钟:秒
        currentTime: '00:00', // 当前播放时间，格式化为分钟:秒
        url: musicUrl,
    });

    // 创建音频对象
    const audio = new Audio();
    const isPlaying = ref(false);
    const currentTime = ref(0); // 当前播放秒数
    const duration = ref(0); // 总时长

    // 事件监听器
    const updateCurrentTime = () => (currentTime.value = audio.currentTime);
    const updateDuration = () => (duration.value = audio.duration);

    // 设置音频源
    const setSource = url => {
        resetState();
        audio.src = url;
        audio.load();
    };
    // 重置状态
    const resetState = () => {
        currentTime.value = 0;
        duration.value = 0;
        isPlaying.value = false;
    };

    // 歌名是否滚动相关
    const marquee = ref(null);
    const marqueeContent = ref(null);
    const contentRepeat = ref(false);
    const checkScroll = () => {
        nextTick(() => {
            const box = marquee.value;
            const content = marqueeContent.value;
            if (box && content) {
                if (content.offsetWidth > box.offsetWidth) {
                    box.classList.add('scrolling');
                    contentRepeat.value = true;
                } else {
                    box.classList.remove('scrolling');
                    contentRepeat.value = false;
                }
            }
        });
    };

    onMounted(() => {
        setSource(musicInfo.value.url);
        // 检查滚动状态
        checkScroll();
    });
    watch(() => [musicInfo.value.title, musicInfo.value.artist], checkScroll);

    const playMusic = () => {
        // 这里可以添加播放音乐的逻辑
        console.log('播放音乐:', audio);
        isPlaying.value = !isPlaying.value;
        if (isPlaying.value) {
            // 假设这里是播放音乐的逻辑
            console.log('音乐开始播放');
            audio.play();
        } else {
            // 假设这里是暂停音乐的逻辑
            console.log('音乐已暂停');
            audio.pause();
        }
    };

    // 注册事件监听
    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('play', () => (isPlaying.value = true));
    audio.addEventListener('pause', () => (isPlaying.value = false));
    audio.addEventListener('ended', () => {
        isPlaying.value = false;
        currentTime.value = 0;
    });

    const progressPercent = computed(() =>
        duration.value ? (currentTime.value / duration.value) * 100 : 0,
    );

    const progressBar = ref(null);

    const onProgressMouseDown = e => {
        if (!progressBar.value || !audio.duration) return;
        const bar = progressBar.value;
        const update = event => {
            /**
             * 获取DOM元素尺寸及其相对于视口位置的方法‌
             * 返回一个包含top、right、bottom、left、width、height等属性的DOMRect对象
             */
            const rect = bar.getBoundingClientRect(); // 获取进度条的边界矩形
            console.log('rect=======', rect);
            let percent = (event.clientX - rect.left) / rect.width; // 计算点击位置百分比
            console.log('percent=======', percent);
            /**
             * 内层 Math.min(1, percent)
                作用：防止百分比超过100%
                逻辑：取 percent 和 1 的较小值
                示例：
                若 percent = 1.2 → 返回 1
                若 percent = 0.8 → 返回 0.8

                外层 Math.max(0, ...)
                作用：防止百分比低于0%
                逻辑：取前一步结果和 0 的较大值
                示例：
                前步结果 -0.3 → 返回 0
                前步结果 0.5 → 返回 0.5
             */
            percent = Math.max(0, Math.min(1, percent));
            console.log('percent after clamp=======', percent);
            const newTime = percent * audio.duration; // 计算新的播放时间
            audio.currentTime = newTime;
            currentTime.value = newTime;
        };
        update(e);
        const move = event => update(event);
        const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
    };
    const onHover = () => {
        // 鼠标悬停时的逻辑
        console.log('鼠标悬停在进度条上');
    };

    // 格式化音乐总时长为分钟:秒
    watch(duration, () => {
        if (duration.value) {
            musicInfo.value.minutesTime = new Date(duration.value * 1000)
                .toISOString()
                .substr(14, 5); // 格式化为分钟:秒
        }
    });
    watch(currentTime, () => {
        if (audio.duration) {
            musicInfo.value.currentTime = new Date(currentTime.value * 1000)
                .toISOString()
                .substr(14, 5); // 格式化为分钟:秒
        }
    });
</script>

<style lang="scss" scoped>
    @import './index.scss';
</style>
