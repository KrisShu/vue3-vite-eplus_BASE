export const messageBox = (
    callback,
    title = '删除',
    tipText = '确认删除改数据？',
    icon = 'Delete',
) => {
    ElMessageBox.confirm(tipText, title, {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true,
        //   icon: markRaw(icon),
    })
        .then(() => {
            callback();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            });
        });
};

export const messageAlert = (message, type = 'success') => {
    ElMessage({
        message,
        type,
    });
};

/**
 * 深度克隆数据
 * @paramsource数据源
 * @authorzhuiyi 2021/04/29
 */
export function DEEP_CLONE(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty.call(source, keys)) {
            if (
                source[keys] &&
                typeof source[keys] === 'object' &&
                !(source[keys] instanceof Date)
            ) {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = DEEP_CLONE(source[keys]);
            } else {
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}

/**
 *防抖函数，可立即执行
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function (...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}
// 简化版
function debounce2(fn, wait, immediate = false) {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);

        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => (timeout = null), wait);
            if (callNow) fn.apply(context, args);
        } else {
            timeout = setTimeout(() => fn.apply(context, args), wait);
        }
    };
}

export default {
    messageBox,
    messageAlert,
    DEEP_CLONE,
};
