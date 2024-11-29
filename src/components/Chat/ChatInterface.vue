<!-- src/components/Chat/ChatInterface.vue -->
<template>
  <div>
    <div class="chat-interface q-pa-md" :style="{ backgroundColor: chatBackgroundColor, width: '100%', height: '86vh' }">
      <q-scroll-area
        ref="scrollArea"
        :style="{ height: scrollAreaHeight, flex: 1 }"
        class="q-mb-md"
      >
        <div ref="messageContainer" class="q-pa-md">
          <ChatBubble
            v-for="(message, index) in messages"
            :key="index"
            :message="message"
          />
        </div>
      </q-scroll-area>
      <TypingIndicator 
        v-if="isThinking || isTyping"
        :botName="botName"
        :isThinking="isThinking"
        :isTyping="isTyping"
        class="q-mb-sm"
      />
      <ChatInput @send-message="sendMessage" :is-processing="isThinking || isTyping" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '../../stores/chatStore'
import ChatBubble from './ChatBubble.vue'
import ChatInput from './ChatInput.vue'
import TypingIndicator from './TypingIndicator.vue'

const props = defineProps({
  initialMessage: {
    type: String,
    default: ''
  },
  fullHeight: {
    type: Boolean,
    default: false
  }
})

const chatStore = useChatStore()
const { messages, isThinking, isTyping, botName, chatBackgroundColor } = storeToRefs(chatStore)
const scrollArea = ref(null)
const messageContainer = ref(null)

const scrollAreaHeight = computed(() => props.fullHeight ? 'calc(100% - 120px)' : 'calc(95vh - 120px)')

const scrollToBottom = () => {
  if (scrollArea.value && messageContainer.value) {
    nextTick(() => {
      const scrollElement = scrollArea.value.$el.querySelector('.scroll')
      const containerHeight = messageContainer.value.clientHeight
      scrollElement.scrollTop = containerHeight + 1000
    })
  }
}

const sendMessage = async (text) => {
  await chatStore.sendMessage(text)
  scrollToBottom()
}

watch(() => messages.value.length, scrollToBottom)

watch([isThinking, isTyping], ([newIsThinking, newIsTyping]) => {
  if (newIsThinking || newIsTyping) {
    scrollToBottom()
  }
})

onMounted(async () => {
  await chatStore.initializeChat()
  if (props.initialMessage) {
    await chatStore.sendMessage(props.initialMessage)
  }
  scrollToBottom()
})
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.q-scroll-area {
  background-color: white;
  border-radius: 8px;
}
</style>