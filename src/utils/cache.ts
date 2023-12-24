enum CacheType {
  Local,
  Session
}

class StorageCache {
  storege: Storage

  constructor(type: CacheType) {
    this.storege = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storege.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storege.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storege.removeItem(key)
  }

  clearCache() {
    this.storege.clear()
  }
}

const localStorageCache = new StorageCache(CacheType.Local)
const sessionStorageCache = new StorageCache(CacheType.Session)

export { localStorageCache, sessionStorageCache }
