<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// Carrega o tema salvo ao montar o componente
themeStore.loadTheme()
</script>

<template>
  <div
    class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    aria-label="Toggle dark/light mode"
  >
  <div class="flex bg-gray-100 dark:bg-gray-700 rounded-full">
    <button
      @click="themeStore.setTheme('light')"
      :class="[
        'px-4 py-1 rounded-full',
        themeStore.theme === 'light' ? 'bg-purple-600 text-white text-lg px-6' : 'bg-white dark:bg-gray-700 text-gray-500'
      ]"
    >
      Light
    </button>
    <button
      @click="themeStore.setTheme('dark')"
      :class="[
        'px-4 py-1 rounded-full',
        themeStore.theme === 'dark' ? 'bg-purple-600 text-white text-lg px-6' : 'bg-white dark:bg-gray-700 text-gray-800'
      ]"
    >
      Dark
    </button>
  </div>
  </div>
</template>
