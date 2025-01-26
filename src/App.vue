<template>
  <main-menu
    v-if="isMainMenuShown"
    @start="onStart"
  />
  <death-screen
      v-else-if="isDeathScreenShown"
      :score="score"
      @start="onRestart"
      @main-menu="openMainMenu"
  />
  <game-controller
      v-else
      @death="onDeath"
      @score-change="onScoreChange"
  />
</template>

<script setup lang="ts">
 import { ref } from "vue";
 import GameController from "./components/GameController.vue";
 import MainMenu from "./components/MainMenu.vue";
 import DeathScreen from "./components/DeathScreen.vue";
 const isMainMenuShown = ref(true);
 const isDeathScreenShown = ref(false);

 const score = ref(0);
 function onStart() {
   isMainMenuShown.value = false;
 }
 function onDeath() {
   isDeathScreenShown.value = true;
 }
 function onScoreChange(value: number) {
   score.value = value
   console.log('on score change', score, value);
 }
 function onRestart() {
   isMainMenuShown.value = false;
   isDeathScreenShown.value = false;
 }
 function openMainMenu() {
   window.location.reload();
 }
</script>

<style scoped>

canvas {
  height: 100%;
  width: 100%;
}
</style>
