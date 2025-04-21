<template>
  <div :class="['code-container', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
    <div class="controls">
      <button @click="toggleCode" class="btn">
        <i :class="isCodeVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        {{ isCodeVisible ? 'Hide Code' : 'Show Code' }}
      </button>
      <button ref="copyButton" @click="copyCode" class="btn copy-btn">
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

    <!-- DartPad iframe with key binding to force re-render -->
    <div v-if="isRunning" class="dartpad-container mt-4">
      <iframe 
        :key="iframeKey"
        :src="dartpadUrl" 
        frameborder="0" 
        width="100%" 
        height="500"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
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
      processedCode: "",
      iframeKey: 0, // Add this to force iframe re-render
    };
  },
  setup() {
    const isDarkMode = inject('isDarkMode');
    return { isDarkMode };
  },
  computed: {
    dartpadUrl() {
      this.processCodeForDartPad();
      const encodedCode = encodeURIComponent(this.processedCode);
      return `https://dartpad.dev/embed-dart.html?theme=${this.isDarkMode ? 'dark' : 'light'}&run=true&split=60%&code=${encodedCode}`;
    }
  },
  watch: {
    // Watch for code changes and reset iframe
    code() {
      this.resetDartPad();
    }
  },
  mounted() {
    this.highlightCode();
    this.initClipboard();
  },
  methods: {
    resetDartPad() {
      if (this.isRunning) {
        this.iframeKey++; // This forces the iframe to re-render
      }
    },
    processCodeForDartPad() {
      let code = this.code;
      
      // Remove any HTML tags from syntax highlighting
      code = code.replace(/<[^>]*>?/gm, '');
      
      // Decode HTML entities
      const textarea = document.createElement('textarea');
      textarea.innerHTML = code;
      code = textarea.value;
      
      // Ensure proper Dart main() function
      if (this.language === 'dart' && !code.includes('void main()')) {
        code = `void main() {\n${code}\n}`;
      }
      
      this.processedCode = code.trim();
    },
    highlightCode() {
      this.$nextTick(() => {
        if (this.$refs.codeBlock) {
          Prism.highlightElement(this.$refs.codeBlock);
        }
      });
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
      this.isCodeVisible = false;
      this.resetDartPad(); // Force refresh with new code
      
      this.$nextTick(() => {
        const element = this.$el.querySelector('.controls');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
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
  flex-wrap: wrap; /* ⬅️ Agar tombol tidak bertumpuk */
  align-items: center;
  gap: 8px; /* ⬅️ Tambahkan jarak antar tombol */
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Supaya tombol "Run Code" tetap di kanan */
.controls .btn:last-child {
  margin-left: auto;
}

/* Responsif untuk layar kecil */
@media (max-width: 600px) {
  .controls {
    justify-content: center; /* ⬅️ Pusatkan tombol selain "Run Code" */
  }
  .controls .btn:last-child {
    margin-left: 0; /* ⬅️ Di mobile, Run Code tidak mepet ke kanan */
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
pre[class*="language-"] {
  @apply m-0 rounded-none;
}

.dartpad-container {
  @apply rounded-lg overflow-hidden border;
  border-color: #4a5568;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>