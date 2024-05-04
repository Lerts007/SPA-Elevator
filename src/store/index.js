import { createStore } from "vuex";

export default createStore({
  state: {
    countFloor: 5,
    currentFloor: 1,
    arrayFloorWaiting: [],
    booleanFloor: true, //заглушка, чтобы в компоненте повторно не вызывался elevatorMovement если вызывается один и тот же этаж
    elevators: [
      {
        name: "Elevator 1",
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

    settingElevator(state, number) {
      if (number === 1) {
        if (state.elevators.length === 4) {
          alert("Максимум 4 лифта");
        } else {
          state.elevators.push({
            name: "Elevator " + (state.elevators.length + 1),
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
      const arrFloor = context.state.arrayFloorWaiting;
      let floor = context.state.currentFloor; // текущий этаж

      if (arrFloor.length > 0) {
        setTimeout(() => {
          const callFloor = arrFloor[0]; // этаж на который был вызван лифт

          // Функция для перемещения лифта к вызванному этажу
          const moveUpElevator = () => {
            if (floor !== callFloor) {
              console.log(callFloor);
              console.log(arrFloor);

              // Если лифт не на нужном этаже, перемещать его на один этаж
              floor += 1;
              context.commit("setCurrentFloor", floor);
              if (arrFloor.indexOf(floor) !== -1) {
                arrFloor.splice(arrFloor.indexOf(floor), 1);
                return setTimeout(moveUpElevator, 3000);
              }
              return setTimeout(moveUpElevator, 1000);
            } else {
              setTimeout(() => context.dispatch("elevatorDown"), 3000);
            }
          };

          moveUpElevator();
        }, 1000);
      }
    },

    elevatorDown(context) {
      const arrFloor = context.state.arrayFloorWaiting;
      let floor = context.state.currentFloor; // текущий этаж

      console.log(arrFloor);

      // Функция для перемещения лифта на первый этаж после достежения вызванного этажа
      const moveDownElevator = () => {
        if (floor !== 1) {
          // Если лифт не на нужном этаже, перемещать его на один этаж
          floor -= 1;
          context.commit("setCurrentFloor", floor);

          if (arrFloor.indexOf(floor) !== -1) {
            arrFloor.splice(arrFloor.indexOf(floor), 1);
            return setTimeout(moveDownElevator, 3000);
          }
          return setTimeout(moveDownElevator, 1000);
        } else {
          setTimeout(() => context.dispatch("elevatorMovement"), 1000);
        }
      };

      moveDownElevator();
    },
  },
});
