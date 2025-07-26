<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline';

const themeStore = useThemeStore();

// Carrega o tema salvo ao montar o componente
themeStore.loadTheme();
</script>

<template>
  <div
    class="fixed top-4 left-1/2 z-50 -translate-x-1/2 transform"
    aria-label="Toggle dark/light mode"
  >
    <div class="flex rounded-full bg-gray-100 dark:bg-gray-700">
      <button
        @click="themeStore.setTheme('light')"
        :class="[
          'rounded-full px-2 py-1',
          themeStore.theme === 'light'
            ? 'bg-purple-600 px-3 p-2 text-lg text-white'
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700',
        ]"
      >
        <SunIcon class="h-5 w-5" />
      </button>
      <button
        @click="themeStore.setTheme('dark')"
        :class="[
          'rounded-full px-2 py-1',
          themeStore.theme === 'dark'
            ? 'bg-purple-600 px-3 p-2 text-lg text-white'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700',
        ]"
      >
        <MoonIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>
