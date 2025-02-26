<template>
  <div class="w-full max-w-4xl mx-auto p-6">
    <!-- Judul Pertemuan -->
    <h2 class="text-2xl font-bold mb-6 text-purple-700">
      Pertemuan {{ $route.params.id }}
    </h2>

    <!-- Konten Slide -->
    <SlideContent v-if="slides.length" :slides="slides" />

    <!-- Pesan Jika Materi Belum Tersedia -->
    <p v-else class="text-gray-500 text-center py-8">
      Materi belum tersedia.
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SlideContent from "@/components/SlideContent.vue";
import { pertemuanData } from "@/data.js";

const route = useRoute();
const slides = computed(() => pertemuanData[route.params.id] || []);

console.log("Slides Data:", slides.value);
</script>