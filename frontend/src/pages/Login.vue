<script setup lang="ts">
import { ref } from 'vue';
import bgImage from '../assets/backgroundAuth.png';
import { useToast } from 'vue-toastification';

const toast = useToast();

interface LoginForm {
  email: string;
  password: string;
}

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const isLogin = ref(true);
const formLogin = ref<LoginForm>({
  email: '',
  password: '',
});

const formSignUp = ref<SignUpForm>({
  email: '',
  password: '',
  confirmPassword: '',
});

function Login() {
  console.log(formLogin.value);
  toast.success('teste');
}

function SignUp() {
  console.log(formSignUp.value);

  /* Valida Email */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formSignUp.value.email)) {
    toast.warning('Email inválido...');
    return;
  }

  /* Valida colisão de senhas */
  const password = formSignUp.value.password;
  const confirmPassword = formSignUp.value.confirmPassword;
  if (password !== confirmPassword) {
    toast.warning('As senhas não coincidem...');
    return;
  }
}

function toggleForm() {
  isLogin.value = !isLogin.value;
}
</script>

<template>
  <v-app>
    <div
      class="relative overflow-hidden min-h-screen flex items-center justify-center bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <Transition name="slide-horizontal" mode="out-in">
        <!-- Login -->
        <div
          v-if="isLogin"
          key="login"
          class="bg-black/5 backdrop-blur-lg rounded-xl h-[60vh] p-12 max-w-md w-full text-white flex flex-col justify-between"
          style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)"
        >
          <!-- Conteúdo LOGIN -->
          <div class="flex flex-col items-center justify-center flex-grow">
            <h1 class="text-6xl font-semibold mb-6 font-baloo">Login</h1>
            <div class="w-full font-nunito">
              <!-- Campos -->
              <div class="flex flex-col gap-0.5 mb-4">
                <label class="text-lg">E-mail</label>
                <input
                  class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                  v-model="formLogin.email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div class="flex flex-col gap-0.5">
                <label class="text-lg">Senha</label>
                <input
                  class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                  v-model="formLogin.password"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>
          </div>
          <!-- Rodapé LOGIN -->
          <div class="flex flex-col items-center mt-6">
            <button
              @click="Login()"
              class="bg-purple-500 font-baloo font-semibold rounded-full py-1.5 px-8 text-xl hover:bg-purple-600 focus:bg-purple-400"
            >
              Entrar
            </button>
            <p class="mt-4">
              Não tem uma conta?
              <a
                @click.prevent="toggleForm"
                class="text-purple-300 underline hover:text-purple-500 focus:text-violet-300 cursor-pointer"
              >
                Cadastrar
              </a>
            </p>
          </div>
        </div>

        <!-- --------------------------------------- -->

        <!-- Cadastro -->
        <div
          v-else
          key="cadastro"
          class="bg-black/5 backdrop-blur-lg rounded-xl h-[65vh] p-12 max-w-md w-full text-white flex flex-col justify-between"
          style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)"
        >
          <!-- Conteúdo CADASTRO -->
          <div class="flex flex-col items-center justify-center flex-grow">
            <h1 class="text-6xl font-semibold mb-6 font-baloo">Cadastro</h1>
            <div class="w-full font-nunito">
              <!-- Campos -->
              <div class="flex flex-col gap-0.5 mb-4">
                <label class="text-lg">E-mail</label>
                <input
                  class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                  v-model="formSignUp.email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div class="flex flex-col gap-0.5 mb-4">
                <label class="text-lg">Senha</label>
                <input
                  class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                  v-model="formSignUp.password"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>
              <div class="flex flex-col gap-0.5">
                <label class="text-lg">Confirmar senha</label>
                <input
                  class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                  v-model="formSignUp.confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                />
              </div>
            </div>
          </div>
          <!-- Rodapé CADASTRO -->
          <div class="flex flex-col items-center mt-6">
            <button
              @click="SignUp()"
              class="bg-purple-500 font-baloo font-semibold rounded-full py-1.5 px-8 text-xl hover:bg-purple-600 focus:bg-purple-400"
            >
              Cadastrar
            </button>
            <p class="mt-4">
              Já possui uma conta?
              <a
                @click.prevent="toggleForm"
                class="text-purple-300 underline hover:text-purple-500 focus:text-violet-300 cursor-pointer"
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
