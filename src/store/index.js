import { createStore } from "vuex";

export default createStore({
  state: {
    countFloor: 5,
    indexElevator: -1,
    floorWaiting: [],
    elevators: [
      {
        name: "Elevator 1",
        currentFloor: 1,
        nextFloor: 0,
        openDoor: false,
        free: true,
        direction: 0,
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
            currentFloor: 1,
            nextFloor: 0,
            openDoor: false,
            free: true,
            direction: 0,
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
      // проверка, что лифт(ы) не стоит(ят) на этаже вызова
      const counterElevator = state.elevators.filter(
        (elevator) => elevator.currentFloor === newFloor
      );

      // проверка, что ни один лифт уже не следует к этажу вызова
      const counterNextFloor = state.elevators.filter(
        (elevator) => elevator.nextFloor === newFloor
      );

      // проверка, что данного этажа нет в ожидании
      const counterFloor = state.floorWaiting.filter(
        (floor) => floor === newFloor
      );

      if (
        counterElevator.length === 0 &&
        counterFloor.length === 0 &&
        counterNextFloor.length === 0
      ) {
        // есть ли свободный лифт
        const index = state.elevators.findIndex(
          (elevator) => elevator.free === true
        );

        // если есть отправляем его
        if (index !== -1) {
          state.indexElevator = index;
        }
        // если нет, то заносим этаж в ожидание
        else {
          state.floorWaiting.push(newFloor);
        }
      }

      console.log("Этажи в ожидании лифта: " + state.floorWaiting);
    },
  },
  actions: {
    elevatorMovement(context, newFloor) {
      console.log("Конпка нажата");
      context.commit("setFloorWaiting", newFloor);
      const index = context.state.indexElevator;

      console.log(index);

      if (index !== -1) {
        const elevators = context.state.elevators;
        elevators[index].nextFloor = newFloor;
        context.state.indexElevator = -1;
        // Функция, которая перемещает лифт к нужному этажу
        const moveElevator = () => {
          elevators[index].free = false;

          const currentFloor = elevators[index].currentFloor;

          // Проверяем, нужно ли лифту двигаться вверх или вниз
          elevators[index].direction = Math.sign(newFloor - currentFloor);
          // Если лифт на нужном этаже, выходим из функции
          if (elevators[index].currentFloor === newFloor) {
            elevators[index].openDoor = true;
            elevators[index].direction = 0;

            setTimeout(() => {
              elevators[index].free = true;
              elevators[index].nextFloor = 0;

              elevators[index].openDoor = false;

              // если массив этажей в ожидании не пуст, то забираем первый этаж и едем к нему
              if (context.state.floorWaiting.length > 0) {
                const floor = context.state.floorWaiting.splice(0, 1);
                // удаление из массива

                context.dispatch("elevatorMovement", floor[0]);
              }
            }, 3000);
            return;
          }

          // Иначе, перемещаем лифт на следующий этаж в соответствии с направлением
          elevators[index].currentFloor += elevators[index].direction;

          // если на пути следования лифта есть этаж в ожидании то он останвливается
          if (context.state.floorWaiting.length > 0) {
            // проверка, есть ли такой этаж
            const indexFloor = context.state.floorWaiting.findIndex(
              (floor) => floor === elevators[index].currentFloor
            );

            // если да то "открываем двери" и удаляем из массива ожидания
            if (indexFloor !== -1) {
              elevators[index].openDoor = true;

              setTimeout(() => {
                elevators[index].openDoor = false;
                setTimeout(moveElevator, 1000);
              }, 3000);

              // удаление из массива
              context.state.floorWaiting.splice(indexFloor, 1);
            }
            // если этаж в массиве ожидания не подходит едем дальше
            else {
              setTimeout(moveElevator, 1000);
            }
          }
          // если массив ожидания пуст едем дальше
          else {
            console.log(elevators[index]);

            // Запускаем следующее перемещение лифта через 1 секунду
            setTimeout(moveElevator, 1000);
          }
        };

        // Запускаем первое перемещение лифта
        moveElevator();
      }
    },
  },
});
