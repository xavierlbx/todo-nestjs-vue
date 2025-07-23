<script setup lang="ts">
import backgroundTodo from '../assets/backgroundTodo.png';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

const addTask = () => {
  console.log('task adicionada');
};
</script>

<template>
  <v-app>
    <div
      class="relative overflow-hidden min-h-screen flex items-center justify-center bg-cover bg-center"
      :style="{ backgroundImage: `url(${backgroundTodo})` }"
    >
      <div
        class="bg-black/5 backdrop-blur-lg rounded-xl h-[100vh] p-12 max-w-lg w-full text-white flex flex-col items-center"
        style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)"
      >
        <!-- Botão de Sair -->
        <div class="w-full flex flex-row justify-end">
          <p class="font-semibold underline hover:text-lg hover:text-sky-400">Sair</p>
        </div>

        <!-- Título de Tarefas -->
        <h1 class="text-4xl font-semibold mb-5">Tarefas</h1>

        <!-- Pesquisa e Menu -->
        <div class="w-full flex flex-row items-center justify-center gap-3">
          <!-- Menu Dropdown -->
          <Menu as="div" class="relative">
            <MenuButton
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black/20 rounded-md hover:bg-black/30 focus:outline-none"
            >
              Menu
              <ChevronDownIcon class="w-5 h-5 ml-2" />
            </MenuButton>
            <MenuItems
              class="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none z-50"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Perfil
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-violet-500 text-white' : 'text-gray-900',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]"
                  >
                    Configurações
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          <!-- Pesquisar -->
          <div class="w-full relative">
            <MagnifyingGlassIcon
              class="w-5 h-5 text-white absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
            <input
              class="w-full ps-10 border border-stone-500 rounded-full bg-black/10 py-1 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10 text-white"
              type="text"
              placeholder="Pesquisar"
            />
          </div>
        </div>

        <!-- Lista de Tarefas -->
        <div></div>

        <!-- Icone de Adicionar tarefas -->
        <div
          class="absolute bottom-10 right-10 flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:scale-110 rounded-full hover:bg-purple-600 bg-purple-500 active:bg-violet-700"
          @click="addTask()"
        >
          <PlusIcon class="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" />
        </div>
      </div>
    </div>
  </v-app>
</template>

<style scoped></style>
