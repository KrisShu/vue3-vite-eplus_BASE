<template>
    <div>
        <el-form
            :model="form"
            :rules="formRules"
            label-width="auto"
            style="max-width: 600px"
        >
            <el-form-item prop="num1" label="number1">
                <el-input-number
                    v-model="form.num1"
                    :min="0"
                    :max="100000"
                    :controls="false"
                    :precision="2"
                />
            </el-form-item>
            <el-form-item label="method">
                <el-select
                    v-model="form.method"
                    placeholder="Select"
                    size="large"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="number2">
                <el-input-number
                    v-model="form.num2"
                    :min="0"
                    :max="100"
                    :controls="false"
                    :precision="2"
                />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">计算</el-button>
            </el-form-item>

            <el-form-item label="result">
                <el-input style="width: 240px" v-model="result" disabled />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue';
    import Big from 'big.js';
    const form = reactive({
        num1: 0,
        num2: 0,
        method: 'add',
    });

    const formRules = {
        num1: [
            { required: true, message: '请输入数字', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
        num2: [
            { required: true, message: '请输入数字', trigger: 'blur' },
            { type: 'number', message: '请输入数字', trigger: 'blur' },
        ],
    };
    const options = [
        { value: 'add', label: '加法' },
        { value: 'sub', label: '减法' },
        { value: 'mul', label: '乘法' },
        { value: 'div', label: '除法' },
    ];

    const result = ref(0);

    const onSubmit = val => {
        const num1 = new Big(form.num1);
        const num2 = new Big(form.num2);

        switch (form.method) {
            case 'add':
                result.value = num1.plus(num2).toString();
                break;
            case 'sub':
                result.value = num1.minus(num2).toString();
                break;
            case 'mul':
                result.value = num1.times(num2).toString();
                break;
            case 'div':
                result.value = num1.div(num2).toString();
                break;
        }
    };
</script>

<style></style>
