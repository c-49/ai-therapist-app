<!-- src/components/TypingIndicator.vue -->
<template>
  <div class="typing-indicator q-pa-sm">
    <transition name="fade">
      <div v-if="isThinking || isTyping" class="typing-content">
        <span class="q-ml-sm">{{ botName }} is {{ isThinking ? 'thinking' : 'typing' }}</span>
        <q-spinner v-if="isThinking" color="primary" size="1em" />
        <q-spinner-dots v-else-if="isTyping" color="grey" size="1em" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  isThinking: Boolean,
  isTyping: Boolean,
  botName: String
})
</script>

<style scoped>
.typing-indicator {
  height: 40px;
  display: flex;
  align-items: center;
}

.typing-content {
  font-style: italic;
  color: #555;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>