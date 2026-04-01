<template>
  <div class="ios-learning-container" :class="{ 'dark-mode': isDarkMode }">
    <!-- Dynamic Header with Progress -->
    <header class="ios-header" :style="{ paddingTop: safeAreaTop + 'px' }">
      <div class="header-content">
        <button @click="goBack" class="ios-icon-btn" aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div class="header-progress">
          <div class="progress-ring">
            <svg viewBox="0 0 36 36" class="progress-svg">
              <path class="progress-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="progress-fill" :stroke-dasharray="`${progressPercentage}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" class="progress-text">{{ Math.round(progressPercentage) }}%</text>
            </svg>
          </div>
          <div class="progress-stats">
            <span class="material-counter">{{ activeIndex + 1 }}/{{ slides.length }}</span>
            <span class="completion-badge" v-if="completionRate > 0">
              <span class="completion-icon">✅</span>
              <span>{{ completionRate }}% selesai</span>
            </span>
          </div>
        </div>

        <div class="header-actions">
          <button @click="toggleViewMode" class="ios-icon-btn" aria-label="Mode tampilan">
            <svg v-if="viewMode === 'grid'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="ios-main">
      <!-- Material Navigation Tray -->
      <div class="material-tray" :class="{ collapsed: isTrayCollapsed }">
        <div class="tray-handle" @click="toggleTray">
          <div class="handle-bar"></div>
          <span class="tray-label">{{ isTrayCollapsed ? 'Buka daftar materi' : 'Tutup' }}</span>
        </div>
        
        <div class="tray-content" :class="{ hidden: isTrayCollapsed }">
          <div class="tray-header">
            <h3 class="tray-title">📚 Daftar Materi</h3>
            <span class="tray-badge">{{ slides.length }} pertemuan</span>
          </div>
          
          <div class="material-scroll">
            <div
              v-for="(slide, idx) in slides"
              :key="idx"
              @click="selectMaterial(idx)"
              :class="['material-card', { 
                active: activeIndex === idx, 
                completed: slide.completed,
                'has-notes': slide.userNotes?.length > 0
              }]"
            >
              <div class="material-card-left">
                <div class="material-number">{{ idx + 1 }}</div>
                <div class="material-info">
                  <span class="material-type" :class="slide.type">
                    {{ slide.type === 'question' ? '📝 Latihan' : '📖 Materi' }}
                  </span>
                  <span class="material-title">{{ slide.title }}</span>
                </div>
              </div>
              <div class="material-card-right">
                <div v-if="slide.completed" class="check-indicator">✓</div>
                <div v-else-if="slide.userNotes?.length > 0" class="notes-indicator">📝</div>
                <div v-else class="progress-dot" :class="{ active: activeIndex === idx }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area" :class="{ 'grid-mode': viewMode === 'grid', 'tray-collapsed': isTrayCollapsed }">
        <Transition name="fade-slide" mode="out-in">
          <div v-if="activeSlide" class="material-view" :key="activeIndex">
            <!-- Hero Section -->
            <div class="hero-section">
              <div class="hero-badge">
                <span class="badge-icon">{{ activeSlide.type === 'question' ? '📝' : '📘' }}</span>
                <span class="badge-text">{{ activeSlide.type === 'question' ? 'Latihan Soal' : 'Materi Pembelajaran' }}</span>
                <span class="badge-number">Pertemuan {{ activeIndex + 1 }}</span>
              </div>
              <h1 class="hero-title">{{ activeSlide.title }}</h1>
              
              <div class="hero-actions">
                <button 
                  v-if="activeSlide.type === 'question'" 
                  @click="markAsCompleted" 
                  :class="['action-btn', { completed: activeSlide.completed }]"
                >
                  <span class="btn-icon">{{ activeSlide.completed ? '✅' : '○' }}</span>
                  <span>{{ activeSlide.completed ? 'Selesai' : 'Tandai Selesai' }}</span>
                </button>
                <button 
                  v-if="getPlainTextDescription(activeSlide.description)" 
                  @click="toggleSpeech" 
                  class="action-btn speech-btn"
                  :class="{ active: isSpeaking }"
                >
                  <span class="btn-icon">🔊</span>
                  <span>{{ isSpeaking ? 'Berhenti' : 'Dengarkan' }}</span>
                </button>
                <button 
                  v-if="activeSlide.description" 
                  @click="openSummaryModal" 
                  class="action-btn summary-btn"
                >
                  <span class="btn-icon">✨</span>
                  <span>Ringkasan AI</span>
                </button>
              </div>
            </div>

            <!-- Media Section -->
            <div v-if="activeSlide.image || getYouTubeVideoId(activeSlide.video)" class="media-section">
              <div v-if="activeSlide.image" class="image-card">
                <img :src="activeSlide.image" :alt="activeSlide.title" @click="expandImage = activeSlide.image" />
                <div class="image-caption" v-if="activeSlide.imageCaption">{{ activeSlide.imageCaption }}</div>
              </div>
              <div v-if="getYouTubeVideoId(activeSlide.video)" class="video-card">
                <Youtube
                  :video-id="getYouTubeVideoId(activeSlide.video)"
                  :player-vars="playerVars"
                  class="youtube-player"
                />
              </div>
            </div>

            <!-- Description with Comprehension Tools -->
            <div class="description-section" v-if="activeSlide.description">
              <div class="section-header">
                <h2>📖 Materi Pembahasan</h2>
                <div class="comprehension-tools">
                  <button @click="toggleHighlightMode" :class="{ active: highlightMode }" class="tool-btn">
                    <span>🖍️</span> Sorot
                  </button>
                  <button @click="openNoteModal" class="tool-btn">
                    <span>📝</span> Catatan
                  </button>
                  <button @click="openQuestionModal" class="tool-btn">
                    <span>💭</span> Tanya
                  </button>
                </div>
              </div>
              
              <div 
                ref="descriptionRef"
                class="description-content"
                :class="{ 'highlight-mode': highlightMode }"
                @mouseup="handleTextSelection"
                v-html="processedDescription"
              ></div>
              
              <button 
                v-if="getPlainTextDescription(activeSlide.description).length > 500" 
                @click="toggleExpand" 
                class="expand-toggle"
              >
                <span>{{ isExpanded ? 'Tampilkan ringkas' : 'Baca selengkapnya' }}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path :d="isExpanded ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                </svg>
              </button>
            </div>

            <!-- Code Block -->
            <div v-if="activeSlide.code" class="code-section">
              <div class="code-header">
                <span class="code-lang">{{ activeSlide.language || 'code' }}</span>
                <button @click="copyCode(activeSlide.code)" class="copy-code-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Salin
                </button>
              </div>
              <CodeBlock :code="activeSlide.code" :language="activeSlide.language" />
            </div>

            <!-- User Notes Display -->
            <div v-if="activeSlide.userNotes?.length" class="notes-section">
              <div class="section-header">
                <h2>📔 Catatan Kamu</h2>
                <button @click="openNoteModal" class="add-note-btn">+ Tambah</button>
              </div>
              <div class="notes-list">
                <div v-for="(note, idx) in activeSlide.userNotes" :key="idx" class="note-item">
                  <div class="note-header">
                    <span class="note-date">{{ formatDate(note.date) }}</span>
                    <button @click="deleteNote(idx)" class="delete-note">✕</button>
                  </div>
                  <p class="note-text">{{ note.content }}</p>
                </div>
              </div>
            </div>

            <!-- Submit Link -->
            <div v-if="activeSlide.submitLink" class="submit-section">
              <a :href="activeSlide.submitLink" target="_blank" class="submit-btn" rel="noopener noreferrer">
                <span>📤 Kumpulkan Tugas</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 3v12m0 0-3-3m3 3 3-3M5 21h14" />
                </svg>
              </a>
              <p class="submit-hint">Kumpulkan jawaban melalui Google Drive sebelum batas waktu</p>
            </div>

            <!-- Navigation -->
            <div class="navigation-section">
              <button 
                @click="previousMaterial" 
                :disabled="activeIndex === 0"
                class="nav-btn prev"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <span>Sebelumnya</span>
              </button>
              
              <div class="nav-indicators">
                <div class="nav-dots">
                  <span 
                    v-for="i in slides.length" 
                    :key="i" 
                    class="nav-dot" 
                    :class="{ 
                      active: i - 1 === activeIndex,
                      completed: slides[i - 1]?.completed
                    }"
                    @click="selectMaterial(i - 1)"
                  ></span>
                </div>
              </div>
              
              <button 
                @click="nextMaterial" 
                :disabled="activeIndex === slides.length - 1"
                class="nav-btn next"
              >
                <span>Selanjutnya</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>Mulai Belajar</h3>
            <p>Pilih materi dari daftar di atas untuk memulai pembelajaran</p>
          </div>
        </Transition>
      </div>
    </main>

    <!-- Modals -->
    <Teleport to="body">
      <!-- Note Modal -->
      <div v-if="showNoteModal" class="ios-modal" @click.self="showNoteModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3>📝 Tambah Catatan</h3>
            <button @click="showNoteModal = false" class="modal-close">✕</button>
          </div>
          <textarea 
            v-model="noteContent" 
            class="note-textarea" 
            placeholder="Tulis catatanmu di sini...\n\n💡 Tips: Catat poin-poin penting yang kamu pelajari"
            rows="6"
          ></textarea>
          <div class="modal-footer">
            <button class="modal-btn cancel" @click="showNoteModal = false">Batal</button>
            <button class="modal-btn save" @click="saveNote">Simpan Catatan</button>
          </div>
        </div>
      </div>

      <!-- Question Modal -->
      <div v-if="showQuestionModal" class="ios-modal" @click.self="showQuestionModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3>💭 Ajukan Pertanyaan</h3>
            <button @click="showQuestionModal = false" class="modal-close">✕</button>
          </div>
          <textarea 
            v-model="questionContent" 
            class="note-textarea" 
            placeholder="Tulis pertanyaanmu di sini...\n\nContoh: Apa perbedaan antara variabel let dan const?"
            rows="4"
          ></textarea>
          <div class="modal-footer">
            <button class="modal-btn cancel" @click="showQuestionModal = false">Batal</button>
            <button class="modal-btn save" @click="submitQuestion">Kirim Pertanyaan</button>
          </div>
          <p class="modal-hint">Pertanyaan akan disimpan dan bisa kamu diskusikan dengan teman</p>
        </div>
      </div>

      <!-- Summary Modal -->
      <div v-if="showSummaryModal" class="ios-modal" @click.self="showSummaryModal = false">
        <div class="modal-content summary-modal">
          <div class="modal-header">
            <h3>✨ Ringkasan Materi</h3>
            <button @click="showSummaryModal = false" class="modal-close">✕</button>
          </div>
          <div class="summary-content" v-if="aiSummary">
            <div class="summary-point" v-for="(point, idx) in aiSummary" :key="idx">
              <span class="point-icon">{{ idx + 1 }}.</span>
              <p>{{ point }}</p>
            </div>
          </div>
          <div v-else class="summary-loading">
            <div class="loading-spinner"></div>
            <p>Membuat ringkasan pintar...</p>
          </div>
          <div class="modal-footer">
            <button class="modal-btn copy" @click="copySummary">📋 Salin Ringkasan</button>
            <button class="modal-btn close" @click="showSummaryModal = false">Tutup</button>
          </div>
        </div>
      </div>

      <!-- Image Expand Modal -->
      <div v-if="expandImage" class="image-expand-modal" @click="expandImage = null">
        <img :src="expandImage" alt="Preview" />
        <button class="close-expand">✕</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick, inject } from "vue";
import { useRouter } from "vue-router";
import CodeBlock from "@/components/CodeBlock.vue";
import Youtube from "vue3-youtube";
import Swal from 'sweetalert2';

const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => []
  }
});

const router = useRouter();
const isDarkMode = inject("isDarkMode", ref(false));

// ========== State ==========
const activeIndex = ref(0);
const isExpanded = ref(false);
const isTrayCollapsed = ref(false);
const viewMode = ref('list');
const highlightMode = ref(false);
const isSpeaking = ref(false);
let speechSynth = null;
let speechUtterance = null;

// Notes & Questions
const showNoteModal = ref(false);
const showQuestionModal = ref(false);
const showSummaryModal = ref(false);
const noteContent = ref('');
const questionContent = ref('');
const aiSummary = ref(null);

// Image expand
const expandImage = ref(null);

// Safe area for iOS
const safeAreaTop = ref(0);

// DOM refs
const descriptionRef = ref(null);

// ========== Helper Functions ==========
// Strip HTML tags from description for speech synthesis and summary
const stripHtmlTags = (html) => {
  if (!html) return '';
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, ' ');
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#39;/g, "'");
  return text;
};

// Get plain text description without HTML
const getPlainTextDescription = (html) => {
  return stripHtmlTags(html);
};

// ========== Computed ==========
const activeSlide = computed(() => props.slides[activeIndex.value]);

const progressPercentage = computed(() => {
  if (!props.slides.length) return 0;
  return ((activeIndex.value + 1) / props.slides.length) * 100;
});

const completionRate = computed(() => {
  if (!props.slides.length) return 0;
  const completed = props.slides.filter(s => s.completed).length;
  return Math.round((completed / props.slides.length) * 100);
});

const processedDescription = computed(() => {
  if (!activeSlide.value?.description) return '';
  let desc = activeSlide.value.description;
  
  // Add highlights for saved highlights
  if (activeSlide.value.highlights) {
    activeSlide.value.highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      desc = desc.replace(regex, '<mark class="user-highlight">$1</mark>');
    });
  }
  
  const plainTextLength = getPlainTextDescription(desc).length;
  if (!isExpanded.value && plainTextLength > 500) {
    // Find a good cut point (after a paragraph or sentence)
    let cutPoint = 500;
    const lastPeriod = desc.lastIndexOf('.', 500);
    const lastTag = desc.lastIndexOf('>', 500);
    if (lastPeriod > 400) cutPoint = lastPeriod + 1;
    else if (lastTag > 400) cutPoint = lastTag + 1;
    
    return desc.substring(0, cutPoint) + '...';
  }
  return desc;
});

// ========== Methods ==========
const selectMaterial = (index) => {
  activeIndex.value = index;
  isExpanded.value = false;
  if (window.innerWidth < 768) {
    isTrayCollapsed.value = true;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  stopSpeaking();
};

const previousMaterial = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    stopSpeaking();
  }
};

const nextMaterial = () => {
  if (activeIndex.value < props.slides.length - 1) {
    activeIndex.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    stopSpeaking();
  } else if (activeIndex.value === props.slides.length - 1) {
    showCompletionCelebration();
  }
};

const showCompletionCelebration = () => {
  Swal.fire({
    title: '🎉 Selamat!',
    html: 'Kamu telah menyelesaikan semua materi!<br><strong>Terus belajar dan berkembang!</strong>',
    icon: 'success',
    confirmButtonText: 'Kembali ke Beranda',
    confirmButtonColor: '#007aff',
    background: isDarkMode.value ? '#1c1c1e' : '#ffffff',
  }).then(() => {
    router.push("/");
  });
};

const markAsCompleted = () => {
  if (activeSlide.value) {
    activeSlide.value.completed = !activeSlide.value.completed;
    localStorage.setItem(`material_${activeIndex.value}_completed`, activeSlide.value.completed);
    
    Swal.fire({
      title: activeSlide.value.completed ? '✅ Selesai!' : '📖 Materi',
      text: activeSlide.value.completed ? 'Materi ditandai selesai. Lanjutkan ke materi berikutnya!' : 'Materi ditandai belum selesai',
      icon: activeSlide.value.completed ? 'success' : 'info',
      toast: true,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
    });
  }
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'list' ? 'grid' : 'list';
  localStorage.setItem('learning_view_mode', viewMode.value);
};

const toggleTray = () => {
  isTrayCollapsed.value = !isTrayCollapsed.value;
};

const toggleHighlightMode = () => {
  highlightMode.value = !highlightMode.value;
  if (!highlightMode.value) {
    document.body.style.userSelect = '';
  } else {
    document.body.style.userSelect = 'text';
  }
};

const handleTextSelection = () => {
  if (!highlightMode.value) return;
  
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();
  
  if (selectedText.length > 0 && selectedText.length < 200) {
    Swal.fire({
      title: 'Sorot teks ini?',
      text: `"${selectedText.substring(0, 100)}${selectedText.length > 100 ? '...' : ''}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sorot',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#007aff',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!activeSlide.value.highlights) activeSlide.value.highlights = [];
        if (!activeSlide.value.highlights.includes(selectedText)) {
          activeSlide.value.highlights.push(selectedText);
          localStorage.setItem(`material_${activeIndex.value}_highlights`, JSON.stringify(activeSlide.value.highlights));
        }
        selection.removeAllRanges();
      }
    });
  }
};

// Speech Synthesis - Fixed to use plain text without HTML
const toggleSpeech = () => {
  if (!window.speechSynthesis) {
    Swal.fire('Maaf', 'Browser tidak mendukung text-to-speech', 'info');
    return;
  }
  
  if (isSpeaking.value) {
    stopSpeaking();
  } else {
    startSpeaking();
  }
};

const startSpeaking = () => {
  const htmlText = activeSlide.value.description;
  if (!htmlText) return;
  
  // Get plain text without HTML tags
  const plainText = getPlainTextDescription(htmlText);
  
  if (!plainText.trim()) {
    Swal.fire('Info', 'Tidak ada teks yang dapat dibacakan', 'info');
    return;
  }
  
  stopSpeaking();
  
  // Use Web Speech API
  speechUtterance = new SpeechSynthesisUtterance(plainText);
  speechUtterance.lang = 'id-ID';
  speechUtterance.rate = 0.9;
  speechUtterance.pitch = 1;
  speechUtterance.onend = () => {
    isSpeaking.value = false;
  };
  speechUtterance.onerror = (event) => {
    console.error('Speech error:', event);
    isSpeaking.value = false;
  };
  
  window.speechSynthesis.speak(speechUtterance);
  isSpeaking.value = true;
};

const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  isSpeaking.value = false;
};

// Notes
const openNoteModal = () => {
  noteContent.value = '';
  showNoteModal.value = true;
};

const saveNote = () => {
  if (!noteContent.value.trim()) {
    Swal.fire('Catatan kosong', 'Tulis sesuatu untuk dicatat', 'info');
    return;
  }
  
  if (!activeSlide.value.userNotes) activeSlide.value.userNotes = [];
  activeSlide.value.userNotes.push({
    content: noteContent.value.trim(),
    date: new Date().toISOString()
  });
  
  localStorage.setItem(`material_${activeIndex.value}_notes`, JSON.stringify(activeSlide.value.userNotes));
  showNoteModal.value = false;
  noteContent.value = '';
  
  Swal.fire({
    title: 'Catatan tersimpan!',
    text: 'Catatanmu sudah disimpan',
    icon: 'success',
    toast: true,
    timer: 1500,
    showConfirmButton: false,
  });
};

const deleteNote = (idx) => {
  activeSlide.value.userNotes.splice(idx, 1);
  localStorage.setItem(`material_${activeIndex.value}_notes`, JSON.stringify(activeSlide.value.userNotes));
};

// Questions
const openQuestionModal = () => {
  questionContent.value = '';
  showQuestionModal.value = true;
};

const submitQuestion = () => {
  if (!questionContent.value.trim()) {
    Swal.fire('Pertanyaan kosong', 'Tulis pertanyaanmu terlebih dahulu', 'info');
    return;
  }
  
  if (!activeSlide.value.questions) activeSlide.value.questions = [];
  activeSlide.value.questions.push({
    content: questionContent.value.trim(),
    date: new Date().toISOString()
  });
  
  localStorage.setItem(`material_${activeIndex.value}_questions`, JSON.stringify(activeSlide.value.questions));
  showQuestionModal.value = false;
  questionContent.value = '';
  
  Swal.fire({
    title: 'Pertanyaan terkirim!',
    text: 'Pertanyaanmu akan membantu pemahaman materi',
    icon: 'success',
    toast: true,
    timer: 1500,
    showConfirmButton: false,
  });
};

// AI Summary - Fixed to use plain text without HTML
const openSummaryModal = () => {
  showSummaryModal.value = true;
  generateSummary();
};

const generateSummary = () => {
  aiSummary.value = null;
  
  // Simulate AI processing
  setTimeout(() => {
    const htmlText = activeSlide.value.description;
    if (htmlText) {
      // Get plain text without HTML tags
      const plainText = getPlainTextDescription(htmlText);
      
      if (plainText.trim()) {
        // Extract key points from plain text
        const sentences = plainText.split(/[.!?]+/).filter(s => s.trim().length > 30);
        const keyPoints = sentences.slice(0, 5).map(s => s.trim());
        
        if (keyPoints.length) {
          aiSummary.value = keyPoints;
        } else {
          // Fallback summary based on title
          aiSummary.value = [
            `Materi "${activeSlide.value.title}" membahas konsep penting yang perlu dipahami.`,
            'Pastikan untuk mempelajari contoh-contoh yang diberikan dengan seksama.',
            'Latihan soal akan membantu memperkuat pemahaman Anda terhadap materi ini.'
          ];
        }
      } else {
        aiSummary.value = [
          `Materi "${activeSlide.value.title}" berisi informasi penting yang perlu dipelajari.`,
          'Tidak ada deskripsi teks yang dapat diringkas untuk materi ini.',
          'Silakan baca materi secara langsung untuk memahami konsep yang disampaikan.'
        ];
      }
    } else {
      aiSummary.value = [
        `Materi "${activeSlide.value.title || 'ini'}" tidak memiliki deskripsi teks untuk diringkas.`,
        'Fokus pada kode contoh yang disediakan untuk memahami implementasinya.',
        'Praktik langsung adalah cara terbaik untuk menguasai materi ini.'
      ];
    }
  }, 1500);
};

const copySummary = () => {
  if (aiSummary.value) {
    const summaryText = aiSummary.value.map((p, i) => `${i + 1}. ${p}`).join('\n');
    navigator.clipboard.writeText(summaryText);
    Swal.fire({
      title: 'Tersalin!',
      text: 'Ringkasan sudah disalin ke clipboard',
      icon: 'success',
      toast: true,
      timer: 1500,
      showConfirmButton: false,
    });
  }
};

// Copy code
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    Swal.fire({
      title: 'Berhasil!',
      text: 'Kode berhasil disalin',
      icon: 'success',
      toast: true,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire('Gagal', 'Tidak dapat menyalin kode', 'error');
  }
};

// YouTube helper
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

// Format date
const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
};

// Go back
const goBack = () => {
  router.push("/");
};

// Load saved data
const loadSavedProgress = () => {
  props.slides.forEach((slide, idx) => {
    const completed = localStorage.getItem(`material_${idx}_completed`);
    if (completed === 'true') slide.completed = true;
    
    const notes = localStorage.getItem(`material_${idx}_notes`);
    if (notes) slide.userNotes = JSON.parse(notes);
    
    const highlights = localStorage.getItem(`material_${idx}_highlights`);
    if (highlights) slide.highlights = JSON.parse(highlights);
    
    const questions = localStorage.getItem(`material_${idx}_questions`);
    if (questions) slide.questions = JSON.parse(questions);
  });
  
  const savedViewMode = localStorage.getItem('learning_view_mode');
  if (savedViewMode) viewMode.value = savedViewMode;
};

// iOS safe area
const getSafeArea = () => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS && window.visualViewport) {
    safeAreaTop.value = window.visualViewport.offsetTop;
  }
};

// ========== Lifecycle ==========
onMounted(() => {
  loadSavedProgress();
  getSafeArea();
  
  if (props.slides.length === 0) {
    console.warn('No slides provided to LearningView');
  }
});

onUnmounted(() => {
  stopSpeaking();
  document.body.style.userSelect = '';
});
</script>

<style scoped>
/* ========== iOS Design System ========== */
:root {
  --ios-blue: #007aff;
  --ios-green: #34c759;
  --ios-orange: #ff9500;
  --ios-red: #ff3b30;
  --ios-gray: #8e8e93;
  --ios-light-gray: #e5e5ea;
  --ios-bg-light: #f2f2f6;
  --ios-bg-dark: #000000;
  --ios-surface-light: #ffffff;
  --ios-surface-dark: #1c1c1e;
  --ios-border-light: rgba(60, 60, 67, 0.08);
  --ios-border-dark: rgba(84, 84, 88, 0.2);
  --ios-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.08);
  --ios-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.ios-learning-container {
  min-height: 100vh;
  background: var(--bg-base);
  transition: background 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* Dark mode overrides */
.dark-mode {
  --ios-bg: var(--ios-bg-dark);
  --ios-surface: var(--ios-surface-dark);
  --ios-border: var(--ios-border-dark);
}

/* ========== Header ========== */
.ios-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-base);
  backdrop-filter: blur(20px);
  border-bottom: 0.5px solid var(--surface-border);
  padding: 8px 16px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.ios-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.ios-icon-btn:active {
  transform: scale(0.95);
  background: var(--surface-border);
}

.ios-icon-btn svg {
  width: 22px;
  height: 22px;
}

/* Progress Ring */
.header-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-ring {
  width: 48px;
  height: 48px;
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: var(--surface-border);
  stroke-width: 2.5;
}

.progress-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.progress-text {
  fill: var(--text-primary);
  font-size: 8px;
  text-anchor: middle;
  dominant-baseline: middle;
  font-weight: 600;
}

.progress-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.material-counter {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.completion-badge {
  font-size: 0.7rem;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* ========== Main Layout ========== */
.ios-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 16px;
}

/* Material Tray */
.material-tray {
  background: var(--surface);
  border-radius: 24px;
  margin-bottom: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--ios-shadow);
}

.tray-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 24px;
}

.tray-handle:active {
  background: var(--surface-border);
}

.handle-bar {
  width: 36px;
  height: 4px;
  background: var(--text-muted);
  border-radius: 4px;
  opacity: 0.5;
}

.tray-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.tray-content {
  overflow: hidden;
  transition: all 0.3s ease;
  border-top: 0.5px solid var(--surface-border);
}

.tray-content.hidden {
  display: none;
}

.tray-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 16px 20px 8px;
}

.tray-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.tray-badge {
  font-size: 0.7rem;
  color: var(--text-secondary);
  background: var(--surface-border);
  padding: 2px 8px;
  border-radius: 20px;
}

.material-scroll {
  max-height: 280px;
  overflow-y: auto;
  padding: 0 8px 12px;
}

.material-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--surface);
}

.material-card:active {
  transform: scale(0.98);
  background: var(--surface-border);
}

.material-card.active {
  background: var(--accent-soft);
  border-left: 3px solid var(--accent);
}

.material-card.completed {
  opacity: 0.7;
}

.material-card-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.material-number {
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background: var(--surface-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.material-card.active .material-number {
  background: var(--accent);
  color: white;
}

.material-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.material-type {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

.material-type.materi {
  color: var(--accent);
}

.material-type.question {
  color: var(--ios-orange);
}

.material-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.material-card-right {
  flex-shrink: 0;
}

.check-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--ios-green);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.notes-indicator {
  font-size: 16px;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}

.progress-dot.active {
  background: var(--accent);
  width: 10px;
  height: 10px;
  box-shadow: 0 0 0 3px var(--accent-soft);
}

/* Content Area */
.content-area {
  transition: all 0.3s ease;
}

.content-area.grid-mode .material-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.content-area.grid-mode .hero-section,
.content-area.grid-mode .media-section,
.content-area.grid-mode .description-section,
.content-area.grid-mode .code-section,
.content-area.grid-mode .notes-section,
.content-area.grid-mode .submit-section,
.content-area.grid-mode .navigation-section {
  grid-column: 1 / -1;
}

/* Hero Section */
.hero-section {
  margin-bottom: 24px;
}

.hero-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.badge-icon {
  font-size: 1rem;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--accent-soft);
  padding: 4px 12px;
  border-radius: 20px;
  color: var(--accent);
}

.badge-number {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.hero-title {
  font-size: clamp(1.5rem, 5vw, 2.2rem);
  font-weight: 700;
  margin: 12px 0 16px;
  color: var(--text-primary);
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 40px;
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--surface);
  border: 0.5px solid var(--surface-border);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.action-btn:active {
  transform: scale(0.96);
}

.action-btn.completed {
  background: var(--ios-green);
  border-color: var(--ios-green);
  color: white;
}

.speech-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.summary-btn {
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  border: none;
  color: white;
}

/* Media Section */
.media-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.image-card {
  border-radius: 24px;
  overflow: hidden;
  background: var(--surface);
  box-shadow: var(--ios-shadow);
  cursor: pointer;
}

.image-card img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-card:active img {
  transform: scale(1.02);
}

.image-caption {
  padding: 12px 16px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: var(--surface);
  border-top: 0.5px solid var(--surface-border);
}

.video-card {
  border-radius: 24px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
}

.youtube-player {
  width: 100%;
  height: 100%;
}

/* Description Section */
.description-section {
  background: var(--surface);
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--ios-shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.comprehension-tools {
  display: flex;
  gap: 8px;
}

.tool-btn {
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 0.7rem;
  background: var(--surface-border);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-primary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.tool-btn.active {
  background: var(--accent);
  color: white;
}

.tool-btn:active {
  transform: scale(0.95);
}

.description-content {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
}

.description-content :deep(p) {
  margin-bottom: 1rem;
}

.description-content :deep(strong) {
  color: var(--accent);
  font-weight: 600;
}

.description-content :deep(mark.user-highlight) {
  background: rgba(255, 149, 0, 0.2);
  border-radius: 4px;
  padding: 2px 0;
}

.description-content.highlight-mode {
  cursor: text;
  user-select: text;
}

.expand-toggle {
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.875rem;
  cursor: pointer;
  padding: 8px 0;
}

.expand-toggle svg {
  width: 16px;
  height: 16px;
}

/* Code Section */
.code-section {
  background: #1e1e1e;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.code-lang {
  font-size: 0.7rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
}

.copy-code-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 0.7rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.copy-code-btn svg {
  width: 14px;
  height: 14px;
}

.copy-code-btn:active {
  background: #3d3d3d;
  color: white;
}

/* Notes Section */
.notes-section {
  background: var(--surface);
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--ios-shadow);
}

.add-note-btn {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  background: var(--accent-soft);
  border: none;
  color: var(--accent);
  cursor: pointer;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.note-item {
  background: var(--surface-border);
  border-radius: 16px;
  padding: 12px;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.note-date {
  font-size: 0.6rem;
  color: var(--text-muted);
}

.delete-note {
  background: none;
  border: none;
  color: var(--ios-red);
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
}

.note-text {
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
  color: var(--text-primary);
  white-space: pre-wrap;
}

/* Submit Section */
.submit-section {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--surface);
  border-radius: 24px;
  box-shadow: var(--ios-shadow);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--ios-green), #2e7d32);
  color: white;
  text-decoration: none;
  border-radius: 60px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.submit-btn:active {
  transform: scale(0.97);
}

.submit-hint {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 12px;
}

/* Navigation */
.navigation-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 0.5px solid var(--surface-border);
  margin-top: 16px;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 40px;
  background: var(--surface);
  border: 0.5px solid var(--surface-border);
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  color: var(--text-primary);
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.nav-btn svg {
  width: 18px;
  height: 18px;
}

.nav-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-dots {
  display: flex;
  gap: 8px;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--surface-border);
  cursor: pointer;
  transition: all 0.2s;
}

.nav-dot.active {
  background: var(--accent);
  transform: scale(1.2);
}

.nav-dot.completed {
  background: var(--ios-green);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--surface);
  border-radius: 32px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* ========== Modals ========== */
.ios-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--surface);
  border-radius: 28px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--ios-shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 12px;
  border-bottom: 0.5px solid var(--surface-border);
}

.modal-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-border);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-secondary);
}

.note-textarea {
  width: 100%;
  padding: 16px;
  border: none;
  background: var(--surface-border);
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
  color: var(--text-primary);
}

.note-textarea:focus {
  outline: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 0.5px solid var(--surface-border);
}

.modal-btn {
  padding: 10px 20px;
  border-radius: 40px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.modal-btn.cancel {
  background: var(--surface-border);
  color: var(--text-secondary);
}

.modal-btn.save {
  background: var(--accent);
  color: white;
}

.modal-btn.copy {
  background: var(--surface-border);
  color: var(--text-primary);
}

.modal-btn.close {
  background: var(--accent-soft);
  color: var(--accent);
}

.modal-hint {
  font-size: 0.7rem;
  color: var(--text-muted);
  padding: 12px 20px 20px;
  margin: 0;
  text-align: center;
}

/* Summary Modal */
.summary-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-point {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.point-icon {
  font-weight: 600;
  color: var(--accent);
  min-width: 24px;
}

.summary-point p {
  margin: 0;
  line-height: 1.5;
  color: var(--text-primary);
}

.summary-loading {
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--surface-border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Image Expand Modal */
.image-expand-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  cursor: pointer;
}

.image-expand-modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.close-expand {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

/* ========== Animations ========== */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ========== Responsive ========== */
@media (max-width: 768px) {
  .ios-main {
    padding: 16px;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .navigation-section {
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
  
  .nav-btn {
    padding: 10px 16px;
  }
  
  .nav-indicators {
    order: 3;
    width: 100%;
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .comprehension-tools {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .material-card {
    padding: 10px 12px;
  }
  
  .material-number {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }
  
  .description-content {
    font-size: 0.875rem;
  }
  
  .modal-content {
    margin: 0 16px;
  }
}

/* ========== Scrollbar ========== */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--text-muted);
  border-radius: 3px;
}
</style>