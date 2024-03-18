<script setup lang="ts">
import { ref } from 'vue'
import TheNote from '@/components/notes/TheNote.vue'
import UiButton from '@/components/ui/button/TheButton.vue'
import UiModal from '@/components/ui/modal/TheModal.vue'

const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = true
}
</script>

<template>
  <main class="main">
    <div class="main__wrapper">
      <div class="main__header">
        <h1>Ваши заметки</h1>
        <UiButton @click="showModal">Добавить заметку</UiButton>
      </div>

      <TheNote />
    </div>
  </main>
  <UiModal v-model="isShowModal" id="add-notes">
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
.main {
  padding: 10px 0;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
