<template>
  <div class="modern-learning-container" :class="{ 'dark-mode': isDarkMode }">
    <!-- Header dengan Progress & Controls -->
    <div class="learning-header">
      <div class="header-left">
        <button @click="goBack" class="icon-btn glass-effect" aria-label="Kembali">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        
        <div class="progress-info">
          <div class="progress-stats">
            <span class="stat-badge gradient-text">{{ activeIndex + 1 }}/{{ slides.length }}</span>
            <span class="stat-label">Materi</span>
            <div class="completion-badge" v-if="completionRate > 0">
              <span class="completion-percent">{{ completionRate }}%</span>
              <span class="completion-label">Selesai</span>
            </div>
          </div>
          <div class="progress-bar-modern">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }">
              <div class="progress-glow"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="header-right">
        <button @click="toggleViewMode" class="icon-btn glass-effect" aria-label="View Mode">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path v-if="viewMode === 'grid'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button @click="toggleFullscreen" class="icon-btn glass-effect" :aria-label="isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'">
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
      <div class="content-modern" :class="{ 'full-width': isSidebarCollapsed, 'grid-view': viewMode === 'grid' }">
        <Transition name="slide-fade" mode="out-in">
          <div v-if="activeIndex !== null && slides[activeIndex]" class="material-content" :key="activeIndex">
            <!-- Header Content -->
            <div class="content-header animate-in">
              <div class="content-badge">
                <span class="badge" :class="slides[activeIndex].type === 'question' ? 'badge-question' : 'badge-material'">
                  <span class="badge-icon">{{ slides[activeIndex].type === 'question' ? '📝' : '📚' }}</span>
                  {{ slides[activeIndex].type === 'question' ? 'Latihan Soal' : 'Materi Pembelajaran' }}
                </span>
                <span class="content-number">Pertemuan {{ activeIndex + 1 }}</span>
                <button v-if="slides[activeIndex].type === 'question'" @click="markAsCompleted" class="complete-btn" :class="{ completed: slides[activeIndex].completed }">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ slides[activeIndex].completed ? 'Sudah Selesai' : 'Tandai Selesai' }}</span>
                </button>
              </div>
              <h1 class="content-title gradient-text">{{ slides[activeIndex].title }}</h1>
            </div>

            <!-- Media Content -->
            <div v-if="slides[activeIndex].image || getYouTubeVideoId(slides[activeIndex].video)" class="media-container">
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
            <div class="description-wrapper glass-effect">
              <div class="description-content" v-html="currentDescription"></div>
              
              <Transition name="fade">
                <button
                  v-if="slides[activeIndex].description && slides[activeIndex].description.length > 300"
                  @click="toggleExpand(activeIndex)"
                  class="expand-btn interactive"
                >
                  <span>{{ isExpanded[activeIndex] ? 'Tampilkan Ringkas' : 'Lihat Selengkapnya' }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-small">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isExpanded[activeIndex] ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                  </svg>
                </button>
              </Transition>
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
              <a :href="slides[activeIndex].submitLink" target="_blank" class="submit-btn interactive" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Kumpulkan Jawaban via Google Drive
                <span class="btn-glow"></span>
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
              
              <div class="nav-center-info">
                <span class="nav-indicator">{{ activeIndex + 1 }} of {{ slides.length }}</span>
                <div class="nav-dots">
                  <span v-for="i in slides.length" :key="i" class="nav-dot" :class="{ active: i - 1 === activeIndex, completed: slides[i - 1]?.completed }"></span>
                </div>
              </div>
              
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
          
          <!-- Empty State -->
          <div v-else class="empty-state glass-effect animate-in">
            <div class="empty-animation">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="empty-icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3>Mulai Perjalanan Belajarmu</h3>
            <p>Pilih materi dari sidebar untuk memulai pembelajaran interaktif</p>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Floating Progress Indicator -->
    <div class="floating-progress" :style="{ transform: `scale(${hoverProgress ? 1.1 : 1})` }" @mouseenter="hoverProgress = true" @mouseleave="hoverProgress = false">
      <div class="floating-ring">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path class="circle" :stroke-dasharray="`${progressPercentage}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <text x="18" y="20.35" class="percentage">{{ Math.round(progressPercentage) }}%</text>
        </svg>
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
const isDarkMode = inject("isDarkMode", ref(false));

// State Management
const activeIndex = ref(null);
const isExpanded = ref([]);
const isFullscreen = ref(false);
const isSidebarCollapsed = ref(false);
const viewMode = ref('list');
const hoverProgress = ref(false);

// Computed Properties
const progressPercentage = computed(() => {
  if (!props.slides.length || activeIndex.value === null) return 0;
  return ((activeIndex.value + 1) / props.slides.length) * 100;
});

const completionRate = computed(() => {
  if (!props.slides.length) return 0;
  const completed = props.slides.filter(slide => slide.completed).length;
  return Math.round((completed / props.slides.length) * 100);
});

const currentDescription = computed(() => {
  if (activeIndex.value === null) return '';
  const slide = props.slides[activeIndex.value];
  if (!slide || !slide.description) return '';
  return isExpanded.value[activeIndex.value] 
    ? slide.description 
    : shortenText(slide.description, 300);
});

// Methods
const shortenText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const selectMaterial = (index) => {
  activeIndex.value = index;
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  } else if (activeIndex.value === props.slides.length - 1) {
    showCompletionCelebration();
  }
};

const showCompletionCelebration = () => {
  Swal.fire({
    title: '🎓 Selamat!',
    html: 'Anda telah menyelesaikan semua materi!<br><strong>Terima kasih telah belajar bersama kami</strong>',
    icon: 'success',
    confirmButtonText: 'Kembali ke Beranda',
    confirmButtonColor: '#10b981',
    backdrop: true,
    allowOutsideClick: false,
  }).then(() => {
    router.push("/");
  });
};

const markAsCompleted = () => {
  if (activeIndex.value !== null) {
    props.slides[activeIndex.value].completed = !props.slides[activeIndex.value].completed;
    localStorage.setItem(`material_${activeIndex.value}_completed`, props.slides[activeIndex.value].completed);
    
    Swal.fire({
      title: props.slides[activeIndex.value].completed ? '✅ Selamat!' : '📝 Materi',
      text: props.slides[activeIndex.value].completed ? 'Materi telah ditandai selesai. Lanjutkan ke materi berikutnya!' : 'Materi ditandai belum selesai',
      icon: props.slides[activeIndex.value].completed ? 'success' : 'info',
      toast: true,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
    });
  }
};

const toggleExpand = (index) => {
  isExpanded.value[index] = !isExpanded.value[index];
};

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'list' ? 'grid' : 'list';
  localStorage.setItem('learning_view_mode', viewMode.value);
};

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

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

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

const goBack = () => {
  router.push("/");
};

const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const playerVars = {
  autoplay: 0,
  controls: 1,
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
};

const handleResize = () => {
  if (window.innerWidth < 768) {
    isSidebarCollapsed.value = true;
  }
};

const loadSavedProgress = () => {
  props.slides.forEach((slide, index) => {
    const saved = localStorage.getItem(`material_${index}_completed`);
    if (saved === 'true') {
      slide.completed = true;
    }
  });
  
  const savedViewMode = localStorage.getItem('learning_view_mode');
  if (savedViewMode) {
    viewMode.value = savedViewMode;
  }
};

// Lifecycle
onMounted(() => {
  loadSavedProgress();
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  window.addEventListener("resize", handleResize);
  isExpanded.value = Array(props.slides.length).fill(false);
  handleResize();
  
  if (props.slides.length > 0 && activeIndex.value === null) {
    activeIndex.value = 0;
  }
});

onUnmounted(() => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  window.removeEventListener("resize", handleResize);
});

watch(activeIndex, (newIndex) => {
  if (newIndex !== null) {
    isExpanded.value[newIndex] = false;
  }
});
</script>

<style scoped>
/* ===================== VARIABLES & BASE ===================== */
.modern-learning-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  color: var(--text-primary);
  transition: var(--transition);
  position: relative;
}

/* ===================== GLASS EFFECT ===================== */
.glass-effect {
  background: var(--surface);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--surface-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-effect:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 32px var(--accent-soft);
}

/* ===================== HEADER ===================== */
.learning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--surface-border);
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  min-width: 200px;
}

.progress-info {
  flex: 1;
  max-width: 500px;
}

.progress-stats {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.stat-badge {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.completion-badge {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  background: var(--accent-soft);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
}

.completion-percent {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--accent);
}

.completion-label {
  font-size: 0.625rem;
  color: var(--text-secondary);
}

.progress-bar-modern {
  height: 6px;
  background: var(--surface-border);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #8b5cf6);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.progress-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.3) 50%, 
    rgba(255,255,255,0) 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* ===================== ICON BUTTONS ===================== */
.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-primary);
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
}

.icon-btn:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
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

/* ===================== MAIN LAYOUT ===================== */
.learning-main {
  display: flex;
  gap: 2rem;
  position: relative;
}

.content-modern {
  flex: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-modern.full-width {
  margin-left: 0;
}

.content-modern.grid-view .material-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* ===================== SIDEBAR ===================== */
.sidebar-modern {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 320px;
  flex-shrink: 0;
}

.sidebar-modern.collapsed {
  width: 50px;
}

.sidebar-toggle {
  position: absolute;
  top: 12px;
  right: -12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--surface-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: var(--transition);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(8px);
}

.sidebar-toggle:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: scale(1.1);
}

.sidebar-content {
  background: var(--surface);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--surface-border);
}

.sidebar-content.hidden {
  opacity: 0;
  visibility: hidden;
  width: 0;
}

.sidebar-header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--surface-border);
  background: linear-gradient(135deg, var(--surface), var(--accent-soft));
}

.sidebar-title {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.material-count {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
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
  padding: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: var(--transition);
  text-align: left;
  border-bottom: 1px solid var(--surface-border);
  color: var(--text-primary);
  position: relative;
}

.material-item:hover {
  background: var(--accent-soft);
  transform: translateX(4px);
}

.material-item.active {
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
}

.material-item.completed {
  opacity: 0.7;
}

.material-icon {
  flex-shrink: 0;
}

.material-info {
  flex: 1;
}

.material-badge {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent);
  display: block;
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.material-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
}

.material-check {
  color: #10b981;
  flex-shrink: 0;
}

/* ===================== CONTENT ===================== */
.material-content {
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease-out;
}

.content-header {
  margin-bottom: 2rem;
}

.content-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.badge-material {
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  color: white;
}

.badge-question {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.badge-icon {
  font-size: 1rem;
}

.content-number {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.complete-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 100px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  color: var(--text-secondary);
}

.complete-btn svg {
  width: 14px;
  height: 14px;
}

.complete-btn:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: translateY(-2px);
}

.complete-btn.completed {
  background: #10b98120;
  border-color: #10b981;
  color: #10b981;
}

.content-title {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Media */
.media-container {
  margin-bottom: 2rem;
}

.image-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--surface-border);
  cursor: pointer;
}

.content-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
  pointer-events: none;
}

.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.youtube-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--radius-lg);
}

/* Description */
.description-wrapper {
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
}

.description-content {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-primary);
}

.description-content :deep(p) {
  margin-bottom: 1rem;
}

.description-content :deep(strong) {
  color: var(--accent);
  font-weight: 700;
}

.expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
  transition: all 0.2s ease;
}

.expand-btn:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: translateX(4px);
}

/* Code Block */
.code-wrapper {
  margin-bottom: 1.5rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #1e1e1e;
  border: 1px solid var(--surface-border);
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
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: transparent;
  border: 1px solid #3d3d3d;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  color: #9ca3af;
  transition: var(--transition);
}

.copy-btn:hover {
  background: #3d3d3d;
  color: white;
  transform: translateY(-1px);
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
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
}

.btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover .btn-glow {
  left: 100%;
}

/* Navigation */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--surface-border);
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: var(--text-primary);
}

.nav-btn:hover:not(.disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.nav-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-center-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.nav-indicator {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.nav-dots {
  display: flex;
  gap: 0.5rem;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--surface-border);
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: var(--accent);
  transform: scale(1.2);
}

.nav-dot.completed {
  background: #10b981;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
}

.empty-animation {
  margin-bottom: 1.5rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  color: var(--text-muted);
  opacity: 0.5;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.empty-state h3 {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-weight: 700;
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* Floating Progress */
.floating-progress {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.floating-ring {
  width: 70px;
  height: 70px;
  background: var(--surface);
  backdrop-filter: blur(20px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  border: 1px solid var(--surface-border);
  transition: all 0.3s ease;
}

.floating-progress:hover .floating-ring {
  transform: scale(1.1);
  border-color: var(--accent);
}

.circular-chart {
  width: 60px;
  height: 60px;
}

.circle-bg {
  fill: none;
  stroke: var(--surface-border);
  stroke-width: 2.5;
}

.circle {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.percentage {
  fill: var(--text-primary);
  font-size: 8px;
  text-anchor: middle;
  dominant-baseline: middle;
  font-weight: bold;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1024px) {
  .modern-learning-container {
    padding: 1rem;
  }
  
  .sidebar-modern {
    width: 280px;
  }
}

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
    backdrop-filter: blur(20px);
    box-shadow: var(--shadow);
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sidebar-modern:not(.collapsed) {
    transform: translateX(0);
  }

  .sidebar-modern.collapsed {
    width: 0;
  }

  .sidebar-toggle {
    display: none;
  }

  .content-modern {
    width: 100%;
  }

  .navigation-buttons {
    flex-direction: column;
  }

  .nav-btn {
    width: 100%;
    justify-content: center;
  }
  
  .description-wrapper {
    padding: 1.25rem;
  }
  
  .floating-progress {
    bottom: 1rem;
    right: 1rem;
  }
  
  .floating-ring {
    width: 50px;
    height: 50px;
  }
  
  .circular-chart {
    width: 40px;
    height: 40px;
  }
  
  .percentage {
    font-size: 6px;
  }
}

@media (max-width: 480px) {
  .learning-header {
    flex-direction: column;
  }
  
  .header-left {
    width: 100%;
  }
  
  .progress-info {
    max-width: none;
  }
  
  .content-title {
    font-size: 1.25rem;
  }
  
  .badge {
    font-size: 0.65rem;
  }
  
  .complete-btn span {
    display: none;
  }
  
  .complete-btn svg {
    width: 18px;
    height: 18px;
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--surface-border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-border);
}

/* Print */
@media print {
  .sidebar-modern,
  .learning-header .header-right,
  .navigation-buttons,
  .expand-btn,
  .complete-btn,
  .floating-progress {
    display: none;
  }
  
  .modern-learning-container {
    padding: 0;
  }
  
  .material-content {
    page-break-after: avoid;
  }
}
</style>