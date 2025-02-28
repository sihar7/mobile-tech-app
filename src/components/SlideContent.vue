<template>
  <div class="sidebar-accordion-container">
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>

    <!-- Fullscreen Button -->
    <div class="controls">
      <button @click="toggleFullscreen" class="btn bg-white/20 backdrop-blur-md hover:bg-white/30">
        <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
      </button>
    </div>

    <!-- Sidebar and Content Layout -->
    <div class="sidebar-layout">
      <!-- Sidebar -->
      <div :class="['sidebar', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
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

      <!-- Content -->
      <div :class="['content', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
        <div v-if="activeIndex !== null" class="accordion-content" :key="activeIndex">
          <!-- Slide Image -->
          <img
            v-if="slides[activeIndex].image"
            :src="slides[activeIndex].image"
            alt="Materi"
            class="slide-image"
          />
          <!-- Slide Video (YouTube) -->
          <div v-if="slides[activeIndex].video" class="video-container">
            <youtube
              :video-id="getYouTubeVideoId(slides[activeIndex].video)"
              :player-vars="playerVars"
              width="100%"
              height="400"
            ></youtube>
          </div>

          <!-- Slide Description -->
          <p
            class="slide-description"
            v-html="
              isExpanded[activeIndex]
                ? slides[activeIndex].description
                : shortenText(slides[activeIndex].description, 300)
            "
          ></p>

          <!-- Code Block -->
          <CodeBlock 
            v-if="slides[activeIndex].code && slides[activeIndex].language" 
            :code="slides[activeIndex].code" 
            :language="slides[activeIndex].language" 
          />

          <!-- Expand/Collapse Button -->
          <button
            v-if="slides[activeIndex].description.length > 300"
            @click="toggleExpand(activeIndex)"
            class="btn toggle-btn"
            :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'"
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
import { ref, computed, onMounted, onUnmounted, watch, inject } from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import { Youtube } from 'vue3-youtube';
const props = defineProps({
  slides: {
    type: Array,
    default: () => [], // Mencegah null/undefined
  },
});

// Refs
const activeIndex = ref(null);
const isExpanded = ref([]);
const isFullscreen = ref(false);

const isDarkMode = inject('isDarkMode');
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

// Fungsi untuk mengekstrak video ID dari URL YouTube
const getYouTubeVideoId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
};

// Opsi pemutar YouTube
const playerVars = {
  autoplay: 0, // Tidak autoplay
  controls: 1, // Tampilkan kontrol
};
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
  flex-direction: row;
  gap: 20px;
}

/* Sidebar */
.sidebar {
  width: 250px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  flex: 0 0 250px; /* Sidebar lebar tetap 250px */
  overflow-y: auto; /* Scroll jika konten terlalu panjang */
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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto; 
}

.empty-content {
  text-align: center;
  color: #555;
  font-size: 16px;
}

/* Gambar */
.slide-image {
  max-width: 100%;
  height: auto; 
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
  display: block;
  margin: 20px 0;
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

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin: 20px 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .sidebar-layout {
    flex-direction: column; /* Sidebar dan content ditumpuk secara vertikal */
  }

  .sidebar {
    flex: 0 0 auto; /* Sidebar menyesuaikan tinggi konten */
    width: 100%; /* Sidebar mengambil lebar penuh */
  }

  .content {
    width: 100%; /* Content mengambil lebar penuh */
  }
}
</style>