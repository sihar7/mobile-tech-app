<template>
  <div :class="['app-shell', isDarkMode ? 'dark' : 'light']">
    <!-- Background Mesh -->
    <div class="bg-mesh" aria-hidden="true">
      <div class="mesh-blob blob-1" />
      <div class="mesh-blob blob-2" />
      <div class="mesh-blob blob-3" />
      <div class="mesh-grain" />
    </div>

    <!-- Navbar -->
    <header class="navbar-wrapper">
      <nav class="navbar">
        <!-- Brand -->
        <div class="brand">
          <div class="brand-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="12" class="brand-rect" />
              <text x="20" y="28" text-anchor="middle" font-size="20">📱</text>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-title">Mobile</span>
            <span class="brand-subtitle">Teknologi</span>
          </div>
        </div>

        <!-- Center: Clock & Weather -->
        <div class="nav-center">
          <div class="pill clock-pill">
            <span class="pill-icon">⏰</span>
            <span class="clock-digits">{{ currentTime }}</span>
          </div>

          <div class="pill weather-pill" v-if="weatherLoaded">
            <span v-if="weatherIcon" v-html="weatherIcon" class="weather-img" />
            <div class="weather-info">
              <span class="weather-city">{{ location }}</span>
              <span class="weather-desc">{{ weatherDescription }}</span>
            </div>
          </div>
          <div class="pill weather-pill loading" v-else>
            <span class="loading-dot" /><span class="loading-dot" /><span class="loading-dot" />
          </div>
        </div>

        <!-- Right: Actions -->
        <div class="nav-actions">
          <button class="action-btn" @click="toggleTheme" :title="isDarkMode ? 'Light mode' : 'Dark mode'">
            <Transition name="icon-flip" mode="out-in">
              <span :key="isDarkMode">{{ isDarkMode ? '☀️' : '🌙' }}</span>
            </Transition>
          </button>
          <button class="action-btn music-btn" @click="toggleMusic" :title="isPlaying ? 'Pause' : 'Play'">
            <span>{{ isPlaying ? '⏸️' : '🎵' }}</span>
            <span class="music-wave" v-if="isPlaying">
              <span /><span /><span /><span />
            </span>
          </button>
        </div>
      </nav>
    </header>

    <!-- Audio -->
    <audio ref="backgroundMusic" loop>
      <source src="@/assets/wildflower.mp3" type="audio/mpeg" />
    </audio>

    <!-- Main -->
    <main class="main-content">
      <div class="content-card">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-inner">
        <span class="footer-dot" />
        <span>© 2025 Sigit Hardianto</span>
        <span class="footer-dot" />
        <span>All rights reserved</span>
        <span class="footer-dot" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';

const backgroundMusic = ref(null);
const isPlaying       = ref(false);
const currentTime     = ref('--:--:--');
const weatherDescription = ref('');
const weatherIcon     = ref(null);
const location        = ref('');
const weatherLoaded   = ref(false);
const isDarkMode      = ref(localStorage.getItem('theme') === 'dark');
const notified        = ref(false);

provide('isDarkMode', isDarkMode);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const toggleMusic = () => {
  if (!backgroundMusic.value) return;
  if (backgroundMusic.value.paused) {
    backgroundMusic.value.play();
    isPlaying.value = true;
  } else {
    backgroundMusic.value.pause();
    isPlaying.value = false;
  }
};

onMounted(() => {
  const updateTime = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    currentTime.value = `${h}:${m}:${s}`;
    if (h === '12' && m === '00' && !notified.value) notified.value = true;
    if (h === '00' && m === '00' && s === '00') notified.value = false;
  };
  updateTime();
  setInterval(updateTime, 1000);

  const apiKey = 'b3a273f9c8b9b6b545daeddc92c6d50a';
  const lat = -6.901277336454229;
  const lon = 107.59783869058961;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`)
    .then(r => r.json())
    .then(data => {
      location.value = data.name || 'Bandung';
      weatherDescription.value = data.weather?.[0]?.description ?? '';
      const icon = data.weather?.[0]?.icon;
      if (icon) weatherIcon.value = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="36" height="36" />`;
      weatherLoaded.value = true;
    })
    .catch(() => {
      location.value = 'Bandung';
      weatherDescription.value = 'Gagal memuat';
      weatherLoaded.value = true;
    });
});
</script>

<style>
/* ===================== FONTS ===================== */
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

/* ===================== LIGHT MODE ===================== */
.light {
  /* Background */
  --bg-base:      #dbeafe;
  --bg-mesh-1:    #93c5fd;
  --bg-mesh-2:    #67e8f9;
  --bg-mesh-3:    #a5b4fc;

  /* Surfaces — putih dengan border BIRU tipis, bukan putih */
  --surface:         rgba(255, 255, 255, 0.72);
  --surface-border:  rgba(59, 130, 246, 0.18);   /* ← biru tipis, bukan putih */

  /* Pills — sama, biru tipis */
  --pill-bg:         rgba(255, 255, 255, 0.80);
  --pill-border:     rgba(59, 130, 246, 0.22);   /* ← biru tipis, bukan putih */

  /* Text */
  --text-primary:   #0f172a;
  --text-secondary: #334155;
  --text-muted:     #64748b;

  /* Accent */
  --accent:         #2563eb;
  --accent-soft:    rgba(37, 99, 235, 0.10);
  --accent-border:  rgba(37, 99, 235, 0.25);

  /* Card states */
  --card-active-bg:      rgba(255, 255, 255, 0.85);
  --card-active-border:  #2563eb;
  --card-active-shadow:  rgba(37, 99, 235, 0.18);
  --card-past-bg:        rgba(241, 245, 249, 0.80);
  --card-past-border:    rgba(148, 163, 184, 0.40);
  --card-locked-bg:      rgba(241, 245, 249, 0.60);
  --card-locked-border:  rgba(148, 163, 184, 0.35);
  --card-time-bg:        rgba(255, 251, 235, 0.80);
  --card-time-border:    rgba(245, 158, 11, 0.35);

  /* Overlay */
  --overlay-bg:    rgba(219, 234, 254, 0.90);
  --overlay-title: #0f172a;
  --overlay-date:  #334155;

  /* Shadow */
  --shadow:    0 8px 32px rgba(15, 23, 42, 0.14);
  --shadow-sm: 0 2px 12px rgba(15, 23, 42, 0.08);
}

/* ===================== DARK MODE ===================== */
.dark {
  /* Background */
  --bg-base:      #060b1a;
  --bg-mesh-1:    #1e3a5f;
  --bg-mesh-2:    #0c2340;
  --bg-mesh-3:    #1a1040;

  /* Surfaces */
  --surface:         rgba(15, 25, 50, 0.65);
  --surface-border:  rgba(96, 165, 250, 0.15);

  /* Pills */
  --pill-bg:         rgba(20, 35, 70, 0.75);
  --pill-border:     rgba(96, 165, 250, 0.20);

  /* Text */
  --text-primary:   #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted:     #64748b;

  /* Accent */
  --accent:         #60a5fa;
  --accent-soft:    rgba(96, 165, 250, 0.12);
  --accent-border:  rgba(96, 165, 250, 0.25);

  /* Card states */
  --card-active-bg:      rgba(15, 25, 50, 0.80);
  --card-active-border:  #60a5fa;
  --card-active-shadow:  rgba(96, 165, 250, 0.18);
  --card-past-bg:        rgba(15, 20, 40, 0.65);
  --card-past-border:    rgba(96, 165, 250, 0.10);
  --card-locked-bg:      rgba(10, 15, 35, 0.55);
  --card-locked-border:  rgba(96, 165, 250, 0.10);
  --card-time-bg:        rgba(25, 20, 5, 0.65);
  --card-time-border:    rgba(245, 158, 11, 0.25);

  /* Overlay */
  --overlay-bg:    rgba(6, 11, 26, 0.80);
  --overlay-title: #e2e8f0;
  --overlay-date:  #94a3b8;

  /* Shadow */
  --shadow:    0 8px 32px rgba(0, 0, 0, 0.50);
  --shadow-sm: 0 2px 12px rgba(0, 0, 0, 0.30);
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
  background-color: var(--bg-base);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  transition: background-color var(--transition), color var(--transition);
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
  opacity: 0.45;
  animation: blobFloat 12s ease-in-out infinite;
}

.blob-1 { width: 600px; height: 600px; background: var(--bg-mesh-1); top: -150px; left: -100px; animation-delay: 0s; }
.blob-2 { width: 500px; height: 500px; background: var(--bg-mesh-2); top: 30%; right: -120px; animation-delay: -4s; }
.blob-3 { width: 400px; height: 400px; background: var(--bg-mesh-3); bottom: -100px; left: 30%; animation-delay: -8s; }

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(30px, -40px) scale(1.05); }
  66%  { transform: translate(-20px, 30px) scale(0.95); }
}

.mesh-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.4;
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
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  border-radius: var(--radius-xl);
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow);
  transition: background var(--transition), border-color var(--transition);
}

/* ── Brand ── */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand-icon {
  width: 40px;
  height: 40px;
}

/* Light: biru muda, Dark: biru gelap */
.brand-rect {
  fill: var(--accent-soft);
  stroke: var(--accent-border);
  stroke-width: 1;
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

/* ── Nav Center ── */
.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* ── Pills ── */
.pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--pill-bg);
  border: 1px solid var(--pill-border);
  border-radius: 100px;
  padding: 7px 14px;
  backdrop-filter: blur(12px);
  transition: all var(--transition);
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

.weather-img :deep(img) {
  width: 32px;
  height: 32px;
  display: block;
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

/* Loading dots */
.loading { gap: 6px; padding: 12px 16px; }
.loading-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: dotPulse 1.2s ease-in-out infinite;
}
.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* ── Nav Actions ── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.action-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--pill-border);
  background: var(--pill-bg);
  backdrop-filter: blur(12px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;
  color: var(--text-primary);
}

.action-btn:hover {
  transform: scale(1.08);
  background: var(--accent-soft);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

/* Music wave */
.music-btn { flex-direction: column; gap: 2px; }
.music-wave {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 10px;
}
.music-wave span {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  animation: wave 0.8s ease-in-out infinite;
}
.music-wave span:nth-child(1) { height: 4px;  animation-delay: 0s; }
.music-wave span:nth-child(2) { height: 8px;  animation-delay: 0.1s; }
.music-wave span:nth-child(3) { height: 6px;  animation-delay: 0.2s; }
.music-wave span:nth-child(4) { height: 10px; animation-delay: 0.3s; }

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50%       { transform: scaleY(1); }
}

/* Icon flip transition */
.icon-flip-enter-active, .icon-flip-leave-active { transition: all 0.2s; }
.icon-flip-enter-from { transform: rotateY(90deg); opacity: 0; }
.icon-flip-leave-to   { transform: rotateY(-90deg); opacity: 0; }

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
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all var(--transition);
  flex: 1;
}

/* Page transition */
.page-enter-active, .page-leave-active { transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.page-enter-from { opacity: 0; transform: translateY(16px); }
.page-leave-to   { opacity: 0; transform: translateY(-10px); }

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
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-family: var(--font-body);
}

.footer-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
  flex-shrink: 0;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 768px) {
  .navbar-wrapper { padding: 12px 12px 0; }
  .navbar         { padding: 10px 14px; gap: 10px; border-radius: var(--radius-lg); flex-wrap: wrap; }
  .nav-center     { order: 3; width: 100%; justify-content: flex-start; gap: 8px; }
  .brand-subtitle { display: none; }
  .clock-digits   { font-size: 0.85rem; }
  .pill           { padding: 6px 10px; gap: 6px; }
  .weather-city   { font-size: 0.72rem; }
  .weather-desc   { display: none; }
  .main-content   { padding: 12px; }
  .content-card   { border-radius: var(--radius-lg); }
  .site-footer    { padding: 10px 12px 16px; }
  .footer-inner   { font-size: 0.72rem; padding: 8px 16px; }
}

@media (max-width: 480px) {
  .brand-icon  { width: 32px; height: 32px; }
  .brand-title { font-size: 0.9rem; }
  .action-btn  { width: 36px; height: 36px; font-size: 0.95rem; }
}
</style>