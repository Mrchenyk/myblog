<template>
  <div class="round-image-container" @mouseenter="hoverImage" @mouseleave="leaveImage">
    <img :src="imageSrc" :class="{'zoomed': isHovered}" alt="圆形动态图片" />
  </div>
</template>

<script>
export default {
  name: 'RoundImage',
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isHovered: false
    };
  },
  methods: {
    hoverImage() {
      this.isHovered = true;
    },
    leaveImage() {
      this.isHovered = false;
    }
  }
};
</script>

<style scoped>
.round-image-container {
  width: 100px; /* 可根据实际需求调整图片容器宽度 */
  height: 100px; /* 可根据实际需求调整图片容器高度 */
  overflow: hidden;
  border-radius: 50%; /* 让容器为圆形，辅助图片裁剪成圆形的视觉效果 */
  position: relative;
  animation: backgroundChange 5s infinite alternate; /* 添加背景颜色变化动画，持续5秒，无限循环，交替进行 */
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片填充裁剪区域，可能根据需求调整为其他模式 */
  transition: transform 0.3s ease; /* 添加过渡效果，用于动态变化 */
}

img.zoomed {
  transform: scale(1.1); /* 鼠标悬停时放大图片，这里放大1.1倍，可按需调整 */
}
</style>