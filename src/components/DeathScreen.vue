<template>
  <div class="main-menu">
    <div class="info-block">
      <div v-if="isEnoughScore" class="win-screen">
        <span>Для получения <span class="highlight">супер-приза</span></span>
        <span>Пришли <span class="highlight">Никитосику</span></span>
        <span>Cкрин этого экрана</span>
        <span>Ты набрал {{ score }} очков!</span>
      </div>
      <div v-else class="description">
        <span>Ты набрал {{ score }} очков!</span>
        <span>Чтобы получить <span class="highlight">супер-приз</span></span>
        <span>Набери 800 очков!</span>
      </div>
      <base-button
          color="none"
          width="200px"
          @click="onMainMenuClick"
      >
        Главное меню
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BaseButton } from "kneekeetah-vue-ui-kit";
const emit = defineEmits(['start', 'mainMenu']);
const props = defineProps<{ score: number }>();

function onMainMenuClick() {
  emit('mainMenu');
}
const isEnoughScore = computed(() => props.score.valueOf() >= 800);
</script>

<style scoped>
.main-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2A2A2AFF;
  height: 100vh;
  width: 100%;
  .info-block {
    position: relative;
    display: flex;
    gap: 10px;
    flex-flow: column nowrap;
    align-items: center;
    width: 300px;
    border: 1px solid #545454;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 5px #262626;
    padding: 20px 10px;
    padding-top: 0;
    .description, .win-screen {
      display: flex;
      font-size: 18px;
      flex-flow: column nowrap;
      align-items: center;
      text-align: center;
      color: white;
      gap: 10px;
      padding: 20px 10px;
    }
  }
  code {
    background-color: #545454;
    font-family: monospace;
    padding: 1px 6px;
    border-radius: 4px;
  }
  img {
    position: absolute;
    bottom: 0;
    left: -35%;
    height: 200px;
    border-top: 2px solid #545454;
    overflow: hidden;
  }
  .highlight {
    border: 2px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
    font-family: monospace;
    padding: 1px 6px;
    border-radius: 4px;
  }
}
</style>
