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
                        <span class="current-time">0:00</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <div class="time-info">
                        <span class="duration">{{ musicInfo.duration }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, nextTick } from 'vue';

    const musicInfo = ref({
        cover: 'https://y.qq.com/music/photo_new/T002R300x300M000001QcgDL1nMrF9_2.jpg?max_age=2592000', // 替换为实际音乐封面图片链接
        title: 'DreamDreamDreamDream2',
        artist: 'LiSA',
        album: 'Alter Ego',
        duration: '03:43',
        url: 'https://ws6.stream.qqmusic.qq.com/C400001BU8nz29CiXx.m4a?guid=9690521590&vkey=829CC945ADF12023180939D0940A06525DA951014D6A74694AC729AB3C752918DA918A976CB94C5D3F4B0388B6154F1C31CFB5F248D69337__v2b9ab895&uin=1446025061&fromtag=120032',
    });

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

    onMounted(checkScroll);
    watch(() => [musicInfo.value.title, musicInfo.value.artist], checkScroll);

    const isPlaying = ref(false);
    const playMusic = () => {
        // 这里可以添加播放音乐的逻辑
        console.log('播放音乐:', musicInfo.value.title);
        isPlaying.value = !isPlaying.value;
        // if (isPlaying.value) {
        //     // 假设这里是播放音乐的逻辑
        //     console.log('音乐开始播放');

        // } else {
        //     // 假设这里是暂停音乐的逻辑
        //     console.log('音乐已暂停');
        // }
    };
</script>

<style lang="scss" scoped>
    @import './index.scss';
</style>
