<template>
  <div class="week-view" :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
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

      <!-- Content Section -->
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

console.log("Slides Data:", slides.value);
</script>

<style scoped>
/* Container */
.week-view {
  min-height: 100vh;
  padding: 2rem;
  transition: all 0.3s ease;
}

/* Light Mode (Default) */
.light-mode {
  background: linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%);
}

.light-mode .container {
  background: white;
}

.light-mode .meeting-title {
  color: #111827;
}

.light-mode .meeting-subtitle {
  color: #6b7280;
}

.light-mode .back-btn {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.light-mode .back-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.light-mode .empty-state {
  background: white;
}

.light-mode .empty-state h3 {
  color: #111827;
}

.light-mode .empty-state p {
  color: #6b7280;
}

/* Dark Mode */
.dark-mode {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.dark-mode .container {
  background: #1f2937;
}

.dark-mode .meeting-title {
  color: #f9fafb;
}

.dark-mode .meeting-subtitle {
  color: #9ca3af;
}

.dark-mode .back-btn {
  background: #374151;
  color: #e5e7eb;
  border: 1px solid #4b5563;
}

.dark-mode .back-btn:hover {
  background: #4b5563;
  border-color: #6b7280;
}

.dark-mode .empty-state {
  background: #1f2937;
}

.dark-mode .empty-state h3 {
  color: #f9fafb;
}

.dark-mode .empty-state p {
  color: #9ca3af;
}

/* Container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Header Section */
.header-section {
  padding: 2rem;
  border-bottom: 1px solid;
  transition: border-color 0.3s ease;
}

.light-mode .header-section {
  border-bottom-color: #e5e7eb;
}

.dark-mode .header-section {
  border-bottom-color: #374151;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1.5rem;
}

.back-btn .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.title-wrapper {
  text-align: center;
}

.meeting-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.light-mode .meeting-badge {
  background: #eff6ff;
  color: #3b82f6;
}

.dark-mode .meeting-badge {
  background: #1e3a8a;
  color: #60a5fa;
}

.badge-icon {
  font-size: 0.875rem;
}

.badge-text {
  letter-spacing: 0.05em;
  text-transform: uppercase;
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
}

.special-badge {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.meeting-subtitle {
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Content Section */
.content-section {
  padding: 2rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  opacity: 0.5;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

.light-mode .empty-icon {
  color: #9ca3af;
}

.dark-mode .empty-icon {
  color: #6b7280;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-state p {
  margin-bottom: 0.25rem;
}

.empty-state .text-sm {
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .week-view {
    padding: 1rem;
  }
  
  .header-section {
    padding: 1.5rem;
  }
  
  .content-section {
    padding: 1.5rem;
  }
  
  .meeting-title {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .week-view {
    padding: 0.75rem;
  }
  
  .header-section {
    padding: 1rem;
  }
  
  .content-section {
    padding: 1rem;
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
}

/* Animation */
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

.container {
  animation: fadeIn 0.5s ease-out;
}
</style>