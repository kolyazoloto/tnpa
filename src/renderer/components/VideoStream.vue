<template>
  <div class="videoContainer">
    <img
      class="videoContainer__image"
      src="https://csoor.organizations.mchs.gov.ru/uploads/resize_cache/news/2022-04-01/sbory-operatorov-tnpa_1648824863845786545__2000x2000.jpg"
    />
    <OSD></OSD>
  </div>
</template>

<script setup lang="ts">
import OSD from "./OSD.vue";
</script>

<style>
.videoContainer {
  position: relative;
  display: flex;
  /* height: 100%; */
  /* width: fit-content; */
  margin-inline: auto;
}

.videoContainer__image {
  height: 100%;
  object-fit: contain;
  object-position: center center;
}
</style>
