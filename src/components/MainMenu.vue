<template>
  <div class="main-menu">
    <div class="info-block">
      <div class="description">
        <span>Уворачивайся от библий!</span>
        <span>Потому что ты <span class="highlight">атеист</span></span>
        <span>И самый умный!</span>
        <span>Прыгай на <code>Space</code></span>
        <span>И набери <span class="highlight">800</span> очков!</span>
      </div>
      <base-button
          color="none"
          width="200px"
          @click="onStartClick"
      >
        Начать
      </base-button>
      <div сlass="image-block">
        <img src="/photo.jpg">
        <base-tooltip>
          Нескафе три в одном
        </base-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton, BaseTooltip } from "kneekeetah-vue-ui-kit";
const emit = defineEmits(['start']);
function onStartClick() {
  emit('start');
}
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
    flex-flow: column nowrap;
    align-items: center;
    width: 300px;
    height: 450px;
    border: 1px solid #545454;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0px 0px 5px 5px #262626;
    .description {
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
