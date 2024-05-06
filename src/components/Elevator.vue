<template>
  <div class="elevator">
    <div class="elevator-door" :class="{ 'elevator-activ': elevatorActiv }">
      <h3
        v-if="indicatorMotionDown"
        class="indicatorMotion indicatorMotion-Down"
      >
        V
      </h3>
      <h3
        v-else-if="indicatorMotionUp"
        class="indicatorMotion indicatorMotion-Up"
      >
        V
      </h3>
      <h3 v-else class="indicatorMotion indicatorMotion-Rest"></h3>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["index"]);

const elevatorActiv = computed(() => {
  return store.state.elevators[props.index].openDoor ? true : false;
});
const indicatorMotionDown = computed(() => {
  return store.state.elevators[props.index].direction === 1 ? true : false;
});
const indicatorMotionUp = computed(() => {
  return store.state.elevators[props.index].direction === -1 ? true : false;
});
</script>

<style lang="scss" scoped>
.elevator {
  width: 100%;
  height: 100%;
  background-color: $accentColor;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.elevator-door {
  width: 80%;
  height: 100%;
  background-color: #fa7d7d;
}

.elevator-indicator {
  font-size: 24px;
  color: #fff;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

.elevator-activ {
  animation: blink 1s 3;
}

.indicatorMotion {
  text-align: center;
  font-size: 20px;
}
.indicatorMotion-Down {
  transform: rotate(-180deg);
}
</style>
