import { Position, SemanticBlock } from './types';
import { soulRegistry } from './registry/soul';
import { pathRegistry } from './registry/path';
import { directionRegistry } from './registry/direction';
import { resultRegistry } from './registry/result';
import { compoundRegistry } from './registry/compounds';

export function getInterpretation(position: Position, baseNumber: number, compoundNumber?: number): SemanticBlock | null {
  let block: SemanticBlock | null = null;

  switch (position) {
    case 'soul':
      block = soulRegistry[baseNumber] || null;
      break;
    case 'path':
      block = pathRegistry[baseNumber] || null;
      break;
    case 'direction':
      block = directionRegistry[baseNumber] || null;
      break;
    case 'result':
      block = resultRegistry[baseNumber] || null;
      break;
    case 'expression':
      // To be implemented
      return null;
    default:
      return null;
  }

  // If we have a block and a compound number, try to attach compound nuance
  if (block && compoundNumber && compoundNumber > 9) {
    const nuance = compoundRegistry[position]?.[baseNumber]?.[compoundNumber];
    if (nuance) {
      // Return a new object to avoid mutating the registry
      return {
        ...block,
        compoundNuance: nuance
      };
    }
  }

  return block;
}
