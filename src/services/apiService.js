// src/services/apiService.js
import axios from 'axios'
import { createSystemMessage, createMentalHealthArticlePrompt, createMentalHealthTipPrompt, createInspirationalQuotePrompt } from './prompt'

const API_URL = 'https://api.pawan.krd/cosmosrp/v1/chat/completions'

export const sendMessageToAI = async (message, relevantMemories = [], botName, userName) => {
  const memoryContext = relevantMemories.map(m => `${m.info} (Importance: ${m.importance})`).join('\n')

  const systemMessage = createSystemMessage(botName, userName)

  const fullPrompt = `
    ${systemMessage}
    
    Relevant user information:
    ${memoryContext}
    
    ${userName}: ${message}
  `

  try {
    const response = await axios.post(API_URL, {
      model: 'cosmosrp',
      messages: [
        { role: 'system', content: fullPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7
    })
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error calling AI API:', error)
    throw error
  }
}

export const generateMentalHealthArticle = async (botName = 'AI Health Expert', userName = 'User') => {
  const prompt = createMentalHealthArticlePrompt()
  return sendMessageToAI(prompt, [], botName, userName)
}

export const generateMentalHealthTip = async (botName = 'AI Health Expert', userName = 'User') => {
  const prompt = createMentalHealthTipPrompt()
  return sendMessageToAI(prompt, [], botName, userName)
}

  
  const summarizeConversation = (conversation, maxLength = 5) => {
    const messages = conversation.split('\n')
    if (messages.length <= maxLength) return conversation
  
    const summary = messages.slice(0, 2).join('\n') + '\n...\n' + messages.slice(-maxLength).join('\n')
    return summary
  }
  
  export const analyzeConversation = async (conversation, userName) => {
    const summarizedConversation = summarizeConversation(conversation)
    
    const analysisPrompt = `
      Based on the following conversation summary, what is the single most important piece of information to remember about ${userName}? 
      If there's a change in ${userName}'s stated preferences or opinions, please note that.
      Respond in this format:
      INFO: [The important information]
      IMPORTANCE: [1-5]
      REASON: [Why this is important]
      
      Remember to refer to the person as ${userName}, not as "the user".
      
      Conversation Summary:
      ${summarizedConversation}
    `
  
    try {
      const response = await axios.post(API_URL, {
        model: 'cosmosrp',
        messages: [{ role: 'user', content: analysisPrompt }],
        temperature: 0.8
      })
      console.log('Received analysis response from AI API:', response.data)
  
      const content = response.data.choices[0].message.content
      console.log('Raw API response:', content)
  
      // Improved parsing logic
      let info = '', importance = 0, reason = ''
  
      // Remove asterisks and split the content into lines
      const lines = content.replace(/\*/g, '').split('\n').map(line => line.trim())
  
      lines.forEach(line => {
        if (line.toLowerCase().startsWith('importance:')) {
          const match = line.match(/\d+/)
          if (match) {
            importance = parseInt(match[0])
          }
        } else if (line.toLowerCase().startsWith('reason:')) {
          reason = line.substring(7).trim()
        } else if (!info && line) {
          // If we haven't set info yet and the line is not empty, use it as info
          info = line
        }
      })
  
      // If reason spans multiple lines, join them
      if (!reason && lines.length > 2) {
        reason = lines.slice(2).join(' ').trim()
      }
  
      if (info && importance && reason) {
        return { info, importance, reason }
      } else {
        console.warn('Incomplete parsing result:', { info, importance, reason })
        throw new Error('Incomplete response format from API')
      }
  
    } catch (error) {
      console.error('Detailed error in analyzeConversation:', error)
      if (error.response) {
        console.error('API response error:', error.response.data)
      }
      throw error
    }
  }

  export const generateThinkingMessage = async (message, relevantMemories = [], botName, userName) => {
    const memoryContext = relevantMemories.map(m => `${m.info} (Importance: ${m.importance})`).join('\n')
  
    const thinkingPrompt = `
      ${createSystemMessage(botName, userName)}
      
      Relevant user information:
      ${memoryContext}
      
      ${userName}: ${message}
      
      Generate a brief "thinking" message that ${botName} might say while considering ${userName}'s input. This should be a short, thoughtful phrase that shows ${botName} is processing the information and preparing a response. Do not actually respond to ${userName}'s message yet.
    `
  
    try {
      const response = await axios.post(API_URL, {
        model: 'cosmosrp',
        messages: [{ role: 'user', content: thinkingPrompt }],
        temperature: 0.5
      })
      return response.data.choices[0].message.content
    } catch (error) {
      console.error('Error generating thinking message:', error)
      return "Hmm, let me think about that for a moment..."
    }
  }
  