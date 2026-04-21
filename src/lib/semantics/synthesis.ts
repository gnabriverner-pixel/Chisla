import { NumberResult, SynthesisResult } from '../../services/calculationService';
import { conflictRegistry } from './registry/conflicts';
import { synergyRegistry } from './registry/synergies';
import { PositionPair, ConflictNuance, SynergyNuance } from './types';

const VECTOR_PARTS = {
  soul: {
    1: "опору на собственную независимость",
    2: "тонкое чувствование и эмпатию",
    3: "потребность в творческом самовыражении",
    4: "стремление к порядку и стабильности",
    5: "жажду свободы и нового опыта",
    6: "потребность в гармонии и заботе",
    7: "глубокий аналитический поиск",
    8: "внутренний масштаб и волю",
    9: "глобальный гуманизм и идеализм"
  },
  path: {
    1: "маршрут первооткрывателя",
    2: "путь дипломатии и партнерства",
    3: "траекторию яркого проявления",
    4: "путь системного созидания",
    5: "маршрут постоянных перемен",
    6: "путь ответственности и служения",
    7: "траекторию исследователя",
    8: "путь управления и влияния",
    9: "маршрут мудрости и синтеза"
  },
  direction: {
    1: "прямое, бескомпромиссное действие",
    2: "мягкую силу и умение договариваться",
    3: "вовлечение и вдохновение окружающих",
    4: "методичный, пошаговый труд",
    5: "быструю адаптацию и маневренность",
    6: "создание поддерживающей среды",
    7: "выверенную, интеллектуальную стратегию",
    8: "масштабное управление ресурсами",
    9: "дипломатию смыслов и трансформацию"
  },
  result: {
    1: "абсолютную автономию",
    2: "прочную экосистему связей",
    3: "признанное мастерство и влияние",
    4: "несокрушимый фундамент",
    5: "осознанную, управляемую свободу",
    6: "безопасную гавань для многих",
    7: "неоспоримый интеллектуальный авторитет",
    8: "материальную и структурную империю",
    9: "исцеляющую мудрость и наставничество"
  }
} as const;

export function buildSynthesis(
  soul: NumberResult,
  path: NumberResult,
  direction: NumberResult,
  result: NumberResult,
  mode: 'free_result' | 'premium_longread' = 'free_result'
): SynthesisResult {
  
  const pairs: Array<{ key: PositionPair; left: number; right: number }> = [
    { key: 'soul-path', left: soul.reduced, right: path.reduced },
    { key: 'soul-direction', left: soul.reduced, right: direction.reduced },
    { key: 'soul-result', left: soul.reduced, right: result.reduced },
    { key: 'path-direction', left: path.reduced, right: direction.reduced },
    { key: 'path-result', left: path.reduced, right: result.reduced },
    { key: 'direction-result', left: direction.reduced, right: result.reduced }
  ];

  const activeConflicts: ConflictNuance[] = [];
  const activeSynergies: SynergyNuance[] = [];

  // Strict validation: only push if the registry explicitly has this exact pair
  for (const pair of pairs) {
    const conflict = conflictRegistry[pair.key]?.[pair.left]?.[pair.right];
    if (conflict) activeConflicts.push(conflict);

    const synergy = synergyRegistry[pair.key]?.[pair.left]?.[pair.right];
    if (synergy) activeSynergies.push(synergy);
  }

  // 1. Key Vector
  const pSoul = VECTOR_PARTS.soul[soul.reduced as keyof typeof VECTOR_PARTS.soul] || "твердую опору";
  const pPath = VECTOR_PARTS.path[path.reduced as keyof typeof VECTOR_PARTS.path] || "уникальный маршрут";
  const pDir = VECTOR_PARTS.direction[direction.reduced as keyof typeof VECTOR_PARTS.direction] || "действие";
  const pRes = VECTOR_PARTS.result[result.reduced as keyof typeof VECTOR_PARTS.result] || "устойчивый результат";

  let keyVector = `Ваша конфигурация выстраивает ${pPath}, имея под собой ${pSoul}. Внешне эта энергия переходит в ${pDir}, чтобы в зрелости кристаллизоваться в ${pRes}.`;
  
  if (activeSynergies.length > 0) {
    keyVector += ` Система обладает естественным ускорением: ${activeSynergies[0].summary.toLowerCase()} позволяет вам действовать с меньшим внутренним трением.`;
  } else if (activeConflicts.length > 0) {
    keyVector += ` Ключевая динамика строится на внутреннем напряжении: ${activeConflicts[0].summary.toLowerCase()} заставляет вас постоянно искать баланс между противоположными векторами.`;
  }

  // Helper for deduplication
  const pushUnique = (arr: string[], item: string | undefined, limit: number) => {
    if (item && arr.length < limit && !arr.includes(item)) {
      arr.push(item);
    }
  };

  // 2. Strong Sides (Exactly 3)
  const strongSides: string[] = [];
  activeSynergies.forEach(s => pushUnique(strongSides, `${s.summary}: ${s.reinforcingPattern}`, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(strongSides, pos.compoundNuance?.addedGift, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(strongSides, pos.light ? `Опора: ${pos.light}` : undefined, 3));

  // 3. Tension Zones (Exactly 3)
  const tensionZones: string[] = [];
  activeConflicts.forEach(c => pushUnique(tensionZones, `${c.summary}: ${c.tensionPattern}`, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(tensionZones, pos.compoundNuance?.addedTension, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(tensionZones, pos.compoundNuance?.addedRisk, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(tensionZones, pos.tension ? `Зона риска: ${pos.tension}` : undefined, 3));

  // 4. Practical Recommendations (Exactly 3)
  const recommendations: string[] = [];
  activeConflicts.forEach(c => pushUnique(recommendations, c.stabilizingShift, 3));
  activeSynergies.forEach(s => pushUnique(recommendations, s.activationShift, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(recommendations, pos.compoundNuance?.practicalShift, 3));
  [soul, path, direction, result].forEach(pos => pushUnique(recommendations, pos.shift, 3));

  // Future expansion hook for premium longread
  if (mode === 'premium_longread') {
    // Can expand limits or add sections here later
  }

  return {
    keyVector,
    strongSides,
    tensionZones,
    practicalRecommendations: recommendations
  };
}
