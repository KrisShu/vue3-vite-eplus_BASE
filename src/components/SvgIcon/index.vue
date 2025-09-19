<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" :fill="color" />
    </svg>
</template>
<script setup>
    import { computed } from 'vue';
    const props = defineProps({
        iconClass: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
    });

    const iconName = computed(() => {
        return `#icon-${props.iconClass}`;
    });

    const svgClass = computed(() => {
        if (props.className) {
            return 'svg-icon ' + props.className;
        } else {
            return 'svg-icon';
        }
    });
</script>
<style scope lang="scss">
    .svg-icon {
        width: 1em;
        height: 1em;
        position: relative;
        fill: currentColor;
        vertical-align: -2px;
    }
</style>
