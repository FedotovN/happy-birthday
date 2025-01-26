<template>
  <div class="game-root">
    <div class="game-interface">
      <score-counter :score="score" />
    </div>
    <game-root @score-change="onScoreChange" @death="onDeath" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import GameRoot from "./GameRoot.vue";
  import ScoreCounter from "./interface/ScoreCounter.vue";

  const score = ref(0);
  const emit = defineEmits(['death', 'scoreChange']);
  function onScoreChange(value: number) {
    score.value = value;
    emit('scoreChange', score.value);
  }
  function onDeath() {

    emit('death');
  }
</script>

<style scoped>
.game-interface {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

</style>
