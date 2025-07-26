<script setup lang="ts">
import { onMounted, ref } from 'vue';
import backgroundTodo from '../assets/backgroundTodo.png';
import { MagnifyingGlassIcon, ChevronDownIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem, Dialog } from '@headlessui/vue';
import api from '../api/axios.js';
import { useToast } from 'vue-toastification';
import router from '@/router/index.js';

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

const logOut = () => {
  localStorage.removeItem('token');
  router.push('/');
  console.log('Usuário deslogado');
  toast.success('Você saiu com sucesso!');
};

const addTask = () => {
  isOpen.value = true;
  console.log('task adicionada');
};

const searchTasks = async () => {
  try {
    const { data } = await api.get('/todos');
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

const handleDelete = async (dado: any) => {
  try {
    await api.delete(`/todos/${dado.id}`);
    toast.success('Tarefa deletada com sucesso!');
    searchTasks();
  } catch (error) {
    toast.error('Erro ao deletar tarefa');
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
};

function setIsOpen(value) {
  isOpen.value = value;
}
</script>

<template>
  <v-app>
    <div
      class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center"
      :style="{ backgroundImage: `url(${backgroundTodo})` }"
    >
      <div
        class="flex h-[100vh] w-full max-w-lg flex-col items-center rounded-xl bg-black/5 p-12 text-white backdrop-blur-lg"
        style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)"
      >
        <!-- Botão de Sair -->
        <div @click="logOut()" class="flex w-full flex-row justify-end">
          <p class="font-semibold underline hover:text-lg hover:text-sky-400">Sair</p>
        </div>

        <!-- Título de Tarefas -->
        <h1 class="font-baloo mb-5 text-4xl font-semibold">Tarefas</h1>

        <!-- Pesquisa e Menu -->
        <div class="font-nunito flex w-full flex-row items-center justify-center gap-3">
          <!-- Menu Dropdown -->
          <Menu as="div" class="relative">
            <MenuButton
              class="inline-flex items-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none"
            >
              Menu
              <ChevronDownIcon class="ml-2 h-5 w-5" />
            </MenuButton>
            <MenuItems
              class="absolute right-0 z-50 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
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
          <div class="relative w-full">
            <MagnifyingGlassIcon
              class="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-white"
            />
            <input
              class="w-full rounded-full border border-stone-500 bg-black/10 py-1 ps-10 text-white hover:border-violet-400 hover:bg-black/20 focus:bg-purple-500/10"
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
            class="mb-4 flex h-[5vh] w-full flex-row items-center justify-between gap-3 rounded-xl bg-neutral-700 ps-4"
          >
            <div class="flex w-full flex-row items-center justify-start gap-3 overflow-hidden">
              <input
                type="checkbox"
                class="h-5 w-5 accent-purple-500"
                :value="dado.id"
                :checked="dado.done"
                @change="handleCheckboxChange($event, dado)"
              />
              <h3
                class="font-nunito max-w-[80%] truncate overflow-hidden text-xl font-semibold whitespace-nowrap"
              >
                {{ dado.title }}
              </h3>
            </div>
            <TrashIcon @click="handleDelete(dado)" class="me-3 h-5 w-5" />
          </div>
        </div>

        <!-- Icone de Adicionar tarefas -->
        <div
          class="absolute right-10 bottom-10 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 hover:scale-110 hover:bg-purple-600 active:bg-violet-700 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12"
          @click="addTask()"
        >
          <PlusIcon class="h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-9 lg:w-9" />
        </div>

        <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div class="fixed inset-0 flex w-full items-center justify-center p-4">
            <div
              class="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded bg-white p-6 text-black"
            >
              <input
                class="w-full rounded-lg border border-stone-500 py-2 ps-3"
                v-model="formCreateTodo.title"
                type="text"
                placeholder="Digite o título da tarefa"
              />
              <div class="flex flex-row justify-center gap-4">
                <button class="rounded-full bg-stone-500 px-3 py-1 font-semibold text-white">
                  Voltar
                </button>
                <button
                  @click="createTask()"
                  class="rounded-full bg-purple-500 px-3 py-1 font-semibold text-white"
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
