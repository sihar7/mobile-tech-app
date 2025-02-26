<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
      <h2 class="text-3xl font-extrabold text-gray-800 mb-4 animate__animated animate__fadeIn">
        Selamat Datang!
      </h2>
      <p class="text-gray-600 mb-6 text-lg leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
        Ini adalah halaman pembuka sebelum menuju ke daftar pertemuan. Kami senang bisa menyambut Anda!
      </p>
      <button
        @click="goToPasswordPage"
        class="bg-blue-600 text-white text-lg p-3 rounded-lg w-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-2s"
      >
        Masuk
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

const goToPasswordPage = () => {
  emit('go-to-password');
};
</script>

<style scoped>
/* Menambahkan animasi untuk elemen */
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>
