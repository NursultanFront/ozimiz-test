import { ref } from 'vue'
import { defineStore } from 'pinia'

interface INotes {
  title: string
  date: Date
  text: string
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<INotes[]>([])

  function addNote() {}

  function deleteNote() {}

  function removeAllNotes() {
    notes.value = []
  }

  return { notes, addNote, deleteNote, removeAllNotes }
})
