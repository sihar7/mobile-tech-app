<template>
  <div>
    <!-- Tampilkan halaman pembuka jika belum memasukkan password -->
    <IntroPage v-if="showIntro" @go-to-password="showPasswordPage" />

    <!-- Tampilkan halaman password jika sedang di tahap password -->
    <PasswordPage v-if="showPassword" @password-correct="displayWeekSelector" />

    <!-- Tampilkan WeekSelector setelah password benar -->
    <div v-if="showWeekSelector">
      <h2 class="text-xl font-semibold mb-4">Daftar Pertemuan</h2>
      <WeekSelector />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import IntroPage from "@/views/IntroView.vue";
import PasswordPage from "@/views/PasswordView.vue";
import WeekSelector from '@/components/WeekSelector.vue';

const showIntro = ref(false); // Halaman pembuka
const showPassword = ref(false); // Halaman password
const showWeekSelector = ref(false); // Halaman WeekSelector setelah password benar

// Mengecek status saat aplikasi dimuat
onMounted(() => {
  const passwordStatus = localStorage.getItem('passwordStatus');
  
  if (passwordStatus === 'true') {
    showWeekSelector.value = true;
  } else {
    showIntro.value = true;
  }
});

// Fungsi untuk menampilkan halaman password
const showPasswordPage = () => {
  showIntro.value = false;
  showPassword.value = true;
};

// Fungsi untuk menampilkan WeekSelector setelah password benar
const displayWeekSelector = () => {
  showPassword.value = false;
  showWeekSelector.value = true;
  localStorage.setItem('passwordStatus', 'true'); // Menyimpan status bahwa password sudah benar
};
</script>
