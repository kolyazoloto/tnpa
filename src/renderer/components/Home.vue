<template>
  <div class="homeContainer">
    <VideoStream></VideoStream>
  </div>
</template>

<script setup lang="ts">
import VideoStream from "./VideoStream.vue";
// import Home from "./Home.vue";
</script>

<style scoped>
.homeContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
