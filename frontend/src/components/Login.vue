<script setup lang="ts">
import bgImage from "../assets/backgroundAuth.png";
</script>

<template>
  <v-app>
    <div
      class="min-h-screen flex items-center justify-center bg-cover bg-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div
        class="bg-black/5 backdrop-blur-lg rounded-xl h-[60vh] p-12 max-w-md w-full text-white flex flex-col justify-between"
        style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)"
      >
        <!-- Conteúdo central -->
        <div class="flex flex-col items-center justify-center flex-grow">
          <h1 class="text-6xl font-semibold mb-6 font-baloo">Login</h1>
          <div class="w-full font-nunito">
            <div class="flex flex-col gap-0.5 mb-4">
              <label class="text-lg">E-mail</label>
              <input
                class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                type="email"
                placeholder="Digite seu email"
              />
            </div>
            <div class="flex flex-col gap-0.5">
              <label class="text-lg">Senha</label>
              <input 
                class="border border-violet-500 rounded-xl bg-black/10 ps-4 py-2 hover:bg-black/20 hover:border-violet-400 focus:bg-purple-500/10"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
          </div>
        </div>

        <!-- Rodapé fixo no fim -->
        <div class="flex flex-col items-center mt-6">
          <button
            class="bg-purple-500 font-baloo font-semibold rounded-full py-1.5 px-8 text-xl hover:bg-purple-600 focus:bg-purple-400"
          >
            Entrar
          </button>
          <p class="mt-4">
            Não tem uma conta?
            <a
              class="text-purple-300 underline hover:text-purple-500 focus:text-violet-300"
              href=""
              >Cadastrar</a
            >
          </p>
        </div>
      </div>
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
  content: "";
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
</style>
