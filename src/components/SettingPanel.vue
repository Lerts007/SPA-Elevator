<template>
  <div class="settings-panel">
    <div class="elevator setting-block">
      <h3>Лифты:</h3>
      <div class="setting-bottons">
        <button
          class="setting-button"
          @click="store.commit('settingElevator', -1)"
        >
          -
        </button>
        <button
          class="setting-button"
          @click="store.commit('settingElevator', 1)"
        >
          +
        </button>
      </div>
    </div>
    <div class="floor setting-block">
      <h3>Этиажи:</h3>
      <div class="setting-bottons">
        <button
          class="setting-button"
          @click="store.commit('settingFloor', -1)"
        >
          -
        </button>
        <button class="setting-button" @click="store.commit('settingFloor', 1)">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<style lang="scss" scoped>
.settings-panel {
  margin-top: 10px;
  margin-bottom: 10px;
}
.setting-block {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
h3 {
  font-size: 2rem;
}
.setting-bottons {
  display: flex;
  gap: 10px;
  & button {
    width: 20px;
    height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2rem;
  }
}
</style>
