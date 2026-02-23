
import { BlogPost } from './types';

export const JDN_CREATION = 584283;

export const TZOLKIN_NAMES = [
  "Imix", "Ik'", "Ak'b'al", "K'an", "Chikchan", 
  "Kimi", "Manik'", "Lamat", "Muluk", "Ok", 
  "Chuwen", "Eb'", "B'en", "Ix", "Men", 
  "K'ib'", "Kab'an", "Etz'nab'", "Kawak", "Ajaw"
];

export const KAQCHIKEL_NAMES = [
  "Imox", "Iq'", "Aq'ab'al", "K'at", "Kan",
  "Kame", "Kej", "Q'anil", "Toj", "Tz'i'",
  "B'atz'", "E", "Aj", "I'x", "Tz'ikin",
  "Ajmaq", "No'j", "Tijax", "Kawoq", "Ajpu"
];

export const HAAB_MONTHS = [
  "Pop", "Wo'", "Sip", "Sotz'", "Sek", "Xul", "Yaxk'in", "Mol", "Ch'en", "Yax", 
  "Sak'", "Keh", "Mak", "K'ank'in", "Muwan", "Pax", "K'ayab'", "Kumk'u", "Wayeb'"
];

export const LORDS_OF_NIGHT = [
  { id: 1, name: "Xiuhtecuhtli", meaning: "Señor del Fuego" },
  { id: 2, name: "Texcatlipoca", meaning: "Espejo Humeante" },
  { id: 3, name: "Piltzintecuhtli", meaning: "Señor Príncipe" },
  { id: 4, name: "Centeotl", meaning: "Dios del Maíz" },
  { id: 5, name: "Mitlantecuhtli", meaning: "Señor del Inframundo" },
  { id: 6, name: "Chalchiuhtlicue", meaning: "La de la falda de Jade" },
  { id: 7, name: "Tlazolteotl", meaning: "Diosa de la Inmundicia" },
  { id: 8, name: "Tepeyollotl", meaning: "Corazón de la Montaña" },
  { id: 9, name: "Tlaloc", meaning: "Dios de la Lluvia" }
];

export const TZOLKIN_NUMBER_MEANINGS: Record<number, string> = {
  1: "Inicio, unidad, origen y potencial.",
  2: "Dualidad, equilibrio, polaridad y elección.",
  3: "Acción, creatividad, trinidad y movimiento.",
  4: "Estabilidad, los cuatro rumbos, orden y realidad física.",
  5: "Empoderamiento, centro, inteligencia y trabajo.",
  6: "Fluidez, relación, equilibrio social y ajuste.",
  7: "Poder místico, reflexión, pirámide y finalización de ciclo.",
  8: "Resonancia, justicia, organización y renovación.",
  9: "Ciclo de vida, feminidad, paciencia y plenitud.",
  10: "Responsabilidad, ley, manifestation y autoridad.",
  11: "Resolución, cambio, dinamismo y libertad.",
  12: "Comprensión, sabiduría, consejo y pasado acumulado.",
  13: "Trascendencia, espíritu, conexión cósmica y evolución."
};

export const TRECENA_INFO: Record<string, { summary: string; meaning: string }> = {
  "Imix": { summary: "Nacimiento y Nutrición", meaning: "Periodo de nuevos comienzos, de sumergirse en las aguas primordiales de la creación." },
  "Ik'": { summary: "Viento y Comunicación", meaning: "Días para la expresión, la flexibilidad y el movimiento de las ideas." },
  "Ak'b'al": { summary: "Noche y Renovación", meaning: "Inmersión en el misterio para encontrar la luz interior y los sueños." },
  "K'an": { summary: "Semilla y Crecimiento", meaning: "Momento de plantar intenciones y cuidar la red de relaciones." },
  "Chikchan": { summary: "Serpiente y Fuerza Vital", meaning: "Intensidad, energía kundalini y conexión con la sabiduría instintiva." },
  "Kimi": { summary: "Muerte y Renacimiento", meaning: "Soltar lo que ya no sirve para transformarse profundamente." },
  "Manik'": { summary: "Venado y Sanación", meaning: "Establecer límites, encontrar armonía con la naturaleza y sanar." },
  "Lamat": { summary: "Estrella y Abundancia", meaning: "Momento de brillar, de prosperidad y de apreciar la belleza cósmica." },
  "Muluk": { summary: "Agua y Ofrenda", meaning: "Purificación emocional y agradecimiento a las fuerzas superiores." },
  "Ok": { summary: "Perro y Lealtad", meaning: "Fomentar la fidelidad, la justicia y el amor incondicional." },
  "Chuwen": { summary: "Mono y Creatividad", meaning: "La magia del juego, el arte y la resolución creativa de problemas." },
  "Eb'": { summary: "Hierba y Camino", meaning: "Cosechar lo sembrado y prepararse para el camino de la vida." },
  "B'en": { summary: "Caña y Autoridad", meaning: "Liderazgo espiritual y fortalecimiento de las bases del hogar." },
  "Ix": { summary: "Jaguar y Magia", meaning: "Conexión con la energía de la tierra, el sigilo y el poder chamánico." },
  "Men": { summary: "Águila y Visión", meaning: "Elevación para ver el panorama completo y encontrar soluciones." },
  "K'ib'": { summary: "Buitre y Perdón", meaning: "Limpieza del pasado, perdón de errores y acumulación de sabiduría." },
  "Kab'an": { summary: "Tierra y Movimiento", meaning: "Sincronización con los ritmos del planeta y la evolución mental." },
  "Etz'nab'": { summary: "Pedernal y Claridad", meaning: "Corte de la ilusión, discernimiento y sacrificio de lo falso." },
  "Kawak": { summary: "Tormenta y Purificación", meaning: "Energía renovadora que limpia a través del rayo y la lluvia." },
  "Ajaw": { summary: "Sol y Ascensión", meaning: "La luz máxima, la conciencia iluminada y el éxito espiritual." }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Cómo funciona el calendario maya',
    category: 'Estructura',
    excerpt: 'Descubre el sistema matemático base 20 y los ciclos entrelazados que definen el tiempo sagrado.',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Diferencias entre los tres calendarios',
    category: 'Estructura',
    excerpt: 'Tzolk\'in, Haab\' y Cuenta Larga: aprende para qué servía cada uno en la vida diaria maya.',
    readTime: '4 min'
  },
  {
    id: '3',
    title: 'Qué es la Rueda Calendárica',
    category: 'Estructura',
    excerpt: 'La unión perfecta del ciclo sagrado y el solar que se repite cada 52 años.',
    readTime: '6 min'
  }
];

export interface GlyphDetails {
  glifo: string;
  trazos: string;
  simbolismo: string;
}

export interface DayDetail {
  symbol: string;
  kaqchikel: string;
  meaning: string;
  extended: string;
  depth: 'Básico' | 'Intermedio' | 'Avanzado';
  glyph: GlyphDetails;
  cycleRole?: string;
}

export const TZOLKIN_DAY_DETAILS: Record<string, DayDetail> = {
  "Imix": { 
    symbol: "Pez / Lagarto", 
    kaqchikel: "Imox", 
    meaning: "Símbolo de las fuerzas ocultas del universo. Es la esencia de nuestra consciencia y el espíritu del agua.",
    extended: "Representa el lado izquierdo, la parte inusual de las cosas, y la conexión con el mar y los ríos.",
    depth: 'Avanzado',
    glyph: {
      glifo: "Cabeza de lagarto o pez con mandíbula abierta, frecuentemente con líneas de agua",
      trazos: "Mandíbula prominentemente abierta, branquias o detalles acuáticos, líneas de agua ondulantes",
      simbolismo: "La mandíbula abierta sugiere acceso a profundidades. Las líneas de agua indican lo oculto, lo subconsciente. Comunica: misterio, intuición profunda."
    }
  },
  "Ik'": { 
    symbol: "Viento / Aliento", 
    kaqchikel: "Iq'", 
    meaning: "Nawal del aire y del espíritu. Representa las ideas, el cambio y la comunicación.",
    extended: "Es el aliento de vida, el viento que limpia y el espíritu que mueve las ideas.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Patrón de líneas ondulantes o espiral central",
      trazos: "Líneas fluidas y dinámicas, remolino o espiral, radiaciones sugerentes de movimiento",
      simbolismo: "La espiral representa el movimiento perpetuo del aire. Las líneas ondulantes sugieren cambio e inconstancia. Comunica: espíritu, comunicación."
    }
  },
  "Ak'b'al": { 
    symbol: "Amanecer / Aurora", 
    kaqchikel: "Aq'ab'al", 
    meaning: "Símbolo del amanecer y la renovación de energía. Claridad y nuevo día.",
    extended: "La aurora formada por los primeros rayos del sol. La luz que vence a la oscuridad.",
    depth: 'Intermedio',
    cycleRole: "Aq'ab'al cierra y abre ciclos simultáneamente (día 13 del Cholq'ij)",
    glyph: {
      glifo: "Mano abierta o líneas de luz radiante descendente",
      trazos: "Dedos extendidos, líneas que irradian hacia abajo desde arriba, sugerencia de apertura",
      simbolismo: "La mano abierta comunica receptividad y apertura. Las líneas radiantes sugieren luz descendente. Representan: nuevas oportunidades."
    }
  },
  "K'an": { 
    symbol: "Red / Iguana", 
    kaqchikel: "K'at", 
    meaning: "Símbolo de la red, de la cautividad y de la liberación.",
    extended: "Representa el fuego sagrado, las ofrendas y el poder de atrapar el conocimiento.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Patrón de malla o red con líneas entrelazadas",
      trazos: "Líneas que se entrecruzan formando cuadros o diamantes, patrón geométrico regular",
      simbolismo: "El patrón de tejido representa conexión. Los enredos geométricos sugieren complejidad. Comunica: tejido de destinos, conexión causal."
    }
  },
  "Chikchan": {
    symbol: "Serpiente Emplumada",
    kaqchikel: "Kan",
    meaning: "Símbolo de la justicia, la verdad y la paz.",
    extended: "Representa la fuerza vital, la energía creadora en movimiento y la conexión tierra-cielo.",
    depth: 'Avanzado',
    cycleRole: "Kan como día 20 completa un microciclo antes de que B'atz' reinicie",
    glyph: {
      glifo: "Cuerpo ondulante de serpiente con plumas, cabeza triangular",
      trazos: "Líneas serpenteantes fluidas, elementos de plumas radiantes, cabeza puntiaguda de serpiente",
      simbolismo: "La serpiente ondulante representa movimiento perpetuo. Las plumas indican elevación celestial. Comunica: creación en movimiento."
    }
  },
  "Kimi": {
    symbol: "Tecolote / Muerte",
    kaqchikel: "Kame",
    meaning: "Símbolo de la disolución y la transformación.",
    extended: "Representa el fin de ciclos, el contacto con los ancestros y la sabiduría del renacimiento.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Cabeza de búho nocturno (Tecolote) frecuentemente con elementos esqueletales",
      trazos: "Ojos grandes redondos, elemento de calavera o huesos cruzados, carácter nocturno",
      simbolismo: "Los ojos sugieren visión de lo invisible. Los elementos de muerte comunican transformación. Representan: reencarnación y nueva vida."
    }
  },
  "Manik'": {
    symbol: "Venado",
    kaqchikel: "Kej",
    meaning: "Símbolo de la armonía y la naturaleza.",
    extended: "Representa los cuatro puntos cardinales, el equilibrio y la fuerza que sostiene el universo.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Cabeza de venado con astas simétricas hacia arriba",
      trazos: "Astas con múltiples puntas, cabeza elegante, simetría bilateral perfecta",
      simbolismo: "Las astas representan los 'cuatro pilares que sostienen cielo y tierra'. Enfatiza equilibrio y estabilidad universal."
    }
  },
  "Lamat": {
    symbol: "Semilla",
    kaqchikel: "Q'anil",
    meaning: "Símbolo de la semilla y la vida.",
    extended: "Representa la fertilidad, el inicio de las siembras y el brillo de la creación.",
    depth: 'Básico',
    glyph: {
      glifo: "Forma de semilla con brote germinado, patrón de cuatro hojas o direcciones",
      trazos: "Líneas que sugieren crecimiento hacia arriba y raíces hacia abajo, patrón cuatrilobulado",
      simbolismo: "Brote ascendente y raíces descendentes representan el ciclo de vida. Los cuatro lóbulos subrayan los colores del maíz sagrado."
    }
  },
  "Muluk": {
    symbol: "Ofrenda / Fuego",
    kaqchikel: "Toj",
    meaning: "Símbolo de la ley de causa y efecto.",
    extended: "Representa el pago de deudas espirituales, la lluvia que limpia y el fuego sagrado.",
    depth: 'Avanzado',
    glyph: {
      glifo: "Líneas que representan llamas de fuego ascendentes",
      trazos: "Líneas ascendentes, puntos de chispa, rizos que sugieren llamas ardientes",
      simbolismo: "Líneas ascendentes sugieren movimiento hacia lo divino. Puntos de chispa representan dispersión de energía. Comunica: transformación."
    }
  },
  "Ok": {
    symbol: "Perro",
    kaqchikel: "Tz'i'",
    meaning: "Símbolo de la autoridad y la justicia.",
    extended: "Representa la ley espiritual, la lealtad y el equilibrio entre lo material y lo espiritual.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Cabeza de perro o Tepezcuintle con orejas prominentes",
      trazos: "Orejas grandes, mandíbula fuerte, líneas de autoridad o justicia",
      simbolismo: "Orejas grandes sugieren 'escucha atenta a la ley'. Mandíbula fuerte comunica fuerza de orden. Representa: guardianía y justicia."
    }
  },
  "Chuwen": {
    symbol: "Mono",
    kaqchikel: "B'atz'",
    meaning: "Símbolo del tiempo y del tejido de la vida.",
    extended: "Representa la creación, el arte, la risa y el hilo que conecta todas las cosas.",
    depth: 'Avanzado',
    cycleRole: "B'atz' abre el ciclo de 260 días, representando el inicio del hilo temporal",
    glyph: {
      glifo: "Cabeza de mono con ojos grandes y redondos",
      trazos: "Líneas que representan hilos ondulantes, boca abierta, detalles de pelaje",
      simbolismo: "Ojos grandes representan sabiduría y observación. Líneas ondulantes simbolizan el hilo del tiempo que se teje continuamente."
    }
  },
  "Eb'": {
    symbol: "Camino",
    kaqchikel: "E",
    meaning: "Símbolo del camino y el destino.",
    extended: "Representa los viajes, la guía espiritual y la protección en la ruta de la vida.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Huella o sendero sinuoso con diente prominente",
      trazos: "Líneas fluidas que forman un camino, estructura con aspecto de diente",
      simbolismo: "El camino sinuoso representa todas las posibilidades. El diente sugiere capacidad de asir el propósito. Comunica determinación."
    }
  },
  "B'en": {
    symbol: "Hogar",
    kaqchikel: "Aj",
    meaning: "Símbolo de la resurrección y el triunfo.",
    extended: "Representa la abundancia, la rectitud de carácter y el fortalecimiento de las raíces del hogar.",
    depth: 'Básico',
    glyph: {
      glifo: "Tallo vertical de caña o maíz",
      trazos: "Líneas paralelas verticales con nodos, sugerencia de crecimiento hacia arriba",
      simbolismo: "Verticalidad representa crecimiento del hogar. Nodos representan solidificación. Concepto: estabilidad en familia."
    }
  },
  "Ix": {
    symbol: "Jaguar",
    kaqchikel: "I'x",
    meaning: "Símbolo de la energía femenina y la tierra.",
    extended: "Representa la magia, el sigilo, la astucia y la conexión profunda con la selva.",
    depth: 'Avanzado',
    glyph: {
      glifo: "Cabeza de felino con mandíbula prominente, dualidad humano-animal",
      trazos: "Ojos grandes redondos, nariz ancha, mandíbula fuerte, marcas felinas",
      simbolismo: "Fereza y poder primario. Mandíbula sugiere capacidad de proteger. La dualidad indica acción en nivel humano y animal."
    }
  },
  "Men": {
    symbol: "Pájaro / Águila",
    kaqchikel: "Tz'ikin",
    meaning: "Símbolo de la libertad y el intermediario.",
    extended: "Representa la visión elevada, la suerte y la comunicación entre humanos y dioses.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Cabeza de pájaro con pico curvo, alas o plumas radiantes",
      trazos: "Pico largo y curvado, líneas radiantes que sugieren plumas",
      simbolismo: "Pico curvo sugiere visión aguda para 'atrapar' lo deseado. Plumas representan libertad. Enfatiza ascenso y visión elevada."
    }
  },
  "K'ib'": {
    symbol: "Búho / Perdón",
    kaqchikel: "Ajmaq",
    meaning: "Símbolo del perdón y la introspección.",
    extended: "Representa la limpieza de errores pasados, la sabiduría de los abuelos y la paz.",
    depth: 'Avanzado',
    glyph: {
      glifo: "Cabeza de búho con dos ojos grandes y redondos muy prominentes",
      trazos: "Ojos redondos simétricos, rostro ovalado, líneas de sabiduría",
      simbolismo: "Visión en la oscuridad de la historia. Simetría sugiere equilibrio pasado-presente. Comunica: 'los ancianos ven todo'."
    }
  },
  "Kab'an": {
    symbol: "Sabiduría",
    kaqchikel: "No'j",
    meaning: "Símbolo de la inteligencia y el conocimiento.",
    extended: "Representa las ideas, el cerebro humano, el estudio y la evolución mental.",
    depth: 'Avanzado',
    glyph: {
      glifo: "Forma de cerebro o cabeza con líneas ondulantes convergentes",
      trazos: "Líneas que representan 'caminos del pensamiento', formas cerebrales estilizadas",
      simbolismo: "Líneas ondulantes representan el flujo de ideas. Convergencia sugiere síntesis mental y comprensión holística."
    }
  },
  "Etz'nab'": {
    symbol: "Pedernal / Obsidiana",
    kaqchikel: "Tijax",
    meaning: "Símbolo de la medicina y la verdad.",
    extended: "Representa el corte de negatividades, la claridad mental y el sacrificio.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Forma de cuchillo o hoja de obsidiana con filo pronunciado",
      trazos: "Líneas angulares y agudas, punto afilado, bordes oscuros",
      simbolismo: "Angularidad enfatiza corte y separación. Filo sugiere precisión y poder de transformación mediante acción definitiva."
    }
  },
  "Kawak": {
    symbol: "Relámpago / Tempestad",
    kaqchikel: "Kawoq",
    meaning: "Símbolo de la comunidad y la familia.",
    extended: "Representa la energía colectiva, la purificación a través del rayo y la lluvia.",
    depth: 'Avanzado',
    glyph: {
      glifo: "Patrón de zigzag que representa un rayo eléctrico",
      trazos: "Líneas en zigzag dinámicas, puntos o chispas irradiadas",
      simbolismo: "Energía que baja del cielo. Puntos irradiados representan poder dispersado. Energía cósmica que trae cambio."
    }
  },
  "Ajaw": {
    symbol: "Cazador / Luz",
    kaqchikel: "Ajpu",
    meaning: "Símbolo del éxito y la realización.",
    extended: "Representa la luz máxima, la victoria sobre la oscuridad y la conexión solar.",
    depth: 'Intermedio',
    glyph: {
      glifo: "Figura simplificada de cazador con arco y flecha",
      trazos: "Líneas rectas y angulares, arma identificable, postura de acción",
      simbolismo: "Postura sugiere tensión lista para liberar. El arma representa dirección clara. Precisión, fuerza enfocada, victoria."
    }
  }
};
