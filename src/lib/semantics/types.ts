export interface SemanticBlock {
  essence: string;
  masteryVoice?: string;
  shift?: string;
  // Fallback fields for numbers that don't have masteryVoice yet
  light?: string;
  tension?: string;
  practical?: string;
  // Format-specific mastery voices
  masteryVoiceShort?: string;
  masteryVoiceMedium?: string;
  masteryVoiceLong?: string;
  // Compound nuance
  compoundNuance?: CompoundNuance;
}

export interface CompoundNuance {
  addedGift: string;
  addedTension: string;
  addedRisk: string;
  tonalShift: string;
  practicalShift?: string;
  // Optional modifiers for future formats
  voiceModifierShort?: string;
  voiceModifierMedium?: string;
  voiceModifierLong?: string;
}

export type PositionRegistry = Record<number, SemanticBlock>;
export type CompoundRegistry = Record<string, Record<number, Record<number, CompoundNuance>>>; // position -> baseNumber -> compoundNumber -> CompoundNuance

export type Position = 'soul' | 'path' | 'direction' | 'result' | 'expression';
export type PositionPair = 'soul-path' | 'soul-direction' | 'soul-result' | 'path-direction' | 'path-result' | 'direction-result';

export interface ConflictNuance {
  summary: string;
  tensionPattern: string;
  lifeManifestation: string;
  stabilizingShift: string;
  tonalModifier?: string;
}

export interface SynergyNuance {
  summary: string;
  reinforcingPattern: string;
  lifeManifestation: string;
  activationShift: string;
  tonalModifier?: string;
}

export type ConflictRegistry = Partial<Record<PositionPair, Record<number, Record<number, ConflictNuance>>>>;
export type SynergyRegistry = Partial<Record<PositionPair, Record<number, Record<number, SynergyNuance>>>>;
