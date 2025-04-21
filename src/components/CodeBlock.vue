<template>
  <div class="code-container">
    <div class="controls">
      <button @click="toggleCode" class="btn">
        <i :class="isCodeVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        {{ isCodeVisible ? 'Hide Code' : 'Show Code' }}
      </button>
      <button ref="copyButton" @click="copyCode" class="btn copy-btn">
        <i class="fas fa-copy"></i> Copy
      </button>
      <button @click="runCode" class="btn run-btn">
        <i class="fas fa-play"></i> Run Code
      </button>
    </div>

    <transition name="fade">
      <pre v-show="isCodeVisible" :class="`language-${language} line-numbers`">
        <code ref="codeBlock">{{ code }}</code>
      </pre>
    </transition>

    <div v-if="isRunning" class="dartpad-container">
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
    language: { type: String, default: "dart" },
  },
  data() {
    return {
      isCodeVisible: true,
      isRunning: false,
      processedCode: "",
      iframeKey: 0,
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
      this.iframeKey++;
    },
    processCodeForDartPad() {
      let code = this.code;
      
      // Remove syntax highlighting artifacts
      code = code.replace(/<[^>]*>?/gm, '');
      
      // Decode HTML entities
      const textarea = document.createElement('textarea');
      textarea.innerHTML = code;
      code = textarea.value;
      
      // Ensure proper Dart main() function
      if (this.language === 'dart') {
        if (!code.includes('void main()') && !code.includes('main()')) {
          code = `void main() {\n${code}\n}`;
        }
        
        // Add basic print if empty
        if (code.trim() === 'void main() {}') {
          code = 'void main() {\n  print("Hello, DartPad!");\n}';
        }
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
      this.resetDartPad();
      
      this.$nextTick(() => {
        const element = this.$el.querySelector('.code-container');
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
  margin: 1rem 0;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.controls .run-btn {
  margin-left: auto;
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
  color: white;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.copy-btn {
  background: #2e7d32;
}

.run-btn {
  background: #651fff;
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  background: #1e1e1e;
  color: #dcdcdc;
  font-family: "Fira Code", monospace;
  max-height: 500px;
}

pre[class*="language-"] {
  margin: 0;
  border-radius: 0;
}

.dartpad-container {
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .controls {
    justify-content: center;
  }
  .controls .run-btn {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
  
  pre {
    padding: 12px;
    font-size: 0.9em;
  }
  
  .dartpad-container {
    height: 400px;
  }
}
</style>