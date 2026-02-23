
import { 
  TZOLKIN_NAMES, 
  KAQCHIKEL_NAMES,
  HAAB_MONTHS, 
  LORDS_OF_NIGHT, 
  JDN_CREATION 
} from './constants';
import { MayanDate, LongCount, Tzolkin, MayanCross } from './types';

export function gregorianToJDN(day: number, month: number, year: number, isBCE: boolean = false): number {
  if (isNaN(day) || isNaN(month) || isNaN(year)) return JDN_CREATION;
  let y = isBCE ? -(year - 1) : year;
  let m = month;
  if (m <= 2) { y -= 1; m += 12; }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + 0.5;
}

export function jdnToGregorian(jdn: number): { day: number; month: number; year: number; isBCE: boolean } {
  if (isNaN(jdn)) return { day: 11, month: 8, year: 3114, isBCE: true };
  const f = Math.floor(jdn + 0.5) + 1401 + Math.floor((Math.floor((4 * Math.floor(jdn + 0.5) + 274277) / 146097) * 3) / 4) - 38;
  const e = 4 * f + 3;
  const g = Math.floor((e % 1461) / 4);
  const h = 5 * g + 2;
  const day = Math.floor((h % 153) / 5) + 1;
  const month = ((Math.floor(h / 153) + 2) % 12) + 1;
  const year = Math.floor(e / 1461) - 4716 + Math.floor((14 - month) / 12);
  return { day, month, year: Math.abs(year), isBCE: year <= 0 };
}

export function getTrecenaRange(jdn: number, tzolkinNumber: number) {
  const startJdn = jdn - (tzolkinNumber - 1);
  const endJdn = startJdn + 12;
  const startDate = jdnToGregorian(startJdn);
  const endDate = jdnToGregorian(endJdn);
  return { startDate, endDate };
}

function getTzolkinAtJDN(jdn: number): Tzolkin {
  const diff = isNaN(jdn) ? 0 : Math.floor(jdn - JDN_CREATION);
  const tNumber = ((diff + 3) % 13 + 13) % 13 + 1;
  const tNameIndex = ((diff + 19) % 20 + 20) % 20;
  return {
    number: tNumber,
    name: TZOLKIN_NAMES[tNameIndex],
    kaqchikel: KAQCHIKEL_NAMES[tNameIndex],
    index: tNameIndex
  };
}

function calculateMayanCross(jdn: number): MayanCross {
  const safeJdn = isNaN(jdn) ? JDN_CREATION : jdn;
  return {
    birth: getTzolkinAtJDN(safeJdn),
    conception: getTzolkinAtJDN(safeJdn - 273),
    destiny: getTzolkinAtJDN(safeJdn + 273),
    spiritual: getTzolkinAtJDN(safeJdn - 93),
    material: getTzolkinAtJDN(safeJdn + 93)
  };
}

export function jdnToMayan(jdn: number): MayanDate {
  const safeJdn = isNaN(jdn) ? JDN_CREATION : jdn;
  const diff = Math.floor(safeJdn - JDN_CREATION);
  let remaining = diff;
  const baktun = Math.floor(remaining / 144000); remaining %= 144000;
  const katun = Math.floor(remaining / 7200); remaining %= 7200;
  const tun = Math.floor(remaining / 360); remaining %= 360;
  const uinal = Math.floor(remaining / 20);
  const kin = remaining % 20;

  const tzolkin = getTzolkinAtJDN(safeJdn);
  const trecenaStartDiff = diff - (tzolkin.number - 1);
  const trecenaNameIndex = ((trecenaStartDiff + 19) % 20 + 20) % 20;

  const haabDayInCycle = ((diff + 348) % 365 + 365) % 365;
  const haabMonthIndex = Math.floor(haabDayInCycle / 20);
  const haabDay = haabDayInCycle % 20;

  const lordIndex = ((diff % 9) + 9) % 9;
  
  return {
    longCount: { baktun, katun, tun, uinal, kin },
    tzolkin,
    trecena: {
      name: TZOLKIN_NAMES[trecenaNameIndex],
      index: trecenaNameIndex
    },
    haab: { 
      day: haabDay, 
      month: HAAB_MONTHS[haabMonthIndex],
      monthIndex: haabMonthIndex,
      isWayeb: haabMonthIndex === 18
    },
    lordOfNight: LORDS_OF_NIGHT[lordIndex],
    cross: calculateMayanCross(safeJdn),
    jdn: safeJdn
  };
}

export function longCountToJDN(lc: LongCount): number {
  if (!lc) return JDN_CREATION;
  const baktun = isNaN(lc.baktun) ? 0 : lc.baktun;
  const katun = isNaN(lc.katun) ? 0 : lc.katun;
  const tun = isNaN(lc.tun) ? 0 : lc.tun;
  const uinal = isNaN(lc.uinal) ? 0 : lc.uinal;
  const kin = isNaN(lc.kin) ? 0 : lc.kin;
  return JDN_CREATION + baktun * 144000 + katun * 7200 + tun * 360 + uinal * 20 + kin;
}

export function getMoonData(jdn: number) {
  const LUNAR_CYCLE = 29.530588;
  const KNOWN_NEW_MOON_JDN = 2460320.5; // Jan 11, 2024
  const age = (jdn - KNOWN_NEW_MOON_JDN) % LUNAR_CYCLE;
  const phase = age < 0 ? age + LUNAR_CYCLE : age;
  const phasePercent = phase / LUNAR_CYCLE;
  const daysToFullMoon = phasePercent <= 0.5 
    ? (0.5 - phasePercent) * LUNAR_CYCLE 
    : (1.5 - phasePercent) * LUNAR_CYCLE;
  
  let label = "Luna Nueva";
  if (phasePercent > 0.05 && phasePercent < 0.2) label = "Luna Creciente";
  else if (phasePercent >= 0.2 && phasePercent < 0.3) label = "Cuarto Creciente";
  else if (phasePercent >= 0.3 && phasePercent < 0.45) label = "Gibosa Creciente";
  else if (phasePercent >= 0.45 && phasePercent < 0.55) label = "Luna Llena";
  else if (phasePercent >= 0.55 && phasePercent < 0.7) label = "Gibosa Menguante";
  else if (phasePercent >= 0.7 && phasePercent < 0.8) label = "Cuarto Menguante";
  else if (phasePercent >= 0.8 && phasePercent < 0.95) label = "Luna Menguante";

  return { 
    phasePercent, 
    daysToFullMoon: Math.ceil(daysToFullMoon),
    label 
  };
}
