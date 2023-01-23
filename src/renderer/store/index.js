import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    imu: { roll: 0, pitch: 0, yaw: 0 },
    depth: 3,
    voltage: { overall: 12, cell: 3.6 },
    amperage: 10,
  }),

  actions: {
    increment() {
      this.imu.roll = 50;
    },
  },
});
