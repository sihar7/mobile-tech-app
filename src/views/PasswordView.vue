<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-center mb-6">Masukkan Password</h2>
      <input
        v-model="password"
        type="password"
        class="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        :disabled="loading"
      />
      <button
        @click="checkPassword"
        class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        :disabled="loading"
      >
        Masuk
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Swal from 'sweetalert2';

// Mendeklarasikan emit untuk mengirim event
const emit = defineEmits();

// Variabel untuk input password, status error, dan loading
const password = ref('');
const error = ref(false);
const loading = ref(false);
const correctPassword = '12345'; // Ganti dengan password yang kamu inginkan

// Fungsi untuk memeriksa password
const checkPassword = () => {
  error.value = false;
  loading.value = true;

  NProgress.start(); // Mulai NProgress

  // Simulasi pengecekan password (bisa diganti dengan API call)
  setTimeout(() => {
    if (password.value === correctPassword) {
      // Emit event jika password benar
      emit('password-correct');
    } else {
      // Menampilkan SweetAlert2 ketika password salah
      Swal.fire({
        icon: 'error',
        title: 'Password Salah',
        text: 'Coba lagi!',
      });
    }

    loading.value = false;
    NProgress.done(); // Selesai NProgress
  }, 1000); // Simulasi loading 1 detik
};
</script>

<style scoped>
/* Mengubah warna NProgress sesuai dengan tema */
#nprogress .bar {
  background: #3b82f6 !important;
}
</style>
