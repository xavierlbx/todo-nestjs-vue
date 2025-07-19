import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light' as 'light' | 'dark'
  }),
  actions: {
    setTheme(newTheme: 'light' | 'dark') {
      this.theme = newTheme
      this.applyTheme()
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.applyTheme()
    },
    applyTheme() {
      const html = document.documentElement
      if (this.theme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      // Aqui você pode salvar no localStorage se quiser
      localStorage.setItem('theme', this.theme)
    },
    loadTheme() {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        this.theme = savedTheme
      }
      this.applyTheme()
    }
  }
})
