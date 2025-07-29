<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import backgroundLightTodo from '../assets/backgroundLightTodo.png';
import backgroundDarkTodo from '../assets/backgroundDarkTodo.png';
import { MagnifyingGlassIcon, ChevronDownIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { PlusIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem, Dialog } from '@headlessui/vue';
import api from '../api/axios.js';
import { useToast } from 'vue-toastification';
import router from '@/router/index.js';
import { useThemeStore } from '@/stores/theme.js';

interface formCreateTodo {
  title: string;
  description: string;
  dueData?: string | null;
}

const themeStore = useThemeStore();
const bgImage = ref<string>();
const toast = useToast();
const dados = ref();
const isOpen = ref(false);
const formCreateTodo = ref<formCreateTodo>({
  title: '',
  description: '',
  dueData: '',
});

watch(
  () => themeStore.theme,
  (newTheme) => {
    bgImage.value = newTheme === 'light' ? backgroundLightTodo : backgroundDarkTodo;
  },
  { immediate: true }
);

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
      :style="{ backgroundImage: `url(${bgImage})` }"
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
        <h1 class="font-baloo text-paragraph dark:text-background mb-5 text-5xl font-bold">
          Tarefas
        </h1>

        <!-- Pesquisa e Menu -->
        <div class="font-nunito flex w-full flex-row items-center justify-center gap-3">

          <!-- Pesquisar -->
          <div class="relative w-full">
            <MagnifyingGlassIcon
              class="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-white"
            />
            <input
              class="border-DarkOrange hover:border-paragraph dark:border-darkSecondary w-full rounded-full border bg-black/10 py-1 ps-10 text-white hover:bg-black/15 focus:border-2 focus:outline-none hover:dark:border-purple-500"
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
            class="bg-background dark:bg-darkBackground mb-4 flex h-[5vh] w-full flex-row items-center justify-between gap-3 rounded-xl ps-4"
          >
            <div class="flex w-full flex-row items-center justify-start gap-3 overflow-hidden">
              <input
                type="checkbox"
                class="accent-DarkOrange dark:accent-darkSecondary h-6 w-6 hover:scale-105 focus:border-0"
                :value="dado.id"
                :checked="dado.done"
                @change="handleCheckboxChange($event, dado)"
              />
              <h3
                class="font-nunito text-paragraph dark:text-background max-w-[80%] truncate overflow-hidden text-xl font-semibold whitespace-nowrap"
              >
                {{ dado.title }}
              </h3>
            </div>
            <TrashIcon
              @click="handleDelete(dado)"
              class="me-3 h-6 w-6 cursor-pointer text-red-500 hover:scale-110 hover:text-red-600"
            />
          </div>
        </div>

        <!-- Icone de Adicionar tarefas -->
        <div
          class="bg-secondary dark:bg-darkSecondary active:bg-paragraph absolute right-10 bottom-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition hover:scale-115 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 active:dark:bg-violet-700"
          @click="addTask()"
        >
          <PlusIcon
            class="text-paragraph dark:text-background h-8 w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-9 lg:w-9"
          />
        </div>

        <!-- Modal de adicionar tarefa -->
        <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div class="fixed inset-0 flex w-full items-center justify-center p-4">
            <div
              class="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded bg-white p-6 text-black"
            >
              <input
                class="border-paragraph dark:border-darkSecondary focus:border-secondary focus:dark:border-darkSecondary w-full rounded-xl border bg-black/10 py-2 ps-4 hover:border-amber-800 hover:bg-white/5 focus:border-3 focus:outline-none"
                v-model="formCreateTodo.title"
                type="text"
                placeholder="Digite o título da tarefa"
              />
              <div class="flex flex-row justify-center gap-4">
                <button
                  @click="setIsOpen(false)"
                  class="dark:bg-darkBackground rounded-full bg-stone-500 px-3 py-1 font-semibold text-white hover:scale-105"
                >
                  Voltar
                </button>
                <button
                  @click="createTask()"
                  class="bg-paragraph text-background dark:bg-darkSecondary rounded-full px-3 py-1 font-semibold hover:scale-105"
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
