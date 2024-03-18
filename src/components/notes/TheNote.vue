<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '../ui/button/TheButton.vue'
import UiModal from '../ui/modal/TheModal.vue'

const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = true
}
</script>

<template>
  <div class="note">
    <div class="note__wrapper">
      <div>Title</div>
      <div>Date</div>
    </div>
    <UiButton @click="showModal">Показать</UiButton>
    <UiButton variant="danger">Удалить</UiButton>
  </div>
  <UiModal v-model="isShowModal" id="notes-info">
    <div class="note-modal">
      <div class="note-modal__header">
        <h2>Title</h2>
        <div>Date</div>
      </div>

      <div class="note-modal__text"></div>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.note {
  padding: 10px;

  display: flex;
  border: 1px solid rgb(86, 84, 83);

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
  }
}
</style>
