<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-semibold mb-4">Pertemuan {{ $route.params.id }}</h2>
    <SlideContent :slides="slides" />
  </div>
</template>

<script setup>
import SlideContent from '@/components/SlideContent.vue';

const slides = [
  "Pendahuluan Mobile Teknologi",
  "Sejarah Perkembangan Mobile",
  "Tren Teknologi Masa Kini"
];
</script>
