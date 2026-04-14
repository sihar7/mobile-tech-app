<template>
  <div :class="['app-shell', isDarkMode ? 'dark' : 'light']">
    <!-- Background Mesh dengan efek dinamis -->
    <div class="bg-mesh" aria-hidden="true">
      <div class="mesh-blob blob-1" />
      <div class="mesh-blob blob-2" />
      <div class="mesh-blob blob-3" />
      <div class="mesh-blob blob-4" />
      <div class="mesh-grain" />
    </div>

    <!-- Navbar dengan efek glassmorphism modern -->
    <header class="navbar-wrapper">
      <nav class="navbar">
        <!-- Brand dengan animasi interaktif -->
        <div class="brand" @click="refreshData">
          <div class="brand-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="12" class="brand-rect" />
              <text x="20" y="28" text-anchor="middle" font-size="20" class="brand-emoji">📱</text>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">Mobile</span>
            <span class="brand-subtitle">Teknologi</span>
          </div>
        </div>

        <!-- Center: Clock & Weather dengan interaktivitas modern -->
        <div class="nav-center">
          <div class="pill clock-pill" @click="toggleClockFormat">
            <span class="pill-icon">⏰</span>
            <span class="clock-digits">{{ formattedTime }}</span>
            <span class="clock-format-badge" v-if="!showSeconds">HH:MM</span>
          </div>

          <div class="pill weather-pill" v-if="weatherLoaded" @click="refreshWeather">
            <div class="weather-icon-wrapper">
              <span v-if="weatherIcon" v-html="weatherIcon" class="weather-img" />
              <div class="weather-tooltip" v-if="weatherDetails">
                <span>{{ weatherDetails }}</span>
              </div>
            </div>
            <div class="weather-info">
              <span class="weather-city">{{ location }}</span>
              <span class="weather-desc">{{ weatherDescription }}</span>
              <span class="weather-temp" v-if="temperature">{{ temperature }}°C</span>
            </div>
            <div class="refresh-indicator" v-if="isRefreshing">
              <span class="spinner" />
            </div>
          </div>
          <div class="pill weather-pill loading" v-else>
            <div class="skeleton-loader">
              <span class="skeleton-dot" /><span class="skeleton-dot" /><span class="skeleton-dot" />
            </div>
          </div>
        </div>

        <!-- Right: Actions dengan efek modern -->
        <div class="nav-actions">
          <button class="action-btn theme-btn" @click="toggleTheme" :title="isDarkMode ? 'Light mode' : 'Dark mode'">
            <Transition name="icon-flip" mode="out-in">
              <span :key="isDarkMode" class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
            </Transition>
            <span class="btn-ripple" />
          </button>
          <button class="action-btn music-btn" @click="toggleMusic" :title="isPlaying ? 'Pause' : 'Play'">
            <span class="music-icon">{{ isPlaying ? '⏸️' : '🎵' }}</span>
            <div class="music-wave-container" v-if="isPlaying">
              <span class="wave-bar" v-for="i in 4" :key="i" :style="{ animationDelay: `${i * 0.1}s` }" />
            </div>
            <span class="btn-ripple" />
          </button>
        </div>
      </nav>
    </header>

    <!-- Audio dengan kontrol volume modern -->
    <audio ref="backgroundMusic" loop preload="auto">
      <source src="@/assets/wildflower.mp3" type="audio/mpeg" />
    </audio>

    <!-- Main dengan efek parallax -->
    <main class="main-content">
      <div class="content-card">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>

    <!-- Footer dengan efek modern -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-decoration">
          <span class="footer-dot pulse-dot" />
          <span class="footer-line" />
        </div>
        <span>© 2025 Sigit Hardianto</span>
        <span class="footer-separator">✦</span>
        <span>All rights reserved</span>
        <div class="footer-decoration">
          <span class="footer-line" />
          <span class="footer-dot pulse-dot" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue';

// ==================== STATE MANAGEMENT ====================
const backgroundMusic = ref(null);
const isPlaying = ref(false);
const currentTime = ref(new Date());
const showSeconds = ref(true);
const weatherDescription = ref('');
const weatherIcon = ref(null);
const location = ref('');
const temperature = ref(null);
const weatherDetails = ref('');
const weatherLoaded = ref(false);
const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
const notified = ref(false);
const isRefreshing = ref(false);
let timeInterval = null;
let weatherInterval = null;

provide('isDarkMode', isDarkMode);

// ==================== COMPUTED PROPERTIES ====================
const formattedTime = computed(() => {
  const now = currentTime.value;
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  if (showSeconds.value) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}`;
});

// ==================== METHODS ====================
const toggleTheme = () => {
  // Efek ripple animation
  const btn = document.querySelector('.theme-btn');
  if (btn) {
    btn.classList.add('ripple-effect');
    setTimeout(() => btn.classList.remove('ripple-effect'), 300);
  }
  
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  
  // Apply theme transition
  document.documentElement.style.setProperty('--transition-duration', '0.3s');
};

const toggleClockFormat = () => {
  showSeconds.value = !showSeconds.value;
  // Efek haptic feedback
  const pill = document.querySelector('.clock-pill');
  if (pill) {
    pill.style.transform = 'scale(0.95)';
    setTimeout(() => {
      if (pill) pill.style.transform = '';
    }, 150);
  }
};

const toggleMusic = () => {
  if (!backgroundMusic.value) return;
  
  if (backgroundMusic.value.paused) {
    backgroundMusic.value.play().catch(e => {
      console.log('Audio play failed:', e);
      showToast('🎵 Audio dimulai', 'success');
    });
    isPlaying.value = true;
    showToast('🎵 Memutar musik', 'info');
  } else {
    backgroundMusic.value.pause();
    isPlaying.value = false;
    showToast('⏸️ Musik dijeda', 'info');
  }
};

const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

const refreshWeather = async () => {
  if (isRefreshing.value) return;
  
  isRefreshing.value = true;
  
  try {
    await fetchWeather();
    showToast('🌤️ Cuaca diperbarui', 'success');
  } catch (error) {
    console.error('Weather refresh failed:', error);
    showToast('⚠️ Gagal memperbarui cuaca', 'error');
  } finally {
    setTimeout(() => {
      isRefreshing.value = false;
    }, 500);
  }
};

const refreshData = () => {
  refreshWeather();
  updateTime();
  showToast('🔄 Data diperbarui', 'info');
};

const fetchWeather = async () => {
  try {
    const apiKey = 'b3a273f9c8b9b6b545daeddc92c6d50a';
    const lat = -6.901277336454229;
    const lon = 107.59783869058961;
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`
    );
    
    if (!response.ok) throw new Error('Weather API failed');
    
    const data = await response.json();
    location.value = data.name || 'Bandung';
    weatherDescription.value = data.weather?.[0]?.description ?? '';
    temperature.value = data.main?.temp ? Math.round(data.main.temp) : null;
    
    // Weather details for tooltip
    weatherDetails.value = `Kelembaban: ${data.main?.humidity || '--'}% | Angin: ${data.wind?.speed || '--'} m/s`;
    
    const icon = data.weather?.[0]?.icon;
    if (icon) {
      weatherIcon.value = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="36" height="36" alt="weather icon" />`;
    }
    
    weatherLoaded.value = true;
  } catch (error) {
    console.warn('Weather fetch failed:', error);
    location.value = 'Bandung';
    weatherDescription.value = 'Gagal memuat';
    temperature.value = null;
    weatherLoaded.value = true;
  }
};

const updateTime = () => {
  const now = new Date();
  currentTime.value = now;
  
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  if (hours === '12' && minutes === '00' && !notified.value) {
    notified.value = true;
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Waktu menunjukkan pukul 12:00');
    }
    showToast('🕛 Waktu menunjukkan pukul 12:00', 'info');
  }
  
  if (hours === '00' && minutes === '00' && seconds === '00') {
    notified.value = false;
  }
};

const initTimeUpdates = () => {
  updateTime();
  if (timeInterval) clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);
};

// ==================== LIFECYCLE HOOKS ====================
onMounted(async () => {
  initTimeUpdates();
  await fetchWeather();
  
  // Auto-refresh weather setiap 30 menit
  weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);
  
  // Request notification permission
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  
  // Set initial audio volume
  if (backgroundMusic.value) {
    backgroundMusic.value.volume = 0.3;
  }
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
  if (weatherInterval) clearInterval(weatherInterval);
  if (backgroundMusic.value) {
    backgroundMusic.value.pause();
    backgroundMusic.value.src = '';
  }
});
</script>

<style>
/* ===================== FONTS (TETAP SAMA) ===================== */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ===================== BASE TOKENS ===================== */
:root {
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --radius-sm:  10px;
  --radius-md:  16px;
  --radius-lg:  24px;
  --radius-xl:  32px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* ===================== LIGHT MODE (SOFT MODERN) ===================== */
/* ===================== LIGHT MODE (CLEAN MODERN) ===================== */
.light {
  /* Background - clean soft blue */
  --bg-base:      linear-gradient(135deg, #0357a5 0%, #0751b3 50%, #055c96 100%);

  --bg-mesh-1:    #052a57;
  --bg-mesh-2:    #93c5fd;
  --bg-mesh-3:    #dbeafe;
  --bg-mesh-4:    #054774;

  /* Surface - clean glass */
  --surface:         rgba(255, 255, 255, 0.7);
  --surface-border:  rgba(148, 163, 184, 0.15);
  --pill-bg:         rgba(255, 255, 255, 0.8);
  --pill-border:     rgba(148, 163, 184, 0.2);

  /* Text (tetap) */
  --text-primary:   #0f172a;
  --text-secondary: #334155;
  --text-muted:     #64748b;

  /* Accent - satu arah (biru clean) */
  --accent:         #2563eb;
  --accent-soft:    rgba(37, 99, 235, 0.08);
  --accent-border:  rgba(37, 99, 235, 0.25);

  /* Card */
  --card-active-bg:      rgba(255, 255, 255, 0.85);
  --card-active-border:  #5688f3;
  --card-active-shadow:  rgba(37, 99, 235, 0.15);

  --card-past-bg:        rgba(248, 250, 252, 0.8);
  --card-past-border:    rgba(148, 163, 184, 0.25);

  --card-locked-bg:      rgba(248, 250, 252, 0.6);
  --card-locked-border:  rgba(148, 163, 184, 0.2);

  --card-time-bg:        rgba(254, 243, 199, 0.8);
  --card-time-border:    rgba(245, 158, 11, 0.4);

  /* Overlay */
  --overlay-bg:    rgba(248, 250, 252, 0.85);
  --overlay-title: #0f172a;
  --overlay-date:  #334155;

  /* Shadow - clean */
  --shadow:    0 8px 24px rgba(0, 0, 0, 0.06);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.08);
}


/* ===================== DARK MODE (SOFT MODERN) ===================== */
.dark {
  /* Background - deep soft gradient */
  --bg-base:      linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%);
  --bg-mesh-1:    #1e293b;
  --bg-mesh-2:    #312e81;
  --bg-mesh-3:    #134e4a;
  --bg-mesh-4:    #1e3a8a;

  /* Surfaces - smooth glass */
  --surface:         rgba(15, 23, 42, 0.6);
  --surface-border:  rgba(148, 163, 184, 0.15);
  --pill-bg:         rgba(30, 41, 59, 0.7);
  --pill-border:     rgba(148, 163, 184, 0.2);

  /* Text (TIDAK DIUBAH) */
  --text-primary:   #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted:     #64748b;

  /* Accent - soft neon blue */
  --accent:         #818cf8;
  --accent-soft:    rgba(129, 140, 248, 0.12);
  --accent-border:  rgba(129, 140, 248, 0.25);

  /* Card states */
  --card-active-bg:      rgba(30, 41, 59, 0.7);
  --card-active-border:  #818cf8;
  --card-active-shadow:  rgba(129, 140, 248, 0.2);

  --card-past-bg:        rgba(15, 23, 42, 0.6);
  --card-past-border:    rgba(148, 163, 184, 0.15);

  --card-locked-bg:      rgba(15, 23, 42, 0.5);
  --card-locked-border:  rgba(148, 163, 184, 0.1);

  --card-time-bg:        rgba(120, 53, 15, 0.5);
  --card-time-border:    rgba(251, 146, 60, 0.3);

  /* Overlay */
  --overlay-bg:    rgba(15, 23, 42, 0.75);
  --overlay-title: #e2e8f0;
  --overlay-date:  #94a3b8;

  /* Shadow lebih halus */
  --shadow:    0 10px 30px rgba(0, 0, 0, 0.35);
  --shadow-sm: 0 2px 10px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.45);
}

/* ===================== RESET ===================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-body);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

/* ===================== SHELL ===================== */
.app-shell {
  min-height: 100dvh;
  background: var(--bg-base);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  transition: background var(--transition), color var(--transition);
}

/* ===================== MESH BACKGROUND ===================== */
.bg-mesh {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: blobFloat 15s ease-in-out infinite;
}

.blob-1 { width: 600px; height: 600px; background: var(--bg-mesh-1); top: -150px; left: -100px; animation-delay: 0s; }
.blob-2 { width: 500px; height: 500px; background: var(--bg-mesh-2); top: 30%; right: -120px; animation-delay: -3s; }
.blob-3 { width: 450px; height: 450px; background: var(--bg-mesh-3); bottom: -100px; left: 20%; animation-delay: -6s; }
.blob-4 { width: 400px; height: 400px; background: var(--bg-mesh-4); bottom: 20%; right: 30%; animation-delay: -9s; }

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(40px, -50px) scale(1.08); }
  66%  { transform: translate(-30px, 40px) scale(0.92); }
}

.mesh-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.3;
}

/* ===================== NAVBAR ===================== */
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 16px 20px 0;
}

.navbar {
  max-width: 1280px;
  margin: 0 auto;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  backdrop-filter: blur(24px) saturate(1.8);
  -webkit-backdrop-filter: blur(24px) saturate(1.8);
  border-radius: var(--radius-xl);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow);
  transition: all var(--transition);
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.brand:active {
  transform: scale(0.98);
}

.brand-icon {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}

.brand:hover .brand-icon {
  transform: rotate(8deg) scale(1.05);
}

.brand-emoji {
  font-size: 20px;
  fill: var(--text-primary);
}

.brand-rect {
  fill: var(--accent-soft);
  stroke: var(--accent-border);
  stroke-width: 1.5;
  transition: all 0.3s ease;
}

.brand:hover .brand-rect {
  stroke-width: 2;
  filter: drop-shadow(0 0 8px var(--accent-soft));
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.brand-subtitle {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Nav Center */
.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* Pills Modern */
.pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--pill-bg);
  border: 1px solid var(--pill-border);
  border-radius: 100px;
  padding: 7px 14px;
  backdrop-filter: blur(12px);
  transition: all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.pill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-soft);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.pill:active::before {
  opacity: 0.3;
}

.pill:active {
  transform: scale(0.96);
}

.pill-icon { font-size: 1rem; }

.clock-digits {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
}

.clock-format-badge {
  font-size: 0.6rem;
  background: var(--accent-soft);
  padding: 2px 6px;
  border-radius: 20px;
  color: var(--accent);
  font-weight: 600;
}

.weather-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.weather-img :deep(img) {
  width: 32px;
  height: 32px;
  display: block;
  transition: transform 0.2s ease;
}

.weather-pill:hover .weather-img :deep(img) {
  transform: scale(1.08);
}

.weather-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  backdrop-filter: blur(12px);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  margin-bottom: 8px;
  border: 1px solid var(--surface-border);
  color: var(--text-secondary);
}

.weather-icon-wrapper:hover .weather-tooltip {
  opacity: 1;
}

.weather-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.weather-city {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
}

.weather-desc {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: capitalize;
}

.weather-temp {
  font-size: 0.65rem;
  color: var(--accent);
  font-weight: 600;
  margin-left: 4px;
}

.refresh-indicator {
  margin-left: 4px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--accent-soft);
  border-top-color: var(--accent);
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Skeleton Loader */
.skeleton-loader {
  display: flex;
  gap: 6px;
  padding: 4px 0;
}

.skeleton-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: skeletonPulse 1s ease-in-out infinite;
  opacity: 0.5;
}

.skeleton-dot:nth-child(2) { animation-delay: 0.15s; }
.skeleton-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes skeletonPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--pill-border);
  background: var(--pill-bg);
  backdrop-filter: blur(12px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
  color: var(--text-primary);
}

.action-btn:active {
  transform: scale(0.92);
}

.action-btn:hover {
  transform: scale(1.05);
  background: var(--accent-soft);
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.btn-ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
}

.action-btn.ripple-effect .btn-ripple {
  animation: ripple 0.3s ease-out;
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 var(--accent);
    opacity: 0.5;
  }
  100% {
    box-shadow: 0 0 0 20px var(--accent);
    opacity: 0;
  }
}

/* Music wave */
.music-btn {
  flex-direction: column;
  gap: 2px;
  position: relative;
}

.music-icon {
  font-size: 1.2rem;
}

.music-wave-container {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 10px;
  position: absolute;
  bottom: -12px;
}

.wave-bar {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  animation: waveRise 0.6s ease-in-out infinite;
}

.wave-bar:nth-child(1) { height: 4px; animation-delay: 0s; }
.wave-bar:nth-child(2) { height: 8px; animation-delay: 0.1s; }
.wave-bar:nth-child(3) { height: 6px; animation-delay: 0.2s; }
.wave-bar:nth-child(4) { height: 10px; animation-delay: 0.3s; }

@keyframes waveRise {
  0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
  50% { transform: scaleY(1); opacity: 1; }
}

/* Icon flip transition */
.icon-flip-enter-active,
.icon-flip-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.icon-flip-enter-from {
  transform: rotateY(90deg);
  opacity: 0;
}
.icon-flip-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}

/* ===================== MAIN ===================== */
.main-content {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.content-card {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  backdrop-filter: blur(20px) saturate(1.6);
  -webkit-backdrop-filter: blur(20px) saturate(1.6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all var(--transition);
  flex: 1;
}

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}

/* ===================== FOOTER ===================== */
.site-footer {
  position: relative;
  z-index: 1;
  padding: 16px 20px 24px;
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  background: var(--pill-bg);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  border-radius: 100px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-family: var(--font-body);
  transition: all 0.2s ease;
}

.footer-decoration {
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.pulse-dot {
  animation: pulseDot 1.5s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.footer-line {
  width: 20px;
  height: 1px;
  background: var(--accent);
  opacity: 0.5;
}

.footer-separator {
  color: var(--accent);
  font-size: 0.7rem;
  opacity: 0.6;
}

.footer-inner:hover {
  transform: translateY(-2px);
  border-color: var(--accent-border);
  box-shadow: var(--shadow-sm);
}

.footer-inner:hover .footer-dot {
  opacity: 1;
  background: var(--accent);
}

/* ===================== TOAST NOTIFICATION ===================== */
.toast-notification {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  backdrop-filter: blur(24px);
  border: 1px solid var(--accent-border);
  border-radius: 100px;
  padding: 10px 24px;
  font-size: 0.85rem;
  color: var(--text-primary);
  z-index: 1000;
  animation: toastSlideUp 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), toastFadeOut 0.3s ease 2s forwards;
  pointer-events: none;
  font-family: var(--font-body);
  box-shadow: var(--shadow-lg);
  font-weight: 500;
}

.toast-notification.toast-success {
  border-left: 3px solid #10b981;
}

.toast-notification.toast-error {
  border-left: 3px solid #ef4444;
}

@keyframes toastSlideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes toastFadeOut {
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 768px) {
  .navbar-wrapper { padding: 12px 12px 0; }
  .navbar {
    padding: 10px 16px;
    gap: 12px;
    border-radius: var(--radius-lg);
    flex-wrap: wrap;
  }
  .nav-center {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 8px;
  }
  .brand-subtitle {
    display: none;
  }
  .clock-digits {
    font-size: 0.85rem;
  }
  .pill {
    padding: 6px 12px;
    gap: 6px;
  }
  .weather-city {
    font-size: 0.72rem;
  }
  .weather-desc {
    display: none;
  }
  .weather-temp {
    font-size: 0.6rem;
  }
  .main-content {
    padding: 12px;
  }
  .content-card {
    border-radius: var(--radius-lg);
  }
  .site-footer {
    padding: 10px 12px 16px;
  }
  .footer-inner {
    font-size: 0.7rem;
    padding: 8px 16px;
    gap: 8px;
  }
  .action-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  .footer-line {
    width: 12px;
  }
}

@media (max-width: 480px) {
  .brand-icon {
    width: 32px;
    height: 32px;
  }
  .brand-title {
    font-size: 0.9rem;
  }
  .action-btn {
    width: 38px;
    height: 38px;
    font-size: 0.95rem;
  }
  .pill .weather-info {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 4px;
  }
  .weather-city {
    font-size: 0.7rem;
  }
  .footer-inner {
    flex-wrap: wrap;
    border-radius: 40px;
    gap: 6px;
  }
  .footer-decoration {
    display: none;
  }
}

/* ===================== SCROLL BEHAVIOR ===================== */
html {
  scroll-behavior: smooth;
}

/* Smooth transitions for all interactive elements */
button,
.pill,
.brand {
  -webkit-tap-highlight-color: transparent;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--surface);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-border);
}
</style>