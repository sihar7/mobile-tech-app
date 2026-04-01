<template>
  <div class="week-view">
    <div class="container">
      <!-- Header Section -->
      <div class="header-section">
        <button @click="goBack" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
        <div class="title-wrapper">
          <div class="meeting-badge">
            <span class="badge-icon">📚</span>
            <span class="badge-text">Pertemuan</span>
          </div>
          <h1 class="meeting-title">
            Pertemuan {{ $route.params.id }}
            <span v-if="isSpecialMeeting" class="special-badge">Perbaikan</span>
          </h1>
          <p class="meeting-subtitle">
            {{ getMeetingDescription }}
          </p>
        </div>
      </div>

      <!-- Content Section - Langsung render SlideContent tanpa card tambahan -->
      <div class="content-section">
        <SlideContent v-if="slides.length" :slides="slides" />
        
        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3>Materi Belum Tersedia</h3>
          <p>Mohon maaf, materi untuk pertemuan ini sedang dalam persiapan.</p>
          <p class="text-sm">Silakan cek kembali di lain waktu.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { inject } from "vue";
import SlideContent from "@/components/SlideContent.vue";
import { pertemuanData } from "@/data.js";

const route = useRoute();
const router = useRouter();
const isDarkMode = inject('isDarkMode', false);

const slides = computed(() => pertemuanData[route.params.id] || []);
const meetingId = computed(() => parseInt(route.params.id));

// Check if this is a special meeting (week 15)
const isSpecialMeeting = computed(() => meetingId.value === 15);

// Get meeting description based on the week
const getMeetingDescription = computed(() => {
  const descriptions = {
    1: "Pengenalan dan Dasar-dasar Pemrograman",
    2: "Struktur Data Dasar",
    3: "Algoritma Sorting",
    4: "Algoritma Searching",
    5: "Pemrograman Berorientasi Objek",
    6: "Database dan SQL",
    7: "UI/UX Design Principles",
    8: "Frontend Development",
    9: "Backend Development",
    10: "API Integration",
    11: "Testing dan Debugging",
    12: "Version Control dengan Git",
    13: "Deployment dan Hosting",
    14: "Final Project Preparation",
    15: "Ujian Perbaikan dan Remedial"
  };
  return descriptions[meetingId.value] || "Materi pembelajaran pertemuan ini";
});

// Go back to home
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
/* Menggunakan variabel dari app shell */
.week-view {
  min-height: 100vh;
  padding: 2rem;
  transition: var(--transition);
}

/* Container - tanpa card, hanya sebagai wrapper */
.container {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease-out;
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

/* Header Section */
.header-section {
  padding: 2rem 2rem 1rem 2rem;
  margin-bottom: 1rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 1.5rem;
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
  color: var(--text-primary);
}

.back-btn:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: translateX(-4px);
  color: var(--accent);
}

.back-btn .icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke: currentColor;
}

.title-wrapper {
  text-align: center;
}

.meeting-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: var(--accent-soft);
  border: 1px solid var(--accent-border);
  color: var(--accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.badge-icon {
  font-size: 0.875rem;
}

.meeting-title {
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.special-badge {
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.375rem 1rem;
  border-radius: 100px;
  background: linear-gradient(135deg, var(--success, #10b981), #059669);
  color: white;
  letter-spacing: normal;
  box-shadow: var(--shadow-sm);
}

.meeting-subtitle {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Content Section - langsung render SlideContent tanpa card tambahan */
.content-section {
  padding: 0 2rem 2rem 2rem;
  background: transparent;
}

/* Empty State - hanya untuk kasus tidak ada materi */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border-radius: var(--radius-lg);
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-border);
  transition: var(--transition);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  opacity: 0.5;
  color: var(--text-muted);
}

.empty-icon svg {
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.empty-state p {
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.empty-state .text-sm {
  font-size: 0.875rem;
  opacity: 0.7;
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .week-view {
    padding: 1rem;
  }
  
  .header-section {
    padding: 1rem 1rem 0.5rem 1rem;
  }
  
  .content-section {
    padding: 0 1rem 1rem 1rem;
  }
  
  .meeting-title {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .back-btn {
    padding: 0.375rem 0.875rem;
    font-size: 0.813rem;
  }
}

@media (max-width: 480px) {
  .week-view {
    padding: 0.75rem;
  }
  
  .header-section {
    padding: 0.75rem 0.75rem 0.25rem 0.75rem;
  }
  
  .content-section {
    padding: 0 0.75rem 0.75rem 0.75rem;
  }
  
  .back-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .meeting-title {
    font-size: 1.5rem;
  }
  
  .meeting-subtitle {
    font-size: 0.875rem;
  }
  
  .special-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }
  
  .empty-state {
    padding: 2rem 1rem;
  }
  
  .empty-icon {
    width: 60px;
    height: 60px;
  }
  
  .empty-state h3 {
    font-size: 1.125rem;
  }
  
  .empty-state p {
    font-size: 0.875rem;
  }
}

/* Hover Effects untuk back button */
.back-btn {
  position: relative;
  overflow: hidden;
}

.back-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--accent-soft);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.back-btn:hover::before {
  width: 300%;
  height: 300%;
}

/* Print Styles */
@media print {
  .week-view {
    padding: 0;
  }
  
  .back-btn {
    display: none;
  }
  
  .empty-state {
    border: 1px solid #e5e7eb;
  }
}
</style>