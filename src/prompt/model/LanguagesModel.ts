export interface LanguageModel {
  emoji?: string;
  name: string;
  alphabet: string;
  capitalize?: boolean;
}

export type Language = LanguageModel | "english" | "korean";
