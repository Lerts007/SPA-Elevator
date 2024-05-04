<script setup>
import ElevatorShaft from "./components/ElevatorShaft.vue";
import SettingPanel from "./components/SettingPanel.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const countFloor = computed(() => {
  return store.state.countFloor;
});
</script>

<template>
  <div class="app">
    <ElevatorShaft v-for="n in countFloor" :floor="n" />
    <SettingPanel />
  </div>
</template>

<style lang="scss" scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
</style>
