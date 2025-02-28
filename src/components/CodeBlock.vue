<template>
  <div :class="['code-container', isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
    <div class="controls">
      <span @click="toggleCode" class="toggle-btn">
        {{ isCodeVisible ? 'Hide' : 'Show' }}
      </span>
      <span @click="copyCode" class="copy-btn">Copy</span>
    </div>
    <pre v-show="isCodeVisible" :class="`language-${language} line-numbers`">
      <code ref="codeBlock">{{ code }}</code>
    </pre>
  </div>
</template>

<script>
import { inject } from 'vue';
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-dart";
import ClipboardJS from "clipboard";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";

export default {
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "javascript",
    },
  },
  data() {
    return {
      isCodeVisible: true,
    };
  },
   setup() {
    const isDarkMode = inject('isDarkMode');
    return { isDarkMode };
  },
  mounted() {
    this.highlightCode();
    this.preventLineNumberCopy();
    this.initClipboard();
  },
  methods: {
    async highlightCode() {
      if (this.$refs.codeBlock && this.code) {
        const grammar = Prism.languages[this.language];
        if (!grammar) {
          console.warn(`PrismJS does not support language: ${this.language}`);
          return;
        }
        const formattedCode = await this.formatCode(this.code); // Tunggu hasil format
        this.$refs.codeBlock.textContent = formattedCode;
        Prism.highlightElement(this.$refs.codeBlock);
      }
    },
    toggleCode() {
      this.isCodeVisible = !this.isCodeVisible;
    },
    preventLineNumberCopy() {
      const codeBlock = this.$refs.codeBlock;
      if (codeBlock) {
        codeBlock.addEventListener("copy", (event) => {
          const selection = window.getSelection().toString();
          const cleanedText = selection.replace(/\s*\d+\s+/gm, "");
          event.clipboardData.setData("text/plain", cleanedText);
          event.preventDefault();
        });
      }
    },
    initClipboard() {
      new ClipboardJS(".copy-btn", {
        text: () => this.code,
      });
    },
    copyCode() {
      navigator.clipboard.writeText(this.code).then(() => {
    
      });
    },
    async formatCode(code) {
      try {
        return await prettier.format(code, {
          parser: ["javascript", "dart"].includes(this.language) ? "babel" : "html",
          plugins: [parserBabel, parserHtml],
          semi: true,
          singleQuote: true,
          trailingComma: "es5",
        });
      } catch (error) {
        console.error("Error formatting code:", error);
        return code;
      }
    },
  },
  watch: {
    async code() {
      await this.highlightCode();
    },
    async language() {
      await this.highlightCode();
    },
  },

};
</script>

<style scoped>
.code-container {
  position: relative;
  margin-bottom: 10px;
  background: #1e1e1e;
  border-radius: 5px;
  padding: 15px;
}

.controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
  z-index: 10; /* Menjamin tombol berada di atas */
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
</style>