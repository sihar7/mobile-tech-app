<template>
  <div :class="['code-container', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
    <div class="controls">
      <button @click="toggleCode" class="btn">
        <i :class="isCodeVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        {{ isCodeVisible ? 'Hide Code' : 'Show Code' }}
      </button>
      <button ref="copyButton" @click="copyCode" class="btn">
        <i class="fas fa-copy"></i> Copy
      </button>
      <button @click="runCode" class="btn">
        <i class="fas fa-play"></i> Run Code
      </button>
    </div>

    <transition name="fade">
      <pre v-show="isCodeVisible" :class="`language-${language} line-numbers`">
        <code ref="codeBlock">{{ code }}</code>
      </pre>
    </transition>

    <div v-if="isRunning" class="dartpad-container">
      <iframe :src="dartpadUrl" frameborder="0" width="100%" height="500"></iframe>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-dart";
import ClipboardJS from "clipboard";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  props: {
    code: { type: String, required: true },
    language: { type: String, default: "javascript" },
  },
  data() {
    return {
      isCodeVisible: true,
      isRunning: false,
    };
  },
  computed: {
    dartpadUrl() {
      return `https://dartpad.dev/embed-flutter.html?theme=dark&run=true&split=50&ga_id=your-ga-id&code=${encodeURIComponent(this.code)}`;
    },
  },
  setup() {
    const isDarkMode = inject('isDarkMode');
    return { isDarkMode };
  },
  mounted() {
    this.highlightCode();
    this.initClipboard();
  },
  methods: {
    highlightCode() {
      if (this.$refs.codeBlock) {
        Prism.highlightElement(this.$refs.codeBlock);
      }
    },
    initClipboard() {
      new ClipboardJS(".copy-btn", {
        text: () => this.code,
      });
    },
    copyCode() {
      navigator.clipboard.writeText(this.code)
        .then(() => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Kode berhasil disalin!",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(() => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Gagal menyalin kode!",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    toggleCode() {
      this.isCodeVisible = !this.isCodeVisible;
    },
    runCode() {
      this.isRunning = true;
    },
  },
};
</script>


<style scoped>
.code-container {
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.controls {
  display: flex;
  flex-wrap: wrap; /* ⬅️ Biar tombol tidak acak-acakan */
  justify-content: flex-start;
  align-items: center;
  gap: 8px; /* ⬅️ Tambahkan jarak antar tombol */
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Responsif untuk layar kecil */
@media (max-width: 600px) {
  .controls {
    justify-content: center; /* ⬅️ Pusatkan tombol di layar kecil */
  }
}


.toggle-btn,
.copy-btn {
  color: #007acc;
  cursor: pointer;
  font-size: 14px;
  font-family: "Fira Code", monospace;
  background: none;
  border: none;
  padding: 0;
}

.toggle-btn:hover,
.copy-btn:hover {
  color: #005a9e;
}

pre {
  margin: 0;
  padding: 0;
  overflow-x: auto;
  background: transparent;
  color: #dcdcdc;
  font-family: "Fira Code", monospace;
}

.line-numbers .line-numbers-rows {
  border-right: 1px solid #444;
}

.btn {
  background: oklch(0.704 0.04 256.788);
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.3s ease;
  border: none;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>