export const storage = {
  set: (key: string, value: any): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },

  get: (key: string, defaultValue?: any): any => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key)
      if (item) {
        try {
          return JSON.parse(item)
        } catch {
          return defaultValue || null
        }
      }
    }
    return defaultValue || null
  },

  remove: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
    }
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      localStorage.clear()
    }
  },

  session: {
    set: (key: string, value: any): void => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, JSON.stringify(value))
      }
    },

    get: (key: string, defaultValue?: any): any => {
      if (typeof window !== "undefined") {
        const item = sessionStorage.getItem(key)
        if (item) {
          try {
            return JSON.parse(item)
          } catch {
            return defaultValue || null
          }
        }
      }
      return defaultValue || null
    },

    remove: (key: string): void => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(key)
      }
    },

    clear: (): void => {
      if (typeof window !== "undefined") {
        sessionStorage.clear()
      }
    },
  },
}
