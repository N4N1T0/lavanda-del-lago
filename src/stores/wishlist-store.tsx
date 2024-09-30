// Types Imports
import type { Product } from '@/types'

// Package Imports
import { createStore } from 'swr-global-state'
import type { StateKey, StatePersistor } from 'swr-global-state'

/**
 * Creates a persistor function that saves and retrieves data from local storage.
 *
 * @template T The type of data to be persisted.
 * @returns The persistor.
 */
const withLocalStoragePersistor = <T = Product[],>(): StatePersistor<T> => ({
  /**
   * Saves the data to local storage.
   *
   * @param {StateKey} key - The key to identify the data.
   * @param {T} data - The data to be saved.
   */
  onSet(key: StateKey, data: T) {
    // Stringify the data to be saved
    const stringifyData = JSON.stringify(data)
    // Save the data to local storage
    window.localStorage.setItem(String(key), stringifyData)
  },
  /**
   * Retrieves the data from local storage.
   *
   * @param {StateKey} key - The key to identify the data.
   * @returns {T | string} The retrieved data or 'null' if the data is not found.
   */
  onGet(key: StateKey) {
    // Get the data from local storage
    const cachedData = window.localStorage.getItem(String(key)) ?? 'null'
    try {
      // Parse the data if it is a JSON string
      return JSON.parse(cachedData)
    } catch {
      // Return the data as is if it is not a JSON string
      return cachedData
    }
  }
})

const useWishlist = createStore({
  key: '@app/lavandadellago/wishlist',
  initial: [],
  persistor: withLocalStoragePersistor()
})

export default useWishlist
