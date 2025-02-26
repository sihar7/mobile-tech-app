<template>
  <swiper :pagination="{ clickable: true }" class="w-full">
    <swiper-slide v-for="(slide, index) in slides" :key="index" class="p-4 bg-white rounded shadow">
      <h3 class="text-lg font-semibold">Slide {{ index + 1 }}</h3>
      <p>{{ slide }}</p>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

defineProps({
  slides: Array
});
</script>
