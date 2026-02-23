
export interface LongCount {
  baktun: number;
  katun: number;
  tun: number;
  uinal: number;
  kin: number;
}

export interface Tzolkin {
  number: number;
  name: string;
  kaqchikel: string;
  index: number;
}

export interface Trecena {
  name: string;
  index: number;
}

export interface Haab {
  day: number;
  month: string;
  monthIndex: number;
  isWayeb: boolean;
}

export interface LordOfNight {
  id: number;
  name: string;
  meaning: string;
}

export interface MayanCross {
  birth: Tzolkin;
  conception: Tzolkin;
  destiny: Tzolkin;
  spiritual: Tzolkin;
  material: Tzolkin;
}

export interface MayanDate {
  longCount: LongCount;
  tzolkin: Tzolkin;
  trecena: Trecena;
  haab: Haab;
  lordOfNight: LordOfNight;
  cross: MayanCross;
  jdn: number;
}

export type ConversionDirection = 'GregorianToMayan' | 'MayanToGregorian';

export type BlogCategory = 'Todos' | 'Estructura' | 'Nahuales' | 'Cruz Maya';

export interface BlogPost {
  id: string;
  title: string;
  category: Exclude<BlogCategory, 'Todos'>;
  excerpt: string;
  readTime: string;
}

export interface SavedProfile {
  id: string;
  name: string;
  day: number;
  month: number;
  year: number;
  isBCE: boolean;
  mayanDate: MayanDate;
  notes?: string;
}

// 29-Field Registry for AI-Ready Knowledge Base
export interface NahualRegistry {
  registryId: string; // Unique ID (e.g., NAH-01)
  
  // 1. Identidad Kaqchikel
  nombreKaqchikel: string;
  significadoEtimologico: string;
  posicionOrdinal: number;
  
  // 2. Iconografía Sagrada
  glifoSVG: string;
  descripcionTrazos: string;
  simbolismoFilosofico: string;
  
  // 3. Correspondencias
  rumbo: string;
  elemento: string;
  colorPrimario: string;
  coloresOfrenda: string;
  piedraEnergia: string;
  
  // 4. Naturaleza y Tótem
  animalProtector: string;
  atributosTotem: string;
  lugaresSagrados: string;
  anatomiaRegida: string;
  
  // 5. Perfil Energético
  perfilPsicologico: string;
  virtudes: string;
  desafios: string;
  misionVida: string;
  vocaciones: string;
  
  // 6. Espiritualidad
  significadoDia: string;
  peticiones: string;
  invocacionKaqchikel: string;
  invocacionEspañol: string;
  
  // 7. Cruz Maya
  engendracion: string;
  destino: string;
  brazoDerecho: string;
  brazoIzquierdo: string;
  
  // 8. Dinámica Numeral
  interaccionNumerales: string;

  // Media
  drawingUrl?: string; // The uploaded drawing
}
