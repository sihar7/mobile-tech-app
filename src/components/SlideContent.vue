<template>
  <div class="sidebar-accordion-container">
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>

    <!-- Tombol Fullscreen -->
    <div class="controls">
      <button @click="toggleFullscreen" class="btn fullscreen-btn">
        <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
      </button>
    </div>

    <!-- Layout Sidebar dan Konten -->
    <div class="sidebar-layout">
      <!-- Sidebar -->
      <div class="sidebar">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="sidebar-item"
          :class="{ active: activeIndex === index }"
          @click="toggleAccordion(index)"
        >
          <span class="slide-badge">Materi {{ index + 1 }}</span>
          <h3 class="slide-title">{{ slide.title }}</h3>
        </div>
      </div>

      <!-- Konten -->
      <div class="content">
       <div v-if="activeIndex !== null" class="accordion-content" :key="activeIndex">
        <!-- Gambar Materi -->
        <img
          v-if="slides[activeIndex].image"
          :src="slides[activeIndex].image"
          alt="Materi"
          class="slide-image"
        />

        <!-- Deskripsi Materi -->
        <p
          class="slide-description"
          v-html="
            isExpanded[activeIndex]
              ? slides[activeIndex].description
              : shortenText(slides[activeIndex].description, 300)
          "
        ></p>

        <!-- Tombol "Lihat Selengkapnya" untuk teks panjang -->
        <button
          v-if="slides[activeIndex].description.length > 300"
          @click="toggleExpand(activeIndex)"
          class="btn toggle-btn"
          style="float: right;"
        >
          {{ isExpanded[activeIndex] ? "Tampilkan Ringkas" : "Lihat Selengkapnya" }}
        </button>
      </div>
        <div v-else class="empty-content">
          <p>Pilih materi dari sidebar untuk melihat konten.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  slides: Array,
});

// Refs
const activeIndex = ref(null);
const isExpanded = ref([]);
const isFullscreen = ref(false);

// Progress bar calculation
const progressPercentage = computed(() => {
  if (!props.slides || props.slides.length === 0) return 0;
  return ((activeIndex.value + 1) / props.slides.length) * 100;
});

// Toggle Accordion
const toggleAccordion = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null; // Tutup materi jika diklik lagi
  } else {
    activeIndex.value = index; // Buka materi baru
    isExpanded.value[index] = false; // Reset state isExpanded untuk materi baru
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

// Toggle Fullscreen
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

watch(activeIndex, (newIndex) => {
  if (newIndex !== null) {
    // Reset state isExpanded untuk materi baru
    isExpanded.value[newIndex] = false;
  }
});

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
/* Kontainer Utama */
.sidebar-accordion-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Progress Bar */
.progress-bar {
  height: 5px;
  background: #e0e0e0;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease-in-out;
}

/* Tombol Kontrol */
.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

/* Layout Sidebar dan Konten */
.sidebar-layout {
  display: flex;
  gap: 20px;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.sidebar-item {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

.sidebar-item:hover {
  background: #f1f1f1;
}

.sidebar-item.active {
  background: #007bff;
  color: white;
}

.sidebar-item.active .slide-badge {
  background: white;
  color: #007bff;
}

.sidebar-item.active .slide-title {
  color: white;
}

.slide-badge {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
}

.slide-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0;
  color: #2c3e50;
}

/* Konten */
.content {
  flex: 1;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.empty-content {
  text-align: center;
  color: #555;
  font-size: 16px;
}

/* Gambar */
.slide-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
}

/* Deskripsi */
.slide-description {
  font-size: 16px;
  color: #555;
  text-align: justify;
}

.toggle-btn {
  margin-top: 10px;
  background-color: #28a745;
}
</style>