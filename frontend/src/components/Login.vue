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
      class="backdrop-blur-md rounded-lg p-8 max-w-md w-full text-white flex items-center justify-center"
      style="box-shadow: 0 0 20px rgba(0, 0, 0, 0.15)"
    >
      <h1 class="text-3xl font-bold mb-4">Login</h1>
      <v-text-field label="Label" variant="underlined"></v-text-field>
    </div>
  </div>
  </v-app>
</template>
