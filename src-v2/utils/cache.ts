/**
 * Studio Icons v2.0 - Cache Utility
 */

import { CACHE_KEY_PREFIX, CACHE_TTL } from '../constants';
import type { CacheEntry, LottieAnimationData } from '../types';
import { logger } from './logger';

class IconCache {
  private memoryCache = new Map<string, CacheEntry<LottieAnimationData>>();
  private useLocalStorage: boolean;

  constructor() {
    this.useLocalStorage = this.checkLocalStorageAvailable();
  }

  private checkLocalStorageAvailable(): boolean {
    try {
      const testKey = '__studio_icons_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  private getCacheKey(iconName: string): string {
    return `${CACHE_KEY_PREFIX}${iconName}`;
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  async get(iconName: string): Promise<LottieAnimationData | null> {
    const key = this.getCacheKey(iconName);

    // Check memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && !this.isExpired(memoryEntry)) {
      logger.debug(`Cache hit (memory): ${iconName}`);
      return memoryEntry.data;
    }

    // Check localStorage
    if (this.useLocalStorage) {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const entry: CacheEntry<LottieAnimationData> = JSON.parse(stored);
          if (!this.isExpired(entry)) {
            // Restore to memory cache
            this.memoryCache.set(key, entry);
            logger.debug(`Cache hit (localStorage): ${iconName}`);
            return entry.data;
          } else {
            // Clean up expired entry
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        logger.warn(`Failed to read from localStorage: ${iconName}`, error);
      }
    }

    logger.debug(`Cache miss: ${iconName}`);
    return null;
  }

  async set(iconName: string, data: LottieAnimationData, ttl = CACHE_TTL): Promise<void> {
    const key = this.getCacheKey(iconName);
    const entry: CacheEntry<LottieAnimationData> = {
      data,
      timestamp: Date.now(),
      ttl
    };

    // Always store in memory cache
    this.memoryCache.set(key, entry);

    // Try to store in localStorage
    if (this.useLocalStorage) {
      try {
        localStorage.setItem(key, JSON.stringify(entry));
        logger.debug(`Cached icon: ${iconName}`);
      } catch (error) {
        // localStorage might be full
        logger.warn(`Failed to write to localStorage: ${iconName}`, error);
        this.cleanupOldEntries();
      }
    }
  }

  delete(iconName: string): void {
    const key = this.getCacheKey(iconName);
    this.memoryCache.delete(key);

    if (this.useLocalStorage) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    this.memoryCache.clear();

    if (this.useLocalStorage) {
      // Only clear studio-icons entries
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(CACHE_KEY_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    logger.info('Cache cleared');
  }

  private cleanupOldEntries(): void {
    if (!this.useLocalStorage) return;

    const entries: Array<{ key: string; timestamp: number }> = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        try {
          const entry: CacheEntry<unknown> = JSON.parse(localStorage.getItem(key) || '{}');
          entries.push({ key, timestamp: entry.timestamp || 0 });
        } catch {
          // Remove invalid entries
          if (key) localStorage.removeItem(key);
        }
      }
    }

    // Sort by timestamp (oldest first) and remove oldest 25%
    entries.sort((a, b) => a.timestamp - b.timestamp);
    const removeCount = Math.ceil(entries.length * 0.25);

    for (let i = 0; i < removeCount; i++) {
      localStorage.removeItem(entries[i].key);
    }

    logger.debug(`Cleaned up ${removeCount} old cache entries`);
  }

  getStats(): { memorySize: number; localStorageSize: number } {
    let localStorageSize = 0;

    if (this.useLocalStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(CACHE_KEY_PREFIX)) {
          localStorageSize++;
        }
      }
    }

    return {
      memorySize: this.memoryCache.size,
      localStorageSize
    };
  }
}

export const iconCache = new IconCache();
