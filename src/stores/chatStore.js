// src/stores/chatStore.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { sendMessageToAI, generateThinkingMessage, analyzeConversation } from '../services/apiService'
import { useMemoryStore } from './memoryStore'
import { db } from '../database/db'
import { setCustomColor } from '../utils/colorUtils'

export const useChatStore = defineStore('chat', () => {
  const memoryStore = useMemoryStore()
  
  const messages = ref([])
  const botName = ref('Eliza')
  const userName = ref('User')
  const isThinking = ref(false)
  const isTyping = ref(false)
  const isAnalyzingMemory = ref(false)
  const errorLog = ref([])
  let analysisTimeout = null
  const currentTab = ref('home')

  const unreadMessages = ref(0)
  const isProcessingBackground = ref(false)

  const userBubbleColor = ref('blue')
  const aiBubbleColor = ref('green')
  const chatBackgroundColor = ref('grey-1')
  const mainColor = ref('primary')
  const userAvatar = ref('https://cdn.quasar.dev/img/avatar4.jpg')
  const aiAvatar = ref('https://cdn.quasar.dev/img/avatar3.jpg')

  const loadInitialData = async () => {
    const chatData = await db.chatData.toArray();
    if (chatData.length > 0) {
      botName.value = chatData[0].botName;
      userName.value = chatData[0].userName;
      userBubbleColor.value = chatData[0].userBubbleColor;
      aiBubbleColor.value = chatData[0].aiBubbleColor;
      chatBackgroundColor.value = chatData[0].chatBackgroundColor;
      mainColor.value = chatData[0].mainColor;
      userAvatar.value = chatData[0].userAvatar || 'https://cdn.quasar.dev/img/avatar4.jpg';
      aiAvatar.value = chatData[0].aiAvatar || 'https://cdn.quasar.dev/img/avatar3.jpg';
    }
    messages.value = await db.messages.toArray();
    errorLog.value = await db.errorLogs.toArray();
  }

  const updateCustomization = async (customization) => {
    if (customization.userBubbleColor) {
      setCustomColor('userBubble', customization.userBubbleColor)
      userBubbleColor.value = 'userBubble'
    }
    if (customization.aiBubbleColor) {
      setCustomColor('aiBubble', customization.aiBubbleColor)
      aiBubbleColor.value = 'aiBubble'
    }
    if (customization.mainColor) {
      setCustomColor('mainCustom', customization.mainColor)
      mainColor.value = 'mainCustom'
    }
    if (customization.chatBackgroundColor) {
      setCustomColor('chatBackground', customization.chatBackgroundColor)
      chatBackgroundColor.value = 'chatBackground'
    }
    
    Object.assign(userAvatar, aiAvatar, customization)
    
    await db.chatData.put({
      botName: botName.value,
      userName: userName.value,
      userBubbleColor: userBubbleColor.value,
      aiBubbleColor: aiBubbleColor.value,
      chatBackgroundColor: chatBackgroundColor.value,
      mainColor: mainColor.value,
      userAvatar: userAvatar.value,
      aiAvatar: aiAvatar.value
    })
  }

  const setBotName = async (name) => {
    botName.value = name;
    await db.chatData.put({ botName: name, userName: userName.value });
  }

  const setUserName = async (name) => {
    userName.value = name;
    await db.chatData.put({ botName: botName.value, userName: name });
  }

  const addMessage = async (sender, text, memoryId = null) => {
    const message = { 
      sender, 
      text, 
      senderName: sender === 'user' ? userName.value : botName.value,
      timestamp: new Date().toISOString(),
      memoryId
    };
    const id = await db.messages.add(message);
    message.id = id;
    messages.value.push(message);
  }

  
  const sendBackgroundMessage = async (text) => {
    isProcessingBackground.value = true
    try {
      const aiResponse = await sendMessageToAI(text, [], botName.value, userName.value)
      await addMessage('ai', aiResponse)
      unreadMessages.value++
    } catch (error) {
      console.error('Error in sendBackgroundMessage:', error)
      // Handle error (maybe add an error message to the chat)
    } finally {
      isProcessingBackground.value = false
    }
  }

  const clearUnreadMessages = () => {
    unreadMessages.value = 0
  }

  const sendMessage = async (text) => {
    if (isThinking.value || isTyping.value) return

    isThinking.value = true
    await addMessage('user', text)

    try {
      // Simulate thinking/processing time
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Analyze the conversation before responding
      const allMessages = messages.value
      const conversationText = allMessages.map(m => `${m.sender}: ${m.text}`).join('\n')
      const analysis = await analyzeConversation(conversationText, userName.value)

      let newMemoryId = null
      // Process the analysis result
      if (analysis && analysis.info && typeof analysis.importance === 'number' && analysis.reason) {
        const newMemory = {
          info: String(analysis.info),
          importance: Number(analysis.importance),
          reason: String(analysis.reason),
          timestamp: new Date().toISOString()
        }
        const addedMemory = await memoryStore.addOrUpdateMemory(newMemory)
        if (addedMemory && addedMemory.id) {
          newMemoryId = addedMemory.id
        }
      }

      // Get relevant memories after the analysis
      const relevantMemories = memoryStore.getRelevantMemories(text)

      // Switch from thinking to typing
      isThinking.value = false
      isTyping.value = true

      // Now get the AI response
      const aiResponse = await sendMessageToAI(text, relevantMemories, botName.value, userName.value)
      await addMessage('ai', aiResponse, newMemoryId)
      if (currentTab.value !== 'chat') {
        unreadMessages.value++
      }

    } catch (error) {
      await addMessage('ai', 'I apologize, but I encountered an error. Could we try that again?')
      console.error('Error in sendMessage:', error)
      await db.errorLogs.add({
        timestamp: new Date().toISOString(),
        error: error.toString(),
        stack: error.stack || 'No stack trace available'
      })
    } finally {
      isThinking.value = false
      isTyping.value = false
    }
  }

    const initializeChat = async () => {
      await loadInitialData();
      if (messages.value.length === 0) {
        await addMessage('ai', `Hello, I'm ${botName.value}, your AI therapist. How are you feeling today? Remember, this is a safe space to share your thoughts and feelings.`)
      }
    }

    const setCurrentTab = (tab) => {
      currentTab.value = tab
      if (tab === 'chat') {
        clearUnreadMessages()
      }
    }

    return {
      messages,
      isThinking,
      isTyping,
      isAnalyzingMemory,
      botName,
      userName,
      sendMessage,
      addMessage,
      initializeChat,
      setBotName,
      setUserName,
      getAllMemories: memoryStore.getAllMemories,
      errorLog,
      userBubbleColor,
      aiBubbleColor,
      chatBackgroundColor,
      mainColor,
      userAvatar,
      aiAvatar,
      updateCustomization,
      unreadMessages,
      isProcessingBackground,
      sendBackgroundMessage,
      clearUnreadMessages,
      setCurrentTab,
      currentTab
    }
  })