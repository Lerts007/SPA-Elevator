<template>
  <div class="shaft">
    <div v-for="n in store.state.elevators.length" class="elevator-shaft">
      <Elevator
        v-if="props.floor === store.state.elevators[n - 1].currentFloor"
      />
    </div>
    <div class="floor">
      <h1>{{ props.floor }}</h1>
      <button @click="callFloor"></button>
    </div>
  </div>
</template>

<script setup>
import Elevator from "./Elevator.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["floor"]);

const callFloor = () => {
  store.commit("setFloorWaiting", props.floor);
};
</script>

<style lang="scss" scoped>
.shaft {
  display: flex;

  border-right: 1px solid $border;
  border-bottom: 1px solid $border;
}
.elevator-shaft {
  position: relative;

  width: 100px;
  height: 100px;
  border-left: 2px solid $border;
  border-right: 2px solid $border;
}
.floor {
  width: 100px;
  padding: 5px;

  display: flex;
  gap: 10px;

  & h1 {
    font-size: 2rem;
  }
  & button {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    border: 1px solid $accentColor;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      transform: translateY(-50%) translateX(-50%);
      width: 1em;
      height: 1em;
      border-radius: 0.5em;
      background-color: $accentColor;
    }
  }
}
</style>
