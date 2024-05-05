import { createStore } from "vuex";

export default createStore({
  state: {
    countFloor: 5,
    floorWaiting: [],
    elevators: [
      {
        name: "Elevator 1",
        currentFloor: 1,
      },
    ],
  },
  mutations: {
    // изменение количества этажей
    settingFloor(state, number) {
      if (state.countFloor === 10 && number === 1) {
        alert("Максимум 10 этажей");
      } else if (state.countFloor === 2 && number === -1) {
        alert("Минимум 2 этажа");
      } else {
        state.countFloor += number;
        console.log(state.countFloor);
      }
    },

    // изменение количества лифтов
    settingElevator(state, number) {
      if (number === 1) {
        if (state.elevators.length === 4) {
          alert("Максимум 4 лифта");
        } else {
          state.elevators.push({
            name: "Elevator " + (state.elevators.length + 1),
            currentFloor: 3,
          });
        }
      }
      if (number === -1) {
        if (state.elevators.length === 1) {
          alert("Минимум 1 лифт");
        } else {
          state.elevators.pop();
        }
      }
      console.log(state.elevators);
    },

    // Заполнение floorWaiting этажами которые были вызваны
    setFloorWaiting(state, newFloor) {
      // проверка что лифт(ы) не стоит(ят) на этаже вызова
      const counterElevator = state.elevators.filter(
        (elevator) => elevator.currentFloor === newFloor
      );

      // проверка что данного этажа нет в ожидании
      const counterFloor = state.floorWaiting.filter(
        (floor) => floor === newFloor
      );

      //
      if (counterElevator.length === 0 && counterFloor.length === 0) {
        state.floorWaiting.push(newFloor);
      }

      console.log("Этажи в ожидании лифта: " + state.floorWaiting);
    },
  },
  actions: {
    elevatorMovement(context) {},
  },
});
