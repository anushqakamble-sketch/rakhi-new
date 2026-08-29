export type RakhiDesignId = 
  | 'traditional'
  | 'floral'
  | 'minimal'
  | 'cute'
  | 'royal'
  | 'pink'
  | 'avengers_shield'
  | 'avengers_ironman'
  | 'avengers_spidey';

export interface RakhiDesign {
  id: RakhiDesignId;
  name: string;
  subtitle: string;
  tag: string;
  category?: 'superhero' | 'traditional' | 'modern';
  primaryColor: string;
  accentColor: string;
  description: string;
}

export type ThemeId = 'saffron' | 'crimson' | 'blush' | 'midnight' | 'marigold';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  gradient: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  goldAccent: string;
  badgeBg: string;
}

export type ParticleType = 'petals' | 'sparkles' | 'confetti' | 'marigold';

export interface RakhiData {
  id: string;
  designId: RakhiDesignId;
  sisterName: string;
  brotherName: string;
  brotherNickname?: string;
  message: string;
  themeId: ThemeId;
  particleType: ParticleType;
  musicEnabled: boolean;
  createdAt: number;
}

export interface MessageTemplate {
  id: string;
  category: string;
  title: string;
  text: (brother: string, sister: string, nickname?: string) => string;
}
