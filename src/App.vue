<script setup>
import ElevatorShaft from "./components/ElevatorShaft.vue";
import { useStore } from "vuex";

const store = useStore();
const countFloor = store.state.countFloor;
console.log(countFloor);
</script>

<template>
  <div class="app">
    <ElevatorShaft v-for="n in countFloor" :floor="n" />
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
</style>
