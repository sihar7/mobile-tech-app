<template>
  <div class="home">
    <!-- Header -->
    <div class="home-header">
      <div class="header-badge">
        <span class="badge-dot" />
        Semester Genap · 2026
      </div>
      <h1 class="header-title">Jadwal Pertemuan</h1>
      <p class="header-sub">Pilih pertemuan yang ingin kamu akses</p>

      <!-- Stats bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-value">{{ stats.done }}</span>
          <span class="stat-label">Selesai</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-value stat-active">{{ stats.active }}</span>
          <span class="stat-label">Aktif</span>
        </div>
        <div class="stat-divider" />
        <div class="stat-item">
          <span class="stat-value">{{ stats.locked }}</span>
          <span class="stat-label">Terkunci</span>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="week-grid">
      <div
        v-for="(week, index) in weeks"
        :key="week.id"
        :class="['week-card', cardState(week)]"
        :style="{ animationDelay: `${index * 40}ms` }"
        @click="handleClick(week)"
        role="button"
        :tabindex="0"
        @keydown.enter="handleClick(week)"
        :aria-label="`Pertemuan ${week.id}`"
      >
        <!-- Card Glow (unlocked only) -->
        <div v-if="isUnlocked(week) && !isExpired(week)" class="card-glow" />

        <!-- Top badges -->
        <div class="card-badges">
          <span v-if="week.id === 15" class="badge badge-repair">Perbaikan ✅</span>
          <span v-if="isHolidayUnlocked(week.date)" class="badge badge-holiday">🌴 Libur</span>
          <span v-if="isExpired(week)" class="badge badge-expired">⏰ Telah Berakhir</span>
          <span v-else-if="isDateUnlocked(week) && !isUnlocked(week) && !isExpired(week)" class="badge badge-time">⏰ Belum Waktunya</span>
        </div>

        <!-- Number -->
        <div class="card-number">
          <span class="number-label">Pertemuan</span>
          <span class="number-value">{{ week.id.toString().padStart(2, '0') }}</span>
        </div>

        <!-- Date chip -->
        <div class="card-date">
          <span class="date-icon">📅</span>
          <span>{{ formatDate(week.date) }}</span>
        </div>

        <!-- Timer Countdown (untuk pertemuan yang aktif) -->
        <div v-if="isUnlocked(week) && !isExpired(week) && week.id !== 15" class="timer-container">
          <div class="timer-wrapper">
            <svg class="timer-svg" viewBox="0 0 100 100">
              <circle class="timer-bg" cx="50" cy="50" r="45" />
              <circle 
                class="timer-progress" 
                cx="50" 
                cy="50" 
                r="45" 
                :style="{ strokeDashoffset: getTimerProgress(week) }"
              />
            </svg>
            <div class="timer-content">
              <span class="timer-label">Sisa Waktu</span>
              <span class="timer-value">{{ getTimeRemaining(week) }}</span>
            </div>
          </div>
        </div>

        <!-- Status indicator -->
        <div class="card-status">
          <template v-if="isExpired(week)">
            <span class="status-dot expired" />
            <span class="status-text">Telah Berakhir</span>
            <span class="status-icon">⏰</span>
          </template>
          <template v-else-if="isUnlocked(week)">
            <span class="status-dot active" />
            <span class="status-text">{{ week.id === 15 ? 'Butuh Password' : 'Buka Sekarang' }}</span>
            <span class="status-icon">→</span>
          </template>
          <!-- Tanggal sudah oke tapi jam belum >= 08.00 -->
          <template v-else-if="isDateUnlocked(week)">
            <span class="status-dot time" />
            <span class="status-text">Mulai pukul 08.00</span>
            <span class="status-icon">⏰</span>
          </template>
          <template v-else>
            <span class="status-dot locked" />
            <span class="status-text">Terkunci</span>
            <span class="status-icon">🔒</span>
          </template>
        </div>

        <!-- Info closing date (untuk pertemuan yang belum expired) -->
        <div v-if="!isExpired(week) && week.id !== 15 && !isUnlocked(week)" class="closing-info">
          <span class="closing-text">📅 Ditutup: {{ formatClosingDate(week) }}</span>
        </div>

        <!-- Locked overlay -->
        <Transition name="lock">
          <div
            v-if="!isUnlocked(week) && !isHolidayUnlocked(week.date)"
            class="locked-overlay"
          >
            <div class="lock-content">
              <!-- Kasus: sudah expired/berakhir -->
              <template v-if="isExpired(week)">
                <div class="lock-icon">⏰</div>
                <div class="lock-info">
                  <span class="lock-title">Pertemuan Telah Berakhir</span>
                  <span class="lock-date">Akses ditutup pada {{ formatClosingDate(week) }}</span>
                </div>
              </template>
              <!-- Kasus: tanggal sudah tapi jam belum 08.00 -->
              <template v-else-if="isDateUnlocked(week)">
                <div class="lock-icon">⏰</div>
                <div class="lock-info">
                  <span class="lock-title">Belum Waktunya</span>
                  <span class="lock-date">Akses dibuka mulai pukul 08.00</span>
                </div>
              </template>
              <!-- Kasus: tanggal belum sampai -->
              <template v-else>
                <div class="lock-icon">🔒</div>
                <div class="lock-info">
                  <span class="lock-title">Terkunci</span>
                  <span class="lock-date">{{ formatDate(week.date) }}</span>
                </div>
              </template>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const isDarkMode = inject('isDarkMode', ref(false));
const router = useRouter();

// ─── Dates ────────────────────────────────────────────────
const startDate    = new Date(2026, 2, 25); // 25 Mar 2026
const holidayStart = new Date(2026, 11, 24);
const holidayEnd   = new Date(2026, 11, 31);

// ─── Generate weeks ───────────────────────────────────────
const weeks = [];
let cursor = new Date(startDate);
for (let i = 1; i <= 15; i++) {
  while (cursor >= holidayStart && cursor <= holidayEnd) {
    cursor.setDate(cursor.getDate() + 7);
  }
  weeks.push({ id: i, date: new Date(cursor) });
  cursor.setDate(cursor.getDate() + 7);
}

// ─── Timer State ─────────────────────────────────────────
const timeRemaining = ref({});
let timerInterval = null;

// Fungsi untuk mendapatkan tanggal penutupan pertemuan (H-1 sebelum pertemuan berikutnya)
const getClosingDate = (week) => {
  if (week.id === 15) return null;
  const nextWeek = weeks.find(w => w.id === week.id + 1);
  if (!nextWeek) return null;
  const closingDate = new Date(nextWeek.date);
  closingDate.setDate(closingDate.getDate() - 1);
  closingDate.setHours(23, 59, 59, 999);
  return closingDate;
};

// Fungsi untuk mengecek apakah pertemuan sudah expired/berakhir
const isExpired = (week) => {
  const closingDate = getClosingDate(week);
  if (!closingDate) return false;
  return new Date() > closingDate;
};

// Format tanggal penutupan
const formatClosingDate = (week) => {
  const closingDate = getClosingDate(week);
  if (!closingDate) return '';
  return formatDate(closingDate);
};

// Hitung sisa waktu dengan format fleksibel (hari/jam/menit/detik)
const calculateTimeRemaining = (week) => {
  if (!isUnlocked(week) || week.id === 15 || isExpired(week)) return null;
  
  const closingDate = getClosingDate(week);
  if (!closingDate) return null;
  
  const now = new Date();
  const diff = closingDate - now;
  
  if (diff <= 0) return null;
  
  // Hitung semua unit
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { days, hours, minutes, seconds, total: diff };
};

// Format sisa waktu dengan logika fleksibel:
// - Jika masih > 24 jam: tampilkan hari
// - Jika < 24 jam: tampilkan jam dan menit
// - Jika < 1 jam: tampilkan menit dan detik
const getTimeRemaining = (week) => {
  const remaining = timeRemaining.value[week.id];
  if (!remaining) return '';
  
  const { days, hours, minutes, seconds } = remaining;
  
  if (days > 0) {
    return `${days} hari ${hours} jam`;
  } else if (hours > 0) {
    return `${hours} jam ${minutes} menit`;
  } else {
    return `${minutes} menit ${seconds} detik`;
  }
};

// Hitung progress timer (0-100%)
const getTimerProgress = (week) => {
  const remaining = timeRemaining.value[week.id];
  if (!remaining || !remaining.total) return 283; // circumference penuh
  
  const closingDate = getClosingDate(week);
  if (!closingDate) return 283;
  
  const openDate = new Date(week.date);
  openDate.setHours(8, 0, 0, 0);
  
  const totalDuration = closingDate - openDate;
  const elapsed = totalDuration - remaining.total;
  let percentage = (elapsed / totalDuration) * 100;
  // Batasi percentage antara 0 dan 100
  percentage = Math.min(100, Math.max(0, percentage));
  
  const circumference = 2 * Math.PI * 45; // 2 * π * r = 283
  const offset = circumference - (percentage / 100) * circumference;
  
  return offset;
};

// Update semua timer
const updateTimers = () => {
  weeks.forEach(week => {
    if (isUnlocked(week) && !isExpired(week) && week.id !== 15) {
      const remaining = calculateTimeRemaining(week);
      if (remaining) {
        timeRemaining.value[week.id] = remaining;
      } else if (timeRemaining.value[week.id]) {
        delete timeRemaining.value[week.id];
      }
    } else if (timeRemaining.value[week.id]) {
      delete timeRemaining.value[week.id];
    }
  });
};

// ─── Helpers ─────────────────────────────────────────────

function formatDate(date) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const d  = days[date.getDay()];
  const dd = date.getDate().toString().padStart(2, '0');
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const yy = date.getFullYear();
  return `${d}, ${dd}/${mm}/${yy}`;
}

// Apakah tanggal masuk range libur
const isHolidayUnlocked = (date) => date >= holidayStart && date <= holidayEnd;

// Apakah JAM saat ini sudah >= 08.00 (atau libur = bebas jam)
const isTimeValid = (weekDate) => {
  if (isHolidayUnlocked(weekDate)) return true;
  const h = new Date().getHours();
  return h >= 8 && h <= 23;
};

// Tanggal sudah lewat startDate (belum cek jam)
const isDateUnlocked = (week) => {
  const now = new Date();
  return now >= week.date || isHolidayUnlocked(week.date);
};

// Benar-benar terbuka: tanggal ✅ DAN jam ✅ DAN belum expired
const isUnlocked = (week) => {
  return isDateUnlocked(week) && isTimeValid(week.date) && !isExpired(week);
};

// Status card
const cardState = (week) => {
  if (isExpired(week)) return 'state-expired';
  if (isUnlocked(week)) return 'state-active';
  if (isDateUnlocked(week)) return 'state-time';
  return 'state-locked';
};

// ─── Stats ────────────────────────────────────────────────
const stats = computed(() => ({
  done:   weeks.filter(w => isExpired(w) && w.id !== 15).length,
  active: weeks.filter(w => isUnlocked(w) && !isExpired(w)).length,
  locked: weeks.filter(w => !isUnlocked(w) && !isExpired(w) && !isDateUnlocked(w)).length,
}));

// ─── Click handler ────────────────────────────────────────
const handleClick = async (week) => {
  const dark = isDarkMode.value;
  const bg   = dark ? '#0f172a' : '#EFF6FF';
  const btn  = dark ? '#60a5fa' : '#3b82f6';

  // ── Week 15: password ──────────────────────────────────
  if (week.id === 15) {
    if (!isUnlocked(week)) {
      const reason = !isDateUnlocked(week)
        ? `Tersedia pada ${formatDate(week.date)}`
        : 'Akses dibuka mulai pukul 08.00';
      return Swal.fire({
        title: '🔒 Belum Bisa Diakses',
        text: reason,
        icon: 'info',
        background: bg, confirmButtonColor: btn, confirmButtonText: 'Oke',
      });
    }

    const result = await Swal.fire({
      title: '🔐 Pertemuan Perbaikan',
      input: 'password',
      inputLabel: 'Masukkan password untuk membuka',
      inputPlaceholder: 'Password...',
      inputAttributes: { autocapitalize: 'off', autocorrect: 'off' },
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Akses',
      cancelButtonColor: '#ef4444',
      background: bg,
      confirmButtonColor: btn,
      preConfirm: (pw) => {
        if (pw !== 'mobilekuteknologi2025') Swal.showValidationMessage('❌ Password salah');
        return pw;
      },
    });
    if (!result.isConfirmed) return;
    return router.push(`/week/${week.id}`);
  }

  // ── Sudah expired/berakhir ─────────────────────────────
  if (isExpired(week)) {
    return Swal.fire({
      title: '⏰ Pertemuan Telah Berakhir',
      html: `Pertemuan <b>${week.id}</b> telah berakhir pada <b>${formatClosingDate(week)}</b><br><br>Akses sudah tidak tersedia. Silakan lanjut ke pertemuan berikutnya.`,
      icon: 'info',
      background: bg, confirmButtonColor: btn, confirmButtonText: 'Mengerti',
    });
  }

  // ── Tanggal ok tapi jam belum 08.00 ───────────────────
  if (isDateUnlocked(week) && !isUnlocked(week)) {
    return Swal.fire({
      title: '⏰ Belum Waktunya',
      html: `Pertemuan <b>${week.id}</b> baru bisa diakses mulai pukul <b>08.00</b>.`,
      icon: 'info',
      background: bg, confirmButtonColor: btn, confirmButtonText: 'Siap!',
    });
  }

  // ── Tanggal belum sampai ───────────────────────────────
  if (!isDateUnlocked(week)) {
    return Swal.fire({
      title: '🔒 Belum Bisa Diakses',
      html: `Pertemuan <b>${week.id}</b> akan tersedia pada<br><b>${formatDate(week.date)}</b>`,
      icon: 'info',
      background: bg, confirmButtonColor: btn, confirmButtonText: 'Oke deh 😢',
    });
  }

  // ── Terbuka ────────────────────────────────────────────
  router.push(`/week/${week.id}`);
};

// Lifecycle
onMounted(() => {
  updateTimers();
  timerInterval = setInterval(updateTimers, 1000);
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>

<style scoped>
/* ─── Layout ─────────────────────────────────── */
.home {
  padding: 32px 28px 40px;
  font-family: var(--font-body);
  background: var(--bg-base);
  min-height: 100vh;
}

/* ─── Header ─────────────────────────────────── */
.home-header {
  text-align: center;
  margin-bottom: 36px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  border-radius: 100px;
  padding: 5px 14px;
  margin-bottom: 16px;
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.header-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 8px;
}

.header-sub {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* Stats bar */
.stats-bar {
  display: inline-flex;
  align-items: center;
  background: var(--pill-bg);
  border: 1px solid var(--pill-border);
  border-radius: 100px;
  padding: 8px 20px;
  backdrop-filter: blur(12px);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.stat-value.stat-active { color: var(--accent); }

.stat-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--pill-border);
  flex-shrink: 0;
}

/* ─── Grid ───────────────────────────────────── */
.week-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* ─── Card base ──────────────────────────────── */
.week-card {
  position: relative;
  border-radius: var(--radius-lg);
  padding: 20px;
  border: 1px solid transparent;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: cardReveal 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.25s ease,
              background 0.25s ease;
  outline: none;
}

@keyframes cardReveal {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── States ─────────────────────────────────── */
.state-active {
  background: var(--surface);
  border-color: var(--accent);
  box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 20%, transparent),
              inset 0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent);
}
.state-active:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--accent) 30%, transparent),
              inset 0 0 0 1px color-mix(in srgb, var(--accent) 60%, transparent);
}
.state-active:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* Tanggal ok tapi jam belum 08.00 */
.state-time {
  background: color-mix(in srgb, var(--surface) 60%, transparent);
  border-color: color-mix(in srgb, #f59e0b 40%, transparent);
  cursor: not-allowed;
}

.state-expired {
  background: color-mix(in srgb, var(--surface) 50%, transparent);
  border-color: #f59e0b;
  opacity: 0.7;
  cursor: not-allowed;
}

.state-locked {
  background: color-mix(in srgb, var(--surface) 50%, transparent);
  border-color: var(--surface-border);
  cursor: not-allowed;
}

/* ─── Glow ───────────────────────────────────── */
.card-glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 25%, transparent), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* ─── Badges ─────────────────────────────────── */
.card-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  min-height: 20px;
}

.badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 100px;
}

.badge-repair {
  background: color-mix(in srgb, #10b981 15%, transparent);
  color: #10b981;
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
}

.badge-holiday {
  background: color-mix(in srgb, #f59e0b 15%, transparent);
  color: #f59e0b;
  border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
}

.badge-time {
  background: color-mix(in srgb, #f59e0b 12%, transparent);
  color: #d97706;
  border: 1px solid color-mix(in srgb, #f59e0b 25%, transparent);
}

.badge-expired {
  background: color-mix(in srgb, #f59e0b 15%, transparent);
  color: #f59e0b;
  border: 1px solid color-mix(in srgb, #f59e0b 30%, transparent);
}

/* ─── Number ─────────────────────────────────── */
.card-number {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.number-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.number-value {
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: -0.04em;
  transition: color var(--transition);
}

.state-active .number-value { color: var(--accent); }
.state-expired .number-value,
.state-time .number-value { color: #f59e0b; }

/* ─── Date chip ──────────────────────────────── */
.card-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--text-primary) 5%, transparent);
  border-radius: 8px;
  padding: 5px 8px;
  position: relative;
  z-index: 1;
}

.date-icon { font-size: 0.8rem; }

/* ─── Timer Container ────────────────────────── */
.timer-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin: 8px 0;
}

.timer-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.timer-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.timer-bg {
  fill: none;
  stroke: color-mix(in srgb, var(--text-primary) 15%, transparent);
  stroke-width: 8;
}

.timer-progress {
  fill: none;
  stroke: var(--accent);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 283;
  transition: stroke-dashoffset 1s linear;
}

.timer-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.timer-label {
  font-size: 0.55rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 2px;
}

.timer-value {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent);
  display: block;
  white-space: nowrap;
}

/* ─── Status ─────────────────────────────────── */
.card-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  position: relative;
  z-index: 1;
}

.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.active {
  background: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
  animation: pulseDot 2s infinite;
}
.status-dot.time,
.status-dot.expired { background: #f59e0b; }
.status-dot.locked { background: var(--text-muted); }

.status-text { flex: 1; color: var(--text-secondary); }
.status-icon { margin-left: auto; }

.state-active .status-text { color: var(--accent); }
.state-active .status-icon {
  animation: arrowBounce 1.5s ease-in-out infinite;
  display: inline-block;
}
.state-time .status-text,
.state-expired .status-text { color: #f59e0b; }

@keyframes arrowBounce {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(4px); }
}

/* ─── Closing Info ──────────────────────────── */
.closing-info {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-align: center;
  padding: 4px 6px;
  background: color-mix(in srgb, var(--text-primary) 5%, transparent);
  border-radius: 6px;
  position: relative;
  z-index: 1;
}

/* ─── Locked overlay ─────────────────────────── */
.locked-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  background: color-mix(in srgb, var(--bg-base) 60%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  z-index: 10;
}

.lock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  padding: 0 12px;
}

.lock-icon { font-size: 1.8rem; }

.lock-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lock-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}

.lock-date {
  font-size: 0.68rem;
  color: var(--text-secondary);
  line-height: 1.3;
}

/* Lock transition */
.lock-enter-active, .lock-leave-active { transition: opacity 0.3s; }
.lock-enter-from, .lock-leave-to       { opacity: 0; }

/* ─── Responsive ─────────────────────────────── */
@media (max-width: 768px) {
  .home { padding: 20px 16px 28px; }
  .week-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
  .number-value { font-size: 2rem; }
  .stats-bar { padding: 6px 12px; }
  .stat-item { padding: 0 10px; }
  .timer-wrapper { width: 70px; height: 70px; }
  .timer-value { font-size: 0.7rem; white-space: normal; word-break: keep-all; }
}

@media (max-width: 480px) {
  .week-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .home { padding: 16px 12px 24px; }
  .header-title { font-size: 1.6rem; }
  .week-card { padding: 16px; }
  .timer-wrapper { width: 60px; height: 60px; }
  .timer-value { font-size: 0.6rem; }
  .timer-label { font-size: 0.5rem; }
}

/* Dark mode adjustments */
:deep(.dark-mode) .closing-info {
  background: color-mix(in srgb, #ffffff 5%, transparent);
}

:deep(.dark-mode) .timer-bg {
  stroke: color-mix(in srgb, #ffffff 15%, transparent);
}
</style>