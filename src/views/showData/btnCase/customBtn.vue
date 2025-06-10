<template>
    <button :disabled="isLoading" @click="handleClick">
        {{ isLoading ? 'Loading...' : label }}
    </button>
</template>

<script>
    import { ref } from 'vue';

    export default {
        props: {
            onClick: {
                type: Function,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
        },
        setup(props) {
            const isLoading = ref(false);

            const handleClick = async () => {
                if (isLoading.value) return; // 如果正在加载，则不执行任何操作

                isLoading.value = true;
                try {
                    await props.onClick(); // 调用传入的点击事件处理器
                } finally {
                    isLoading.value = false; // 无论请求成功与否，最终都要关闭loading状态
                }
            };

            return {
                isLoading,
                handleClick,
            };
        },
    };
</script>

<style scoped>
    button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
