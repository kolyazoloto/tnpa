import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    piIpAddress: "192.168.1.100",
    imu: { roll: 0, pitch: 0, yaw: 0 },
    depth: 3,
    voltage: { overall: 12, cell: 3.6 },
    amperage: 10,

    isJoyConnect: false,

    rosjs: {
      ros: null,
      isRosConnected: false,
      subscriberData: {
        topics: {
          imu: null,
          joy: null,
        },
        imu: {
          roll: null,
          pitch: null,
          yaw: null,
        },
      },
    },
  }),

  actions: {
    rosbridgeConnect() {
      rosjs.ros.connect(`ws://${rpiIpAddress}:8081`);
    },
    rosbridgeDisconnect() {
      if (rosjs.ros != null) rosjs.ros.close();
    },
  },
});
