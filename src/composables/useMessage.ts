/**
 * Composable for managing message state.
 * This includes reactive state management for a message object,
 * and provides functionality to reset the message to default values.
 */

import { reactive } from 'vue'

/**
 * Interface representing the structure of a message object.
 * @param type - Defines the type of the message (e.g., 'success', 'error').
 * @param text - The text content of the message.
 */
interface Message {
  type: 'success' | 'error'
  text: string
}

// default message config
const defaultMessage: Message = {
  type: 'success',
  text: ''
}

export default function useMessage() {
  // reactive state for the message
  const message = reactive<Message>({ ...defaultMessage })

  // function to update the message
  function setMessage(type: Message['type'], text: Message['text']) {
    message.type = type
    message.text = text
  }

  // function to reset the message to default values
  function resetMessage() {
    setMessage(defaultMessage.type, defaultMessage.text)
  }

  return { message, setMessage, resetMessage }
}
