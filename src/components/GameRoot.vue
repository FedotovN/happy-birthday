<template>
  <canvas id="#canvas"></canvas>
</template>

<script setup lang="ts">
  import GameManager from '../game/game.ts';

  let gm = new GameManager();
  gm.start();
  const emit = defineEmits(['scoreChange', 'death'])
  gm.onScoreChange((value: number) => emit('scoreChange', value));
  gm.onDeath(() => {
    emit('death');
    console.log('ded');
  });

</script>

<style scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
