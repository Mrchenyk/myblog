<template>
  <div
    @click="openLink"
    class="text-center flex flex-col items-center w-full h-full p-6 transition-all duration-300 border cursor-pointer bg-stripe group hover:border-indigo-800 dark:hover:border-sky-300 dark:border-transparent bg-slate-50 dark:bg-slate-800 dark:text-slate-300 rounded-xl"
  >
    <!-- 头像 -->
    <div class="container">
      <RoundImage :imageSrc="avatar" />
    </div>
    <!-- 简介 -->

      
    <h1>{{ name }}</h1>

    <div>
      <h3>
        {{ title }}
      </h3>
    </div>
    <div>
      <p>
        🔗{{ shortLink }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import RoundImage from "./RoundImage.vue";
import AnimationTitle from "./AnimationTitle.vue";

const friendsInfo = defineProps(["avatar", "name", "title", "link", "tag", "color"]);

const shortLink = computed(() => {
  let baseLink = friendsInfo.link;
  const regex = /^(http|https):\/\/(.*)$/;
  return baseLink.replace(regex, "$2");
});

function openLink() {
  window.open(friendsInfo.link, "_blank");
}
</script>

<style scoped>
.VP-shadow {
  box-shadow: var(--vp-shadow-3);
}


.bg-stripe:hover {
  background-image: repeating-linear-gradient(
    45deg,
    hsl(0 0% 100%),
    hsl(0 0% 100%) 13px,
    hsl(0 0% 95%) 13px,
    hsl(0 0% 95%) 14px
  );
}
.dark .bg-stripe:hover {
  background-image: repeating-linear-gradient(
    45deg,
    hsl(202, 80%, 24%),
    hsl(202, 80%, 24%) 13px,
    hsl(200, 80%, 20%) 13px,
    hsl(200, 80%, 20%) 14px
  );
}
.rounded-full {
  border-radius: 50%;
}

.text-center {
  text-align: center;
}

.container {
  display: flex;
  justify-content: center; /* 水平居中 */
}
</style>
