<template>
  <div class="homeContainer">
    <VideoStream></VideoStream>
  </div>
</template>

<script setup>
import { useDataStore } from "../store/index.js";
import VideoStream from "./VideoStream.vue";
import { onMounted } from "vue";
import ROSLIB from "roslib";
import qte from "quaternion-to-euler";
// import Home from "./Home.vue";

const dataStore = useDataStore();
let isJoyConnect = dataStore.isJoyConnect;

function initROSLIBServer() {
  // connect to rosbridge
  dataStore.rosjs.ros = new ROSLIB.Ros({
    // url: `ws://${this.$store.state.rpiIpAddress}:8081`, do not connect!!!!!
  });

  // /
  dataStore.rosjs.ros.on("connection", () => {
    console.log("Connected to websocket server.");
    dataStore.rosjs.isRosConnected = true;

    // this.$store.state.rosjs.ros.getActionServers((a) => {
    //   console.log(a);
    // });

    ///////// IMU
    dataStore.rosjs.subscriberData.topics.imu = new ROSLIB.Topic({
      ros: dataStore.rosjs.ros,
      name: "/imu/data",
      messageType: "sensor_msgs/Imu",
    });
    dataStore.rosjs.subscriberData.topics.imu.subscribe((message) => {
      // console.log(message);
      let quaternion = [
        message.orientation.x,
        message.orientation.y,
        message.orientation.z,
        message.orientation.w,
      ];
      let euler = qte(quaternion);
      //console.log(euler);
      dataStore.rosjs.subscriberData.imu.yaw = Number(
        (euler[0] * (180 / Math.PI)).toFixed(2)
      );
      dataStore.rosjs.subscriberData.imu.pitch = Number(
        (euler[1] * (180 / Math.PI)).toFixed(2)
      );
      dataStore.rosjs.subscriberData.imu.roll = Number(
        (euler[2] * (180 / Math.PI)).toFixed(2)
      );
    });
    ///////////////// joy
    dataStore.rosjs.subscriberData.topics.joy = new ROSLIB.Topic({
      ros: dataStore.rosjs.ros,
      name: "joy",
      messageType: "sensor_msgs/Joy",
    });
    // let message = new ROSLIB.Message({
    //   axes: [0, 0, 0, 0],
    // });
    // this.$store.state.rosjs.subscriberData.topics.joy.publish(message);
  });

  dataStore.rosjs.ros.on("error", (error) => {
    console.log("Error connecting to websocket server: ", error);
    alert("Не удалось подключиться к ROSBRIDGE Server.");
  });

  dataStore.rosjs.ros.on("close", () => {
    console.log("Connection to websocket server closed.");
    dataStore.rosjs.isRosConnected = false;
    //unsubscribe
    dataStore.subscriberData.topics.imu.unsubscribe();
    dataStore.subscriberData.topics.fix.unsubscribe();
    dataStore.subscriberData.topics.motors.unsubscribe();
  });
}

function initGamepad() {
  let gamepad_idx = -1;

  window.addEventListener("gamepadconnected", (e) => {
    if (gamepad_idx !== -1) return;
    gamepad_idx = e.gamepad.index;
    isJoyConnect = true;
    console.log(
      "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length
    );
  });

  window.addEventListener("gamepaddisconnected", (e) => {
    if (e.gamepad.index === gamepad_idx) {
      gamepad_idx = -1;
      isJoyConnect = false;
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );
      if (dataStore.rosjs.isRosConnected) {
        let message = new ROSLIB.Message({
          axes: [0, 0, 0, 0],
        });
        dataStore.rosjs.subscriberData.topics.joy.publish(message);
      }
    }
  });

  // --- Rosbridge part --- //

  setInterval(() => {
    if (gamepad_idx === -1) return;

    // if (!dataStore.rosjs.isRosConnected) return;

    const gamepad = navigator.getGamepads()[gamepad_idx];

    let message = new ROSLIB.Message({
      axes: gamepad.axes,
      buttons: gamepad.buttons.map((x) => {
        return x.pressed ? 1 : 0;
      }),
    });
    // dataStore.rosjs.subscriberData.topics.joy.publish(message);
    console.log(message);
  }, 100);
}

onMounted(() => {
  initGamepad();
});
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
