<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-semibold mb-4 text-purple-700">
      Pertemuan {{ $route.params.id }}
    </h2>
    <SlideContent v-if="slides.length" :slides="slides" />
    <p v-else class="text-gray-500">Materi belum tersedia.</p>
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

