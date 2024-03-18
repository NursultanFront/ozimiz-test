<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import TheNote from '@/components/notes/TheNote.vue'
import UiButton from '@/components/ui/button/TheButton.vue'
import UiModal from '@/components/ui/modal/TheModal.vue'
import UiInput from '@/components/ui/input/TheInput.vue'

interface IForm {
  title: string
  author: string
  text: string
}

const store = useNotesStore()

const validationSchema = object({
  title: string().required('Заголовок обязателен').trim(),
  author: string().required('Автор обязателен').trim(),
  text: string()
    .required('Текст обязателен')
    .trim()
    .min(11, 'Текст должен содержать более 10 символов')
})

const { errors, defineField, handleSubmit, resetForm } = useForm<IForm>({
  validationSchema,
  initialValues: {
    title: '',
    author: '',
    text: ''
  }
})

const [title] = defineField('title')
const [author] = defineField('author')
const [text] = defineField('text')

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log('Данные формы:', values)
    const date = new Date()
    store.addNote({
      ...values,
      date
    })
    isShowModal.value = false
    localStorage.setItem('notes', JSON.stringify(store.notes))
  } catch (error) {
    console.error('Ошибка валидации:', error)
  } finally {
  }
})

const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = true
}

onMounted(() => {
  const storedNotes = localStorage.getItem('notes')
  if (storedNotes) {
    const notes = JSON.parse(storedNotes)
    store.notes = [...notes]
  }
})

watch(isShowModal, () => {
  if (!isShowModal.value) {
    resetForm()
  }
})
</script>

<template>
  <main class="main">
    <div class="main__wrapper">
      <div class="main__header">
        <h1>Ваши заметки</h1>
        <div>
          <UiButton @click="showModal">Добавить заметку</UiButton>
          <UiButton v-if="store.notesCount > 4" @click="store.removeAllNotes()" variant="danger"
            >Удалить все заметки</UiButton
          >
        </div>
      </div>

      <h2 v-if="!store.notesCount">У вас пока нет заметок</h2>

      <div v-else class="main__list">
        <TheNote v-for="item in store.notes" :key="item.id" v-bind="item"></TheNote>
      </div>
    </div>
  </main>
  <UiModal v-model="isShowModal" id="add-notes">
    <form class="add-notes" @submit.prevent="onSubmit">
      <UiInput v-model="title" placeholder="Заголовок" :error-text="errors['title']" />
      <UiInput v-model="author" placeholder="Автор" :error-text="errors['author']" />
      <UiInput v-model="text" placeholder="Ваш текст" :error-text="errors['text']" />

      <UiButton type="submit">Создать</UiButton>
    </form>
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

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.add-notes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
