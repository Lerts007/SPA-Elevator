import { createStore } from "vuex";

export default createStore({
  state: {
    countFloor: 5,
    currentFloor: 1,
    arrayFloorWaiting: [],
    booleanFloor: true,
  },
  mutations: {
    setCurrentFloor(state, floor) {
      state.currentFloor = floor;
    },
    setArrayFloorWaiting(state, floor) {
      if (
        floor !== state.currentFloor &&
        floor !== state.arrayFloorWaiting[state.arrayFloorWaiting.length - 1]
      ) {
        state.arrayFloorWaiting.push(floor);
        state.booleanFloor = true;
      } else {
        state.booleanFloor = false;
      }
      console.log(state.arrayFloorWaiting);
      console.log(floor === state.arrayFloorWaiting.slice(-1)[0]);
    },
  },
  actions: {
    elevatorMovement(context) {
      if (context.state.arrayFloorWaiting.length > 0) {
        setTimeout(() => {
          const floor = context.state.arrayFloorWaiting.shift();
          context.commit("setCurrentFloor", floor);
          context.dispatch("elevatorMovement");
        }, 3000);
      }
    },
  },
});
