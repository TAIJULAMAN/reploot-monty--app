/**
 * REPLOOTAI Coach Architecture & Chat Boundaries
 */

export type MessageRole = "user" | "assistant" | "system";

export interface ChatSuggestion {
  id: string;
  label: string;
  actionPrompt: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  suggestedActions?: ChatSuggestion[];
  relatedWorkoutId?: string;
  relatedMealId?: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  lastMessageAt: string;
  messages: ChatMessage[];
}

export type ChatStreamingState =
  | "idle"
  | "connecting"
  | "streaming"
  | "completed"
  | "error";

/**
 * Replaceable AI Coach Chat Provider Interface
 */
export interface AIChatService {
  sendMessage(
    conversationId: string,
    prompt: string,
    onChunk?: (partialText: string) => void,
  ): Promise<ChatMessage>;
  getSuggestions(): Promise<ChatSuggestion[]>;
  getConversationHistory(conversationId: string): Promise<ChatConversation>;
}
