<template>
  <div class="OSD">
    <p class="OSD__depth">{{ voltageOverall }} m</p>
    <div class="batStats">
      <p class="OSD__voltage">{{ voltageOverall }} V</p>
      <p class="OSD__voltage">{{ voltageCell }} V</p>
      <p class="OSD__amperage">{{ amperage }} A</p>
    </div>

    <!-- <p class="OSD__joystick"></p> -->
    <div class="levelIndicator">
      <div
        class="levelIndicator__horozontal"
        :style="{
          transform: `translateY(${imu.pitch}%) rotate(${imu.roll}deg)`,
        }"
      >
        <div class="levelIndicator__elem"></div>
        <div class="levelIndicator__elem"></div>
        <div class="levelIndicator__elem"></div>
        <div class="levelIndicator__elem"></div>
        <div class="levelIndicator__elem"></div>
        <div class="levelIndicator__elem"></div>
      </div>
      <div class="levelIndicator__middleStatic">
        <div class="levelIndicator__middleStatic-elemHoz"></div>
        <div class="levelIndicator__middleStatic-elemVert"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from "../store/index.js";
import { onMounted } from "vue";

const dataStore = useDataStore();
let imu = dataStore.imu;

let depth = dataStore.depth;
let voltageOverall = dataStore.voltage.overall;
let voltageCell = dataStore.voltage.cell;
let amperage = dataStore.imu.roll;

// onMounted(() => {
//   setInterval(() => {
//     imu.roll++;
//     imu.pitch++;
//   }, 50);
// });
</script>

<style>
.OSD {
  position: absolute;
  inset: 0 0 0 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);

  font-size: 24px;
  line-height: 28px;
  color: white;
  text-shadow: 0 0 2px #000;
}
.batStats {
  display: flex;
  flex-direction: column;
  align-items: end;
  grid-column: -3;
  grid-row: -3;
}
.OSD__depth {
  display: flex;
  flex-direction: column;
  align-items: end;
  grid-column: -3;
  grid-row: 2;
}
.levelIndicator {
  display: grid;
  grid-row: 4/6;
  grid-column: 4/6;
}
.levelIndicator__horozontal {
  display: flex;
  align-items: center;
  gap: 5%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  /* transition: transform ease-in 100ms; */
}
.levelIndicator__elem {
  width: 100%;
  height: 3px;
  background-color: white;
  box-shadow: 0 0 2px #000;
}
.levelIndicator__middleStatic {
  display: grid;
  align-items: center;
  grid-column: 1;
  grid-row: 1;
}
.levelIndicator__middleStatic-elemHoz,
.levelIndicator__middleStatic-elemVert {
  background-color: white;
  box-shadow: 0 0 2px #000;
}

.levelIndicator__middleStatic-elemHoz {
  width: 100%;
  height: 3px;
  width: 10%;
  margin-inline: auto;
  grid-column: 1;
  grid-row: 1;
  z-index: 2;
}
.levelIndicator__middleStatic-elemVert {
  width: 3px;
  height: 10%;
  margin-inline: auto;
  grid-column: 1;
  grid-row: 1;
}
</style>
