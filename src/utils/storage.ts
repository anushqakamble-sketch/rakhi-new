import { RakhiData } from '../types';

const STORAGE_KEY = 'send_a_rakhi_creations_v1';

export function generateRakhiId(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `rakhi-${result}`;
}

export function saveRakhiLocally(rakhi: RakhiData): void {
  try {
    const existing = getSavedRakhis();
    const filtered = existing.filter((item) => item.id !== rakhi.id);
    const updated = [rakhi, ...filtered].slice(0, 30); // Keep last 30
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
}

export function getSavedRakhis(): RakhiData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading localStorage', e);
    return [];
  }
}

export function getRakhiById(id: string): RakhiData | null {
  const all = getSavedRakhis();
  return all.find((r) => r.id === id) || null;
}

/**
 * Encode RakhiData to compact base64 URL safe string
 */
export function encodeRakhiToUrl(data: RakhiData): string {
  try {
    const payload = JSON.stringify({
      i: data.id,
      d: data.designId,
      s: data.sisterName,
      b: data.brotherName,
      n: data.brotherNickname || '',
      m: data.message,
      t: data.themeId,
      p: data.particleType,
      mu: data.musicEnabled ? 1 : 0,
      c: data.createdAt,
    });
    // UTF-8 safe base64 encoding
    return encodeURIComponent(btoa(encodeURIComponent(payload)));
  } catch (e) {
    console.error('Encoding error', e);
    return '';
  }
}

/**
 * Decode base64 URL safe string back to RakhiData
 */
export function decodeRakhiFromUrl(encoded: string): RakhiData | null {
  try {
    const decodedStr = decodeURIComponent(atob(decodeURIComponent(encoded)));
    const obj = JSON.parse(decodedStr);
    return {
      id: obj.i || generateRakhiId(),
      designId: obj.d || 'traditional',
      sisterName: obj.s || 'Sister',
      brotherName: obj.b || 'Brother',
      brotherNickname: obj.n || undefined,
      message: obj.m || '',
      themeId: obj.t || 'saffron',
      particleType: obj.p || 'petals',
      musicEnabled: obj.mu === 1,
      createdAt: obj.c || Date.now(),
    };
  } catch (e) {
    console.error('Decoding error', e);
    return null;
  }
}

/**
 * Construct full shareable link for recipient
 */
export function getShareableUrl(data: RakhiData): string {
  const baseUrl = window.location.origin + window.location.pathname;
  const encoded = encodeRakhiToUrl(data);
  return `${baseUrl}#/rakhi/${data.id}?d=${encoded}`;
}
