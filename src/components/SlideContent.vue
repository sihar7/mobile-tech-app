<template>
  <div class="modern-learning-container" :class="{ 'light-mode': !isDarkMode, 'dark-mode': isDarkMode }">
    <!-- Header dengan Progress & Controls -->
    <div class="learning-header">
      <div class="header-left">
        <button @click="goBack" class="icon-btn" aria-label="Kembali">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div class="progress-info">
          <div class="progress-stats">
            <span class="stat-badge">{{ activeIndex + 1 }}/{{ slides.length }}</span>
            <span class="stat-label">Materi</span>
          </div>
          <div class="progress-bar-modern">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>
      </div>
      
      <div class="header-right">
        <button @click="toggleFullscreen" class="icon-btn" :aria-label="isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path v-if="!isFullscreen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="learning-main">
      <!-- Sidebar Navigation -->
      <div class="sidebar-modern" :class="{ collapsed: isSidebarCollapsed }">
        <button @click="toggleSidebar" class="sidebar-toggle" aria-label="Toggle Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isSidebarCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'" />
          </svg>
        </button>
        
        <div class="sidebar-content" :class="{ hidden: isSidebarCollapsed }">
          <div class="sidebar-header">
            <h3 class="sidebar-title">Daftar Materi</h3>
            <span class="material-count">{{ slides.length }} item</span>
          </div>
          
          <div class="material-list">
            <button
              v-for="(slide, index) in slides"
              :key="index"
              @click="selectMaterial(index)"
              :class="['material-item', { active: activeIndex === index, completed: slide.completed }]"
            >
              <div class="material-icon">
                <svg v-if="slide.type === 'question'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div class="material-info">
                <span class="material-badge">{{ slide.type === 'question' ? 'Soal' : 'Materi' }}</span>
                <span class="material-title">{{ slide.title }}</span>
              </div>
              <div v-if="slide.completed" class="material-check">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-modern" :class="{ 'full-width': isSidebarCollapsed }">
        <div v-if="activeIndex !== null && slides[activeIndex]" class="material-content">
          <!-- Header Content -->
          <div class="content-header">
            <div class="content-badge">
              <span class="badge" :class="slides[activeIndex].type === 'question' ? 'badge-question' : 'badge-material'">
                {{ slides[activeIndex].type === 'question' ? '📝 Latihan Soal' : '📚 Materi Pembelajaran' }}
              </span>
              <span class="content-number">Pertemuan {{ activeIndex + 1 }}</span>
            </div>
            <h1 class="content-title">{{ slides[activeIndex].title }}</h1>
          </div>

          <!-- Media Content -->
          <div class="media-container">
            <!-- Image -->
            <div v-if="slides[activeIndex].image" class="image-wrapper">
              <img :src="slides[activeIndex].image" :alt="slides[activeIndex].title" class="content-image" />
              <div class="image-overlay"></div>
            </div>

            <!-- YouTube Video -->
            <div v-if="getYouTubeVideoId(slides[activeIndex].video)" class="video-wrapper">
              <Youtube
                :video-id="getYouTubeVideoId(slides[activeIndex].video)"
                :player-vars="playerVars"
                :key="slides[activeIndex].video"
                class="youtube-player"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="description-wrapper">
            <div class="description-content" v-html="currentDescription"></div>
            
            <button
              v-if="slides[activeIndex].description.length > 300"
              @click="toggleExpand(activeIndex)"
              class="expand-btn"
            >
              <span>{{ isExpanded[activeIndex] ? 'Tampilkan Ringkas' : 'Lihat Selengkapnya' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isExpanded[activeIndex] ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
              </svg>
            </button>
          </div>

          <!-- Code Block -->
          <div v-if="slides[activeIndex].code && slides[activeIndex].language" class="code-wrapper">
            <div class="code-header">
              <span class="code-language">{{ slides[activeIndex].language }}</span>
              <button @click="copyCode(slides[activeIndex].code)" class="copy-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <CodeBlock :code="slides[activeIndex].code" :language="slides[activeIndex].language" />
          </div>

          <!-- Submit Link -->
          <div v-if="slides[activeIndex].type === 'question' && slides[activeIndex].submitLink" class="submit-wrapper">
            <a :href="slides[activeIndex].submitLink" target="_blank" class="submit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Kumpulkan Jawaban via Google Drive
            </a>
          </div>

          <!-- Navigation Buttons -->
          <div class="navigation-buttons">
            <button 
              @click="previousMaterial" 
              :disabled="activeIndex === 0"
              class="nav-btn"
              :class="{ disabled: activeIndex === 0 }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Sebelumnya
            </button>
            
            <button 
              @click="nextMaterial" 
              :disabled="activeIndex === slides.length - 1"
              class="nav-btn"
              :class="{ disabled: activeIndex === slides.length - 1 }"
            >
              Selanjutnya
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="empty-icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3>Belum Ada Materi Dipilih</h3>
          <p>Silakan pilih materi dari sidebar untuk mulai belajar</p>
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
import Swal from 'sweetalert2';

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
const isSidebarCollapsed = ref(false);
const isDarkMode = inject("isDarkMode");

// Progress Calculation
const progressPercentage = computed(() => {
  if (!props.slides.length || activeIndex.value === null) return 0;
  return ((activeIndex.value + 1) / props.slides.length) * 100;
});

// Current Description
const currentDescription = computed(() => {
  if (activeIndex.value === null) return '';
  const slide = props.slides[activeIndex.value];
  if (!slide) return '';
  return isExpanded.value[activeIndex.value] 
    ? slide.description 
    : shortenText(slide.description, 300);
});

// Navigation Methods
const selectMaterial = (index) => {
  activeIndex.value = index;
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true;
  }
};

const previousMaterial = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const nextMaterial = () => {
  if (activeIndex.value < props.slides.length - 1) {
    activeIndex.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Text Shortener
const shortenText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Toggle Expand
const toggleExpand = (index) => {
  isExpanded.value[index] = !isExpanded.value[index];
};

// Copy Code
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    Swal.fire({
      title: 'Berhasil!',
      text: 'Kode berhasil disalin ke clipboard',
      icon: 'success',
      toast: true,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
    });
  } catch (err) {
    Swal.fire({
      title: 'Gagal!',
      text: 'Gagal menyalin kode',
      icon: 'error',
      toast: true,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
    });
  }
};

// Toggle Sidebar
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
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
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
};

// Responsive Sidebar
const handleResize = () => {
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  window.addEventListener("resize", handleResize);
  isExpanded.value = Array(props.slides.length).fill(false);
  handleResize();
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  window.removeEventListener("resize", handleResize);
});

// Watchers
watch(activeIndex, (newIndex) => {
  if (newIndex !== null) {
    isExpanded.value[newIndex] = false;
  }
});
</script>

<style scoped>
/* CSS Variables for Light Mode */
.light-mode {
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border-color: #e5e7eb;
  --surface: #ffffff;
  --surface-hover: #f3f4f6;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* CSS Variables for Dark Mode */
.dark-mode {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #e5e7eb;
  --text-muted: #9ca3af;
  --border-color: #374151;
  --surface: #1f2937;
  --surface-hover: #374151;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2);
}

/* Container */
.modern-learning-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Header */
.learning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.progress-info {
  flex: 1;
  max-width: 400px;
}

.progress-stats {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-badge {
  font-size: 1.125rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.progress-bar-modern {
  height: 4px;
  background: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Icon Buttons */
.icon-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background: var(--surface);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: var(--text-primary);
}

.icon-btn:hover {
  background: var(--surface-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.icon-small {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

/* Main Layout */
.learning-main {
  display: flex;
  gap: 1.5rem;
  position: relative;
}

/* Modern Sidebar */
.sidebar-modern {
  position: relative;
  transition: all 0.3s;
  width: 320px;
  flex-shrink: 0;
}

.sidebar-modern.collapsed {
  width: 50px;
}

.sidebar-toggle {
  position: absolute;
  top: 0;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s;
  color: var(--text-primary);
}

.sidebar-toggle:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.sidebar-content {
  background: var(--surface);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 0.3s;
}

.sidebar-content.hidden {
  opacity: 0;
  visibility: hidden;
  width: 0;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
}

.material-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.material-list {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.material-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.material-item:hover {
  background: var(--surface-hover);
}

.material-item.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border-left: 3px solid #3b82f6;
}

.material-icon {
  flex-shrink: 0;
}

.material-info {
  flex: 1;
}

.material-badge {
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #3b82f6;
  display: block;
  margin-bottom: 0.25rem;
}

.material-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.material-check {
  color: #10b981;
  flex-shrink: 0;
}

/* Content Area */
.content-modern {
  flex: 1;
  transition: all 0.3s;
}

.content-modern.full-width {
  margin-left: 0;
}

.material-content {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Content Header */
.content-header {
  margin-bottom: 2rem;
}

.content-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-material {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.badge-question {
  background: #f59e0b;
  color: white;
}

.content-number {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.content-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: var(--text-primary);
}

/* Media Container */
.media-container {
  margin-bottom: 2rem;
}

.image-wrapper {
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--border-color);
}

.content-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-wrapper:hover .content-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));
  pointer-events: none;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 0.75rem;
}

.youtube-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
}

/* Description */
.description-wrapper {
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow);
}

.description-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
}

.expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #3b82f6;
  transition: all 0.3s;
}

.expand-btn:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
}

/* Code Block */
.code-wrapper {
  margin-bottom: 1.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #1e1e1e;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.code-language {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: transparent;
  border: 1px solid #3d3d3d;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  color: #9ca3af;
  transition: all 0.3s;
}

.copy-btn:hover {
  background: #3d3d3d;
  color: white;
}

/* Submit Button */
.submit-wrapper {
  margin: 2rem 0;
  text-align: center;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Navigation Buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  color: var(--text-primary);
}

.nav-btn:hover:not(.disabled) {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.nav-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  color: var(--text-secondary);
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .modern-learning-container {
    padding: 0.75rem;
  }

  .sidebar-modern {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    background: var(--surface);
    box-shadow: var(--shadow-lg);
    transform: translateX(-100%);
  }

  .sidebar-modern:not(.collapsed) {
    transform: translateX(0);
  }

  .sidebar-modern.collapsed {
    width: 0;
  }

  .content-modern {
    width: 100%;
  }

  .navigation-buttons {
    flex-direction: column;
  }

  .nav-btn {
    justify-content: center;
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--border-color);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}
</style>