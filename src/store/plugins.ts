import type { PiniaPlugin, PiniaPluginContext } from 'pinia'

export interface PersistConfig {
  [actionName: string]: string[]
}

// plugin for saving specific parts of the state of a store to localStorage
export function createLocalStoragePlugin(): PiniaPlugin {
  return (context: PiniaPluginContext) => {
    const { store, options } = context

    // save specific parts of the state to localStorage
    const saveSelectedState = (selectedStateKeys: string[]) => {
      const stateToPersist = selectedStateKeys.reduce((acc: Record<string, any>, key: string) => {
        acc[key] = store.$state[key]
        return acc
      }, {} as Partial<typeof store.$state>)
      localStorage.setItem(store.$id, JSON.stringify(stateToPersist))
    }

    // load state from localStorage
    const loadState = () => {
      const storedState = localStorage.getItem(store.$id)
      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState)
          Object.assign(store.$state, parsedState)
        } catch (error) {
          console.error('Failed to parse stored state:', error)
        }
      }
    }

    // subscribe to actions to save state
    if ((options as any).persistConfig) {
      // load state when the store is initialized
      loadState()

      store.$onAction(({ name, after }) => {
        const selectedStateKeys = (options as any).persistConfig[name]
        if (selectedStateKeys) {
          after(() => saveSelectedState(selectedStateKeys))
        }
      })
    }
  }
}
