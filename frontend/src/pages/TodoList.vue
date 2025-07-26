<script setup lang="ts">
import { onMounted, ref } from 'vue';
import backgroundTodo from '../assets/backgroundTodo.png';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem, Dialog } from '@headlessui/vue';
import api from '../api/axios.js';
import { useToast } from 'vue-toastification';

interface formCreateTodo {
  title: string;
  description: string;
  dueData?: string | null;
}

const toast = useToast();
const dados = ref();
const isOpen = ref(false);
const formCreateTodo = ref<formCreateTodo>({
  title: '',
  description: '',
  dueData: '',
});

onMounted(() => {
  searchTasks();
});

const addTask = () => {
  isOpen.value = true;
  console.log('task adicionada');
};

const searchTasks = async () => {
  try {
    const { data } = await api.get('/todos');
    toast.success('Tarefas retornadas');
    dados.value = data;
    console.log(data);
  } catch (error) {
    toast.error('Problema ao pesquisar tarefas');
  }
};

const createTask = async () => {
  const params = {
    title: formCreateTodo.value.title,
  };
  try {
    const result = await api.post('/todos', params);
    toast.success('Tarefa adicionada com sucesso!');
    isOpen.value = false;
    searchTasks();
    return result;
  } catch (error) {
    toast.error('Não conseguimos criar');
  }
};

const handleCheckboxChange = async (event: Event, dado: any) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  console.log('Checkbox clicado:', dado, 'Marcado?', isChecked);

  const update = {
    ...dado,
    done: isChecked,
  };
  console.log('Atualizando tarefa:', dado.id, 'com', update);

  try {
    await api.patch(`/todos/${dado.id}`, update);
    toast.success('Tarefa atualizada com sucesso!');
    searchTasks();
  } catch (error) {
    toast.error('Erro ao atualizar tarefa');
  }
}

function setIsOpen(value) {
  isOpen.value = value;
}
</script>

<template>
  <v-app>
    <div
      class="relative w-full overflow-hidden min-h-screen flex items-center justify-center bg-cover bg-center"
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
        <h1 class="text-4xl font-semibold font-baloo mb-5">Tarefas</h1>

        <!-- Pesquisa e Menu -->
        <div class="w-full flex flex-row items-center justify-center gap-3 font-nunito">
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
        <div class="mt-5 w-full gap-3">
          <div
            v-for="(dado, index) in dados"
            :key="index"
            class="h-[5vh] w-full flex flex-row items-center justify-start bg-neutral-700 mb-4 rounded-xl gap-3 ps-4"
          >
            <input
              type="checkbox"
              class="w-5 h-5 accent-purple-500"
              :value="dado.id"
              :checked="dado.done"
              @change="handleCheckboxChange($event, dado)"
            />
            <h3
              class="text-xl font-semibold font-nunito truncate max-w-[80%] overflow-hidden whitespace-nowrap"
            >
              {{ dado.title }}
            </h3>
          </div>
        </div>

        <!-- Icone de Adicionar tarefas -->
        <div
          class="absolute bottom-10 right-10 flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hover:scale-110 rounded-full hover:bg-purple-600 bg-purple-500 active:bg-violet-700"
          @click="addTask()"
        >
          <PlusIcon class="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" />
        </div>

        <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div class="w-full fixed inset-0 flex items-center justify-center p-4">
            <div
              class="w-full max-w-md rounded bg-white p-6 text-black flex flex-col items-center justify-center gap-4"
            >
              <input
                class="w-full border border-stone-500 ps-3 py-2 rounded-lg"
                v-model="formCreateTodo.title"
                type="text"
                placeholder="Digite o título da tarefa"
              />
              <div class="flex flex-row justify-center gap-4">
                <button class="text-white font-semibold bg-stone-500 rounded-full px-3 py-1">
                  Voltar
                </button>
                <button
                  @click="createTask()"
                  class="text-white font-semibold bg-purple-500 rounded-full px-3 py-1"
                >
                  Adicionar tarefa
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  </v-app>
</template>

<style scoped></style>
