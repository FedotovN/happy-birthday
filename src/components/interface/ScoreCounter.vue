<template>
  <div class="score-counter">
    <span>SCORE:</span>
    <span class="score-value">{{ props.score }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    score: number,
  }>(), { score: 0 });
</script>

<style scoped>
.score-counter {
  display: flex;
  gap: 5px;
  font-family: sans-serif;
  font-size: 20px;
  padding: 10px;
  color: white;
  .score-value {
    color: #55fc6c;
  }
}
</style>
