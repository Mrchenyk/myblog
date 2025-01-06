<script setup lang="ts">
import { defineProps } from 'vue';

// 定义 props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
    <div class="container">
        <div class="title">友情链接</div>
    </div>

    <h2></h2>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;

}

.title {
    font-size: 48px;
    line-height: 48px;
    text-align: center;
    margin-top: 20px;

    background: -webkit-linear-gradient(315deg,
            rgb(210, 86, 53) 10%,
            #647eff 50%,
            rgb(238, 224, 112) 90%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    background-size: 400% 400%;
    animation: gradient 5s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>


