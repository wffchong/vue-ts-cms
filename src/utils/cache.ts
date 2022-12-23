enum CacheType {
	Local,
	Session
}

class Cache {
	storage: Storage

	constructor(type: CacheType) {
		this.storage = type === CacheType.Local ? localStorage : sessionStorage
	}

	getCache(key: string) {
		const value = this.storage.getItem(key)
		if (value) {
			return JSON.parse(value)
		}
	}

	setCache(key: string, val: unknown) {
		this.storage.setItem(key, JSON.stringify(val))
	}

	removeCache(key: string) {
		this.storage.removeItem(key)
	}

	clearCache() {
		this.storage.clear()
	}
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
