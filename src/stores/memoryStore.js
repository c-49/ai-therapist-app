// src/stores/memoryStore.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../database/db'

export const useMemoryStore = defineStore('memory', () => {
  const memories = ref([])

  const addOrUpdateMemory = async (newMemory) => {
    console.log('Attempting to add/update memory:', newMemory);
    
    const serializedMemory = {
      info: String(newMemory.info),
      importance: Number(newMemory.importance),
      reason: String(newMemory.reason),
      timestamp: newMemory.timestamp || new Date().toISOString(),
    };
    
    console.log('Serialized memory:', serializedMemory);

    try {
      const existingMemory = await db.memories.where('info').equals(serializedMemory.info).first();
      let resultMemory;
      if (existingMemory) {
        await db.memories.update(existingMemory.id, serializedMemory);
        resultMemory = { ...existingMemory, ...serializedMemory };
        const index = memories.value.findIndex(m => m.id === existingMemory.id);
        if (index !== -1) {
          memories.value[index] = resultMemory;
        }
      } else {
        const id = await db.memories.add(serializedMemory);
        resultMemory = { id, ...serializedMemory };
        memories.value.push(resultMemory);
      }
      console.log('Memory after add/update:', resultMemory);
      return resultMemory;
    } catch (error) {
      console.error('Error in addOrUpdateMemory:', error);
      throw error;
    }
  }

  const sortAndLimitMemories = () => {
    memories.value.sort((a, b) => b.importance - a.importance);
    memories.value = memories.value.slice(0, 20);
  }

  const loadMemories = async () => {
    memories.value = await db.memories.toArray();
    sortAndLimitMemories();
  }

  const getRelevantMemories = (context) => {
    // This is a placeholder for more advanced retrieval logic
    // For now, it just returns all memories
    return memories.value;
  }

  const getAllMemories = computed(() => memories.value)

  loadMemories(); // Load memories when the store is instantiated

  return {
    memories,
    addOrUpdateMemory,
    getRelevantMemories,
    getAllMemories,
    loadMemories
  }
})