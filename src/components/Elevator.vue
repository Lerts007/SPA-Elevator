<template>
  <div class="elevator">
    <div class="elevator-door"></div>
    <div class="elevator-indicator"></div>
  </div>
</template>

<script setup></script>

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
  background-color: #fff;
}

.elevator-indicator {
  font-size: 24px;
  color: #fff;
}
</style>
