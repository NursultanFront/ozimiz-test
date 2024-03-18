<script setup lang="ts">
import { useNotesStore, type INotes } from '@/stores/notes'
import { ref } from 'vue'
import UiButton from '../ui/button/TheButton.vue'
import UiModal from '../ui/modal/TheModal.vue'

interface IProps extends INotes {}

const props = defineProps<IProps>()

const store = useNotesStore()

const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = true
}
</script>

<template>
  <div class="note">
    <div class="note__wrapper">
      <div>Заголовок: {{ props.title }}</div>
      <div>Автор: {{ props.author }}</div>
      <div>Дата создания: {{ props.date }}</div>
    </div>
    <div>
      <UiButton @click="showModal">Показать</UiButton>
      <UiButton @click="store.deleteNote(props.id)" variant="danger">Удалить</UiButton>
    </div>
  </div>
  <UiModal v-model="isShowModal" id="notes-info">
    <div class="note-modal">
      <div class="note-modal__header">
        <h2>Заголовок{{ props.title }}</h2>
        <div>Автор {{ props.author }}</div>
        <div>Дата создания {{ props.date }}</div>
      </div>

      <div class="note-modal__text">
        {{ props.text }}
      </div>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.note {
  padding: 20px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div {
    margin: 4px 0;
  }
}

.note-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.note-modal__header {
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

h2 {
  margin: 0 0 10px 0;
}

.note-modal__text {
  white-space: pre-wrap;
}
</style>
