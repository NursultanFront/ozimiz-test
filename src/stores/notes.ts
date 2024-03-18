import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface INotes {
  id: string
  title: string
  date: Date
  text: string
  author: string
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<INotes[]>([])

  const notesCount = computed(() => {
    return notes.value.length
  })

  function addNote(note: Omit<INotes, 'id'>) {
    const noteWithId = {
      ...note,
      id: Date.now().toString()
    }
    notes.value.push(noteWithId)
  }

  function deleteNote(id: string) {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  function removeAllNotes() {
    notes.value = []
  }

  return { notes, notesCount, addNote, deleteNote, removeAllNotes }
})
