<template>
    <el-button v-bind="$attrs" :loading="loading" @click="handleClick">
        <slot />
    </el-button>
</template>

<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        onClick: {
            type: Function,
            required: true,
        },
    });

    const loading = ref(false);

    const handleClick = async (...args) => {
        const result = props.onClick(...args);
        console.log('result', result);
        if (result && typeof result.then === 'function') {
            console.log('result2222', result);
            loading.value = true;
            try {
                await result;
            } finally {
                console.log('result3333');
                loading.value = false;
            }
        }
    };
</script>
