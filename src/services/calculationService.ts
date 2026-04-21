import { getInterpretation, Position } from '../lib/semantics/engine';
import { buildSynthesis } from '../lib/semantics/synthesis';

export interface CalculationInput {
  dateOfBirth: string; // YYYY-MM-DD
  name?: string;
  gender?: string;
  placeOfBirth?: string;
  intention?: string;
}

export interface NumberResult {
  reduced: number;
  compound: number;
  chain: string;
  essence: string;
  light: string;
  tension: string;
  practical: string;
  masteryVoice?: string;
  masteryVoiceShort?: string;
  masteryVoiceMedium?: string;
  masteryVoiceLong?: string;
  shift?: string;
  compoundNuance?: any; // Using any here to avoid circular dependency or complex imports, or we can import it
}

export interface SynthesisResult {
  keyVector: string;
  strongSides: string[];
  tensionZones: string[];
  practicalRecommendations: string[];
}

export interface FullReport {
  inputData: CalculationInput;
  numbers: {
    soul: NumberResult;
    path: NumberResult;
    direction: NumberResult;
    result: NumberResult;
    expression?: NumberResult;
  };
  synthesis: SynthesisResult;
  premiumUnlocked?: boolean;
}

// --- CORE CALCULATION UTILS ---

function sumDigits(str: string): number {
  return str.split('').reduce((acc, val) => acc + (parseInt(val, 10) || 0), 0);
}

function reduceToSingleDigit(num: number): { reduced: number; chainSteps: string[] } {
  if (num === 0) return { reduced: 0, chainSteps: ["0"] };
  let current = num;
  const steps = [];
  
  while (current > 9) {
    const next = sumDigits(current.toString());
    steps.push(next.toString());
    current = next;
  }
  
  return { reduced: current, chainSteps: steps };
}

// --- DICTIONARIES ---

const NUMBER_MEANINGS: Record<number, { essence: string; light: string; shadow: string; practical: string }> = {
  1: {
    essence: "Инициатива и самостоятельность",
    light: "Смелость, новаторство, способность принимать решения и вести за собой.",
    shadow: "Категоричность, эгоцентризм, нетерпимость к чужому темпу.",
    practical: "Запуск новых проектов, индивидуальная работа, управление процессами."
  },
  2: {
    essence: "Партнерство и баланс",
    light: "Эмпатия, дипломатия, умение видеть детали и находить компромиссы.",
    shadow: "Нерешительность, склонность к слиянию с другими, избегание конфликтов в ущерб себе.",
    practical: "Командная работа, переговоры, создание гармоничной среды, аналитика."
  },
  3: {
    essence: "Выражение и коммуникация",
    light: "Харизма, креативность, оптимизм, способность вдохновлять словом.",
    shadow: "Распыление энергии, поверхностность, неумение доводить начатое до конца.",
    practical: "Публичные выступления, дизайн, тексты, творческие индустрии."
  },
  4: {
    essence: "Структура и порядок",
    light: "Системность, надежность, практичность, создание прочного фундамента.",
    shadow: "Жесткость, трудоголизм, сопротивление переменам, излишняя консервативность.",
    practical: "Архитектура процессов, финансы, систематизация данных, управление ресурсами."
  },
  5: {
    essence: "Изменения и адаптивность",
    light: "Гибкость, масштабное видение, смелость в экспериментах, быстрота реакции.",
    shadow: "Непостоянство, импульсивность, склонность к неоправданному риску.",
    practical: "Кризис-менеджмент, инновации, работа с изменениями, нетворкинг."
  },
  6: {
    essence: "Ответственность и забота",
    light: "Создание гармонии, преданность, эстетический вкус, наставничество.",
    shadow: "Гиперопека, идеализм, склонность к самопожертвованию, тревожность.",
    practical: "Образование, построение сообществ, дизайн интерьеров, клиентский сервис."
  },
  7: {
    essence: "Анализ и глубина",
    light: "Исследовательский ум, проницательность, стремление к сути, интеллектуальная независимость.",
    shadow: "Изоляция, скептицизм, интеллектуальная гордыня, склонность к меланхолии.",
    practical: "Наука, IT, стратегическое планирование, глубокая аналитика."
  },
  8: {
    essence: "Материализация и масштаб",
    light: "Организаторский талант, амбициозность, понимание законов материального мира.",
    shadow: "Контроль, жесткость, выгорание, подавление инициативы других.",
    practical: "Бизнес, инвестиции, управление крупными проектами, юриспруденция."
  },
  9: {
    essence: "Синтез и гуманизм",
    light: "Широта взглядов, мудрость, способность видеть картину целиком, сострадание.",
    shadow: "Оторванность от реальности, иллюзии, эмоциональные качели.",
    practical: "Глобальные проекты, философия, наставничество, социальные инициативы."
  }
};

// --- MAIN ENGINE ---

export function calculateDigitalCode(input: CalculationInput): FullReport {
  const dateParts = input.dateOfBirth.split('-');
  const yearStr = dateParts[0] || "0";
  const monthStr = dateParts[1] || "0";
  const dayStr = dateParts[2] || "0";

  // 1. Число Души (Soul) = Day reduced
  const soulCompound = sumDigits(dayStr);
  const soulRed = reduceToSingleDigit(soulCompound);
  const soulReduced = soulRed.reduced === 0 ? 1 : soulRed.reduced;
  const soulChain = dayStr.length > 1 
    ? `${dayStr.split('').join(' + ')} = ${soulCompound}${soulRed.chainSteps.length > 0 ? ' → ' + soulRed.chainSteps.join(' → ') : ''}`
    : `${dayStr}`;

  // 2. Число Пути (Path) = Day + Month + Year reduced
  const fullDateStr = dayStr + monthStr + yearStr;
  const pathCompound = sumDigits(fullDateStr);
  const pathRed = reduceToSingleDigit(pathCompound);
  const pathReduced = pathRed.reduced === 0 ? 1 : pathRed.reduced;
  const pathChain = `${fullDateStr.split('').join(' + ')} = ${pathCompound}${pathRed.chainSteps.length > 0 ? ' → ' + pathRed.chainSteps.join(' → ') : ''}`;

  // 3. Число Направления (Direction) = Soul + Path reduced
  const dirCompound = soulReduced + pathReduced;
  const dirRed = reduceToSingleDigit(dirCompound);
  const dirReduced = dirRed.reduced === 0 ? 1 : dirRed.reduced;
  const dirChain = `${soulReduced} + ${pathReduced} = ${dirCompound}${dirRed.chainSteps.length > 0 ? ' → ' + dirRed.chainSteps.join(' → ') : ''}`;

  // 4. Число Результата (Result) = Soul + Path + Direction reduced
  const resultCompound = soulReduced + pathReduced + dirReduced;
  const resultRed = reduceToSingleDigit(resultCompound);
  const resultReduced = resultRed.reduced === 0 ? 1 : resultRed.reduced;
  const resultChain = `${soulReduced} + ${pathReduced} + ${dirReduced} = ${resultCompound}${resultRed.chainSteps.length > 0 ? ' → ' + resultRed.chainSteps.join(' → ') : ''}`;

  // 5. Число Выражения (Expression) - Optional
  // NOTE: Awaiting exact formula for Expression. 
  // For 01.02.1989 the fixture is 3. 
  // Placeholder logic disabled in UI.
  let expressionResult: NumberResult | undefined = undefined;

  // Build Number Results
  const buildNumberResult = (position: Position, reduced: number, compound: number, chain: string): NumberResult => {
    const meaning = NUMBER_MEANINGS[reduced] || NUMBER_MEANINGS[1];
    const semantic = getInterpretation(position, reduced, compound);
    
    return {
      reduced,
      compound,
      chain,
      essence: semantic?.essence || meaning.essence,
      light: semantic?.light || meaning.light,
      tension: semantic?.tension || meaning.shadow,
      practical: semantic?.practical || meaning.practical,
      masteryVoice: semantic?.masteryVoice,
      masteryVoiceShort: semantic?.masteryVoiceShort,
      masteryVoiceMedium: semantic?.masteryVoiceMedium,
      masteryVoiceLong: semantic?.masteryVoiceLong,
      shift: semantic?.shift,
      compoundNuance: semantic?.compoundNuance
    };
  };

  const soulResult = buildNumberResult('soul', soulReduced, soulCompound, soulChain);
  const pathResult = buildNumberResult('path', pathReduced, pathCompound, pathChain);
  const directionResult = buildNumberResult('direction', dirReduced, dirCompound, dirChain);
  const finalResult = buildNumberResult('result', resultReduced, resultCompound, resultChain);

  // Build Synthesis
  const synthesis = buildSynthesis(soulResult, pathResult, directionResult, finalResult);

  return {
    inputData: input,
    numbers: {
      soul: soulResult,
      path: pathResult,
      direction: directionResult,
      result: finalResult,
      expression: expressionResult
    },
    synthesis,
    premiumUnlocked: false
  };
}
