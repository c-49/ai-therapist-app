import Dexie from 'dexie';

export const db = new Dexie('AiTherapistDB');
db.version(4).stores({
  chatData: '++id, botName, userName, userBubbleColor, aiBubbleColor, chatBackgroundColor, mainColor, userAvatar, aiAvatar',
  messages: '++id, sender, text, senderName, timestamp, memoryId',
  memories: '++id, info, importance, reason, timestamp',
  errorLogs: '++id, timestamp, error, stack'
});