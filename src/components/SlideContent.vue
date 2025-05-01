<template>
  <div class="sidebar-accordion-container">
    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>

    <!-- Fullscreen & Back Button -->
    <div class="controls">
      <button @click="goBack" class="btn bg-white/20 backdrop-blur-md hover:bg-white/30">
        <i class="fas fa-arrow-left"></i>
      </button>

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
          :key="'slide-' + index"
          class="sidebar-item"
          :class="{ active: activeIndex === index }"
          @click="toggleAccordion(index)"
        >
          <span class="slide-badge">
            {{ slide.type === 'question' ? 'Soal' : 'Materi' }} {{ index + 1 }}
          </span>
          <h3 class="slide-title">{{ slide.title }}</h3>
        </div>
      </div>

      <!-- Content -->
      <div :class="['content', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
        <div v-if="activeIndex !== null && slides[activeIndex]" class="accordion-content" :key="'content-' + activeIndex">
          <!-- Slide Image -->
          <img
            v-if="slides[activeIndex].image"
            :src="slides[activeIndex].image"
            alt="Materi"
            class="slide-image"
          />

          <!-- YouTube Video -->
          <div v-if="getYouTubeVideoId(slides[activeIndex].video)">
            <Youtube
              :video-id="getYouTubeVideoId(slides[activeIndex].video)"
              :player-vars="playerVars"
              :key="slides[activeIndex].video"
              width="100%"
              height="400"
            />
          </div>

          <!-- Slide Description -->
          <div
            class="slide-description"
            :class="isDarkMode ? 'text-gray-100' : 'text-gray-800'"
            v-html="isExpanded[activeIndex]
              ? slides[activeIndex].description
              : shortenText(slides[activeIndex].description, 300)"
          ></div>

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
            class="btn toggle-btn mt-2"
            :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'"
            style="float: right;"
          >
            {{ isExpanded[activeIndex] ? "Tampilkan Ringkas" : "Lihat Selengkapnya" }}
          </button>

          <!-- Submit Link -->
          <div
            v-if="slides[activeIndex].type === 'question' && slides[activeIndex].submitLink"
            class="submit-link mt-4"
          >
            <a
              :href="slides[activeIndex].submitLink"
              target="_blank"
              class="btn bg-green-500 text-white hover:bg-green-600"
            >
              Kumpulkan Jawaban via Google Drive
            </a>
          </div>
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
import { useRouter } from "vue-router";
import CodeBlock from "@/components/CodeBlock.vue";
import Youtube from "vue3-youtube";

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
const activeIndex = ref(null);
const isExpanded = ref([]);
const isFullscreen = ref(false);
const isDarkMode = inject("isDarkMode");

// Progress Calculation
const progressPercentage = computed(() => {
  if (!props.slides.length || activeIndex.value === null) return 0;
  return ((activeIndex.value + 1) / props.slides.length) * 100;
});

// Accordion Toggle
const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// Text Shortener
const shortenText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Toggle Expand
const toggleExpand = (index) => {
  isExpanded.value[index] = !isExpanded.value[index];
};

// Fullscreen Handling
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(console.error);
  } else {
    document.exitFullscreen().catch(console.error);
  }
};

// Navigation
const goBack = () => {
  router.push("/");
};

// YouTube ID Extractor
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// YouTube Player Settings
const playerVars = {
  autoplay: 0,
  controls: 1,
};

// Lifecycle
onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  isExpanded.value = Array(props.slides.length).fill(false);

  // Optional: Clear cache if needed
  // localStorage.clear();
  // sessionStorage.clear();
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
});

// Watchers
watch(activeIndex, (newIndex) => {
  if (newIndex !== null) {
    isExpanded.value[newIndex] = false;
  }
});
</script>

<style scoped>
/* ==================== GENERAL STYLING ==================== */

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
  flex: 0 0 250px;
  overflow-y: auto;
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

/* Video */
.video-container {
  position: relative;
  padding-bottom: 56.25%;
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

/* Responsive */
@media (max-width: 768px) {
  .sidebar-layout {
    flex-direction: column;
  }

  .sidebar {
    flex: 0 0 auto;
    width: 100%;
  }

  .content {
    width: 100%;
  }
}

/* ==================== DARK MODE STYLING ==================== */

/* Global background & text */
:deep(.bg-gray-900) {
  background-color: #1a202c !important;
}

:deep(.text-white) {
  color: #f8f9fa !important;
}

:deep(.text-gray-900) {
  color: #1a202c !important;
}

/* Konten */
.content.bg-gray-900 {
  color: #e2e8f0;
}

.content.bg-gray-900 h1,
.content.bg-gray-900 h2,
.content.bg-gray-900 h3 {
  color: #f1f5f9;
}

.content.bg-gray-900 .slide-description {
  color: #e0e0e0;
}

.content.bg-gray-900 .empty-content {
  color: #cbd5e0;
}

/* Progress Bar Dark Mode */
.progress-bar {
  background-color: #2d3748;
}

.progress {
  background-color: #63b3ed;
}

/* Sidebar dark */
.sidebar.bg-gray-900 .sidebar-item {
  color: #cbd5e0;
}

.sidebar.bg-gray-900 .sidebar-item:hover {
  background: #2d3748;
}

.sidebar.bg-gray-900 .sidebar-item.active {
  background: #3182ce;
  color: white;
}

.sidebar.bg-gray-900 .sidebar-item.active .slide-badge {
  background: white;
  color: #3182ce;
}

.sidebar.bg-gray-900 .slide-title {
  color: #f8f9fa;
}

.sidebar.bg-gray-900 .slide-badge {
  background: #4299e1;
  color: white;
}

/* Tombol umum dark mode */
.btn {
  background-color: #3182ce;
  color: white;
}

.btn:hover {
  background-color: #2563eb;
}

/* Tombol toggle deskripsi */
.bg-gray-700.text-white {
  background-color: #4a5568 !important;
  color: #f8f9fa !important;
}

/* Tombol seperti Run Code / Copy */
button.btn.bg-white\/20 {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #f8f9fa !important;
}

button.btn.bg-white\/20:hover {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
/* Pastikan teks deskripsi terlihat jelas saat dark mode */
:deep(.content.bg-gray-900 .slide-description) {
  color: #f9fafb !important; /* SUPER terang */
}


</style>
