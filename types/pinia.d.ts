import 'pinia'
import type { PersistConfig } from '@/store/plugins'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // extend pinia store with the persist config plugin to stop the typehint issues
    persistConfig?: PersistConfig
  }
}
