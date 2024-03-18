<script setup lang="ts">
import { computed, ref } from 'vue'
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
  } catch (error) {
    console.error('Ошибка валидации:', error)
  } finally {
  }
})

const isShowModal = ref(false)

const showModal = () => {
  isShowModal.value = true
  resetForm()
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
}

.add-notes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
