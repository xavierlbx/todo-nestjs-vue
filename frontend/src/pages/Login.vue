<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import backgroundLightLogin from '../assets/bgLightLogin.png';
import backgroundDarkLogin from '../assets/bgDarkLogin.png';
import { useToast } from 'vue-toastification';
import api from '../api/axios.js';
import router from '@/router/index.js';
import { useThemeStore } from '@/stores/theme.js';

interface LoginForm {
  email: string;
  password: string;
}
interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const themeStore = useThemeStore();
const toast = useToast();
const isLogin = ref(true);
const formLogin = ref<LoginForm>({
  email: '',
  password: '',
});
const bgImage = ref<string>('');
const formSignUp = ref<SignUpForm>({
  email: '',
  password: '',
  confirmPassword: '',
});

watch(
  () => themeStore.theme,
  (newTheme) => {
    bgImage.value = newTheme === 'light' ? backgroundLightLogin : backgroundDarkLogin;
  },
  { immediate: true }
);

const Login = async () => {
  const { email, password } = formLogin.value;

  if (!email || !password) {
    if (!email) toast.error('É necessário informar seu email');
    if (!password) toast.error('É necessário informar sua senha');
    return;
  }

  try {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.access_token);
    toast.success('Seja Bem Vindo!');
    router.push('/todo');
  } catch (error: any) {
    const { status } = error;
    if (status === 400 || 401) {
      toast.error('Verifique suas credenciais');
    } else {
      toast.error('Estamos com problemas... Tente novamente');
    }
  }
};

const SignUp = async () => {
  const { email, password, confirmPassword } = formSignUp.value;

  if (!email || !password || !confirmPassword) {
    if (!email) toast.error('É necessário informar seu email');
    if (!password) toast.error('É necessário informar sua senha');
    if (!confirmPassword) toast.error('É necessário confirmar sua senha');
    return;
  }

  /* Valida Email */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.warning('Email inválido...');
    return;
  }

  /* Valida senhas */
  if (password !== confirmPassword) {
    toast.warning('As senhas não coincidem');
    return;
  }

  try {
    await api.post('users', { email, password });
    toast.success('Usuário criado com sucesso!');
    isLogin.value = true;
  } catch (error: any) {
    const { status } = error;
    if (status === 400) {
      toast.error('Verifique suas credenciais');
    } else {
      toast.error('Estamos com problemas... Tente novamente');
    }
  }
};

const toggleForm = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <v-app>
    <div
      class="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <Transition name="slide-horizontal" mode="out-in">
        <!-- Login -->
        <div
          v-if="isLogin"
          key="login"
          class="text-paragraph dark:text-darkHeadline flex h-[60vh] w-full max-w-md flex-col justify-between rounded-xl bg-black/5 p-12 backdrop-blur-xl"
          style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)"
        >
          <!-- Conteúdo LOGIN -->
          <div class="flex flex-grow flex-col items-center justify-center">
            <h1 class="font-baloo dark:text-darkHeadline mb-6 text-6xl font-bold">Login</h1>
            <div class="font-nunito w-full">
              <!-- Campos -->
              <div class="mb-4 flex flex-col gap-0.5">
                <label
                  class="text-paragraph dark:text-darkSecondary text-lg font-bold dark:font-semibold"
                  >E-mail</label
                >
                <input
                  class="border-paragraph dark:border-darkParagraph rounded-xl border bg-black/10 py-2 ps-4 hover:border-amber-800 hover:bg-white/5 focus:bg-purple-500/10"
                  v-model="formLogin.email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div class="flex flex-col gap-0.5">
                <label class="text-paragraph dark:text-darkSecondary text-lg dark:font-semibold"
                  >Senha</label
                >
                <input
                  class="border-paragraph dark:border-darkParagraph rounded-xl border bg-black/10 py-2 ps-4 hover:border-amber-800 hover:bg-white/5 focus:bg-purple-500/10"
                  v-model="formLogin.password"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
          </div>
          <!-- Rodapé LOGIN -->
          <div class="mt-6 flex flex-col items-center">
            <button
              @click="Login()"
              class="font-baloo dark:bg-darkSecondary bg-DarkOrange bg--500 hover:bg-paragraph focus:bg-secondary cursor-pointer rounded-full px-8 py-1.5 text-xl font-semibold text-white hover:scale-105 hover:dark:bg-violet-600 active:dark:bg-purple-500"
            >
              Entrar
            </button>
            <p class="mt-4">
              Não tem uma conta?
              <a
                @click.prevent="toggleForm"
                class="dark:text-darkParagraph text-paragraph hover:text-headline focus:text-secondary cursor-pointer underline hover:scale-105"
              >
                Cadastrar
              </a>
            </p>
          </div>
        </div>

        <!-- --------------------------------------------------------------------- -->

        <!-- Cadastro -->
        <div
          v-else
          key="cadastro"
          class="text-paragraph dark:text-darkHeadline flex h-[60vh] w-full max-w-md flex-col justify-between rounded-xl bg-black/5 p-12 backdrop-blur-lg"
          style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)"
        >
          <!-- Conteúdo CADASTRO -->
          <div class="flex flex-grow flex-col items-center justify-center">
            <h1 class="font-baloo dark:text-darkHeadline mb-6 text-6xl font-bold">Cadastro</h1>
            <div class="font-nunito w-full">
              <!-- Campos -->
              <div class="mb-4 flex flex-col gap-0.5">
                <label
                  class="text-paragraph dark:text-darkSecondary text-lg font-bold dark:font-semibold"
                  >E-mail</label
                >
                <input
                  class="border-paragraph dark:border-darkParagraph rounded-xl border bg-black/10 py-2 ps-4 hover:border-amber-800 hover:bg-white/5 focus:bg-purple-500/10"
                  v-model="formSignUp.email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div class="mb-4 flex flex-col gap-0.5">
                <label
                  class="text-paragraph dark:text-darkSecondary text-lg font-bold dark:font-semibold"
                  >Senha</label
                >
                <input
                  class="border-paragraph dark:border-darkParagraph rounded-xl border bg-black/10 py-2 ps-4 hover:border-amber-800 hover:bg-white/5 focus:bg-purple-500/10"
                  v-model="formSignUp.password"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>
              <div class="flex flex-col gap-0.5">
                <label
                  class="text-paragraph dark:text-darkSecondary text-lg font-bold dark:font-semibold"
                  >Confirmar senha</label
                >
                <input
                  class="border-paragraph dark:border-darkParagraph rounded-xl border bg-black/10 py-2 ps-4 hover:border-amber-800 hover:bg-white/5 focus:bg-purple-500/10"
                  v-model="formSignUp.confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                />
              </div>
            </div>
          </div>
          <!-- Rodapé CADASTRO -->
          <div class="mt-6 flex flex-col items-center">
            <button
              @click="SignUp()"
              class="font-baloo dark:bg-darkSecondary bg-DarkOrange bg--500 hover:bg-paragraph focus:bg-secondary cursor-pointer rounded-full px-8 py-1.5 text-xl font-semibold text-white hover:scale-105 hover:dark:bg-violet-600 active:dark:bg-purple-500"
            >
              Cadastrar
            </button>
            <p class="mt-4">
              Já possui uma conta?
              <a
                @click.prevent="toggleForm"
                class="dark:text-darkParagraph text-paragraph hover:text-headline focus:text-secondary cursor-pointer underline hover:scale-105"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </v-app>
</template>

<style scoped>
.login-container {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  height: 60vh;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  color: white;
  padding: 3rem;
  max-width: 28rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-container::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4); /* uniforme em toda a área */
  z-index: 0;
}

.login-container > * {
  position: relative;
  z-index: 1;
}

.slide-horizontal-enter-active,
.slide-horizontal-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-horizontal-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-horizontal-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
