<script setup lang="ts">
import bgImage from "../assets/backgroundAuth.png";
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div
      class="bg-black/2 backdrop-blur-md rounded-xl h-3/4 p-12 max-w-md w-full text-white flex items-center justify-center flex-col gap-4"
      style="box-shadow: 0 0 30px rgba(0, 0, 0, 0.5)"
    >
      <h1 class="text-5xl font-bold mb-4 font-baloo">Login</h1>
      <!-- forms -->
      <div class="w-full h-full font-nunito mb-7">
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
            type="email"
            placeholder="Digite sua senha"
          />
        </div>
      </div>
      <button
        class="bg-purple-500 font-baloo font-semibold rounded-full py-1.5 px-8 mt-10 text-xl hover:bg-purple-600 hover:text-xl focus:bg-purple-400"
      >
        Entrar
      </button>
      <p>
        Não tem uma conta?
        <a class="text-purple-300 underline" href="">Cadastrar</a>
      </p>
    </div>
  </div>
</template>
