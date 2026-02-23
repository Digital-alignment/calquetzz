
export interface DevDoc {
  id: string;
  title: string;
  description: string;
  content: string;
  path: string;
}

export const GITHUB_REPO = "https://github.com/Digital-alignment/quetzal.git";

export const DEV_DOCS: DevDoc[] = [
  {
    id: 'jdn-logic',
    title: 'Algoritmo de Conversión JDN',
    description: 'La piedra rosetta temporal: El Número de Día Juliano.',
    path: 'knowledge/logica_conversion.txt',
    content: `CÁLCULO DEL NÚMERO DE DÍA JULIANO (JDN)

Esta es la función maestra de sincronización.
Archivo: mayanLogic.ts -> gregorianToJDN()

Lógica:
1. Manejo de la Era: Si es BCE, convertimos el año a valor astronómico (año - 1) * -1.
2. Ajuste de Marzo: El algoritmo trata a Marzo como el primer mes del año para simplificar la cuenta de días bisiestos.
3. Constantes: 4716 y 1524.5 son offsets astronómicos para alinear el día 0 de la era Juliana.

Implementación:
Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;

Este número permite que cualquier fecha en la historia sea representada por un único entero, facilitando restas y sumas de ciclos mayas.`
  },
  {
    id: 'nahual-encyclopedia',
    title: 'Enciclopedia de Nahuales (Cholq\'ij)',
    description: 'Base de datos completa de las 20 energías sagradas.',
    path: 'knowledge/nahuales_detallados.txt',
    content: `ENCICLOPEDIA DE LOS 20 NAHUALES

Cada Nahual (Nawal) representa una fuerza de la naturaleza y una característica del espíritu humano.

1. IMIX (Imox): El mar, la locura, el lado izquierdo, lo inusual.
2. IK' (Iq'): El viento, el aliento, la purificación, la comunicación.
3. AK'B'AL (Aq'ab'al): La aurora, el amanecer, lo nuevo, la luz.
4. K'AN (K'at): La red, el fuego, el cautiverio y la liberación.
5. CHIKCHAN (Kan): La serpiente emplumada, la justicia, la verdad.
6. KIMI (Kame): La muerte, el renacimiento, los ancestros.
7. MANIK' (Kej): El venado, los cuatro puntos cardinales, el equilibrio.
8. LAMAT (Q'anil): La semilla, la fertilidad, el brillo de la vida.
9. MULUK (Toj): El fuego sagrado, el pago, la ley de causa y efecto.
10. OK (Tz'i'): El perro, la ley, la autoridad, la justicia.
11. CHUWEN (B'atz'): El hilo del tiempo, el mono, la creatividad.
12. EB' (E): El camino, el destino, el viaje de la vida.
13. B'EN (Aj): La caña, el hogar, la rectitud, el renacimiento.
14. IX (I'x): El jaguar, la montaña, la energía femenina, la tierra.
15. MEN (Tz'ikin): El águila, la visión, la suerte, el intermediario.
16. K'IB' (Ajmaq): El perdón, el pecado, la sabiduría de los abuelos.
17. KAB'AN (No'j): El pensamiento, la inteligencia, el cerebro.
18. ETZ'NAB' (Tijax): El pedernal, la obsidiana, el corte, la sanación.
19. KAWAK (Kawoq): La tormenta, la comunidad, la familia.
20. AJAW (Ajpu): El sol, el cazador, la luz máxima, el triunfo.`
  },
  {
    id: 'mayan-cross-geometry',
    title: 'Geometría de la Cruz Maya',
    description: 'Documentación sobre los 5 puntos de la arquitectura espiritual.',
    path: 'knowledge/cruz_maya_geometria.txt',
    content: `ARQUITECTURA DE LA CRUZ MAYA

La Cruz Maya no es una cruz católica, es un cosmograma de alineación temporal.

Fórmulas de desplazamiento (en días):
- Centro (Nacimiento): Offset 0.
- Arriba (Engendración): Offset -273 días (ciclo humano de 9 meses).
- Abajo (Destino): Offset +273 días.
- Izquierda (Brazo Espiritual): Offset -93 días.
- Derecha (Brazo Material): Offset +93 días.

Interpretación:
La cruz genera un equilibrio entre lo que fuimos (ancestros), lo que somos (esencia) y lo que seremos (misión), flanqueado por nuestras capacidades espirituales y materiales.`
  },
  {
    id: 'db-recommendations',
    title: 'Hoja de Ruta de Conocimiento',
    description: 'Análisis de datos requeridos para completar la enciclopedia.',
    path: 'knowledge/recomendaciones_base_datos.txt',
    content: `RECOMENDACIONES PARA LA BASE DE DATOS DE CONOCIMIENTO

Para lograr una aplicación definitiva sobre el calendario Maya, se sugiere integrar los siguientes módulos de datos:

1. CARGADORES DEL AÑO (YEAR BEARERS)
   - Datos: Identificar cuál de los 4 Nawales (frecuentemente Kej, E, No'j, Ik') inicia el año solar Haab'.
   - Propósito: Determinar la influencia colectiva para los próximos 365 días.

2. COSMOLOGÍA DE TRECENA
   - Datos: Mapear los 20 regentes (deidades) de cada trecena.
   - Propósito: Proporcionar un contexto mitológico más profundo a los ciclos de 13 días.

3. DICCIONARIO MULTILINGÜE
   - Datos: Mapeo de términos en K'iche', Kaqchikel, Yucateco, Q'eqchi' y Mam.
   - Propósito: Respetar la diversidad de los pueblos mayas actuales y antiguos.

4. GUÍA DE OFRENDAS (XUKULEM)
   - Datos: Materiales rituales por Nawal (Colores de velas, tipos de incienso).
   - Propósito: Convertir la app en una herramienta práctica para practicantes y guías espirituales (Ajq'ijab').`
  }
];
