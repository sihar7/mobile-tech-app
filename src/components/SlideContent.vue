<template>
  <div ref="swiperWrapper" class="slide-container">
    <!-- Tombol Fullscreen & Pause -->
    <div class="controls">
      <button @click="toggleFullscreen" class="btn fullscreen-btn">
        <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
      </button>
      <button @click="toggleAutoplay" class="btn play-btn">
        <i :class="isPaused ? 'fas fa-play' : 'fas fa-pause'"></i>
      </button>
    </div>
    <Swiper
      ref="swiperRef"
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="20"
      :navigation="true"
      :pagination="{ clickable: true }"
      :autoplay="autoplayConfig"
      @swiper="setSwiperInstance"
      class="custom-swiper"
    >
     <SwiperSlide v-for="(slide, index) in slides" :key="index">
    <div class="slide-content">
      <img v-if="slide.image" :src="slide.image" alt="Materi" class="slide-image" />
      <div class="slide-text">
        <h3 class="slide-title">{{ slide.title }}</h3>
        <p class="slide-description" v-html="isExpanded[index] ? slide.description : shortenText(slide.description, 300)">
        </p>
        
        <!-- Tombol "Lihat Selengkapnya" untuk teks panjang -->
        <button v-if="slide.description.length > 300" @click="toggleExpand(index)" class="btn toggle-btn">
          {{ isExpanded[index] ? "Tampilkan Ringkas" : "Lihat Selengkapnya" }}
        </button>

        <!-- Tombol "Baca Sumber" jika ada link -->
        <a v-if="slide.link" :href="slide.link" target="_blank" class="btn source-btn">
          Baca Sumber
        </a>
      </div>
    </div>
  </SwiperSlide>
  </Swiper>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const props = defineProps({
  slides: Array,
});

// Refs
const swiperRef = ref(null);
const swiperInstance = ref(null);
const swiperWrapper = ref(null);
const isFullscreen = ref(false);
const isPaused = ref(false);
const isExpanded = ref([]); // Untuk toggle deskripsi panjang

// Konfigurasi Autoplay
const autoplayConfig = computed(() => (isPaused.value ? false : { delay: 4000, disableOnInteraction: false }));

// Simpan Instance Swiper
const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper;
};

// Toggle Fullscreen
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    swiperWrapper.value.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// Toggle Pause/Play
const toggleAutoplay = () => {
  isPaused.value = !isPaused.value;
  if (swiperInstance.value) {
    if (isPaused.value) {
      swiperInstance.value.autoplay.stop();
    } else {
      swiperInstance.value.autoplay.start();
    }
  }
};

// Fungsi untuk mempersingkat teks
const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

// Toggle deskripsi panjang/pendek
const toggleExpand = (index) => {
  isExpanded.value[index] = !isExpanded.value[index];
};

// Tambahkan event listener saat mounted
onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  isExpanded.value = Array(props.slides.length).fill(false);
});

// Hapus event listener saat unmounted
onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});
</script>

<style scoped>
.slide-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: auto;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.custom-swiper {
  width: 100%;
  height: auto;
}

.slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.slide-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
}

.slide-text {
  max-width: 80%;
}

.slide-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.slide-description {
  font-size: 14px;
  color: #555;
  text-align: justify;
}

.toggle-btn {
  margin-top: 10px;
  background-color: #28a745;
}
</style>
