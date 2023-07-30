import { type Issue, type Issues, ValiError } from '../../error/index.ts';
import type { Pipe, ValidateInfo } from '../../types.ts';

/**
 * Executes the validation and transformation pipe.
 *
 * @param input The input value.
 * @param pipe The pipe to be executed.
 * @param info The validation info.
 *
 * @returns The output value.
 */
export function executePipe<TValue>(
  input: TValue,
  pipe: Pipe<TValue>,
  info: ValidateInfo
): TValue {
  // Create output and issues
  let output: TValue = input;
  const issues: Issue[] = [];

  // Execute any action of pipe
  for (const action of pipe) {
    try {
      output = action(output, info);
    } catch (error) {
      issues.push(...(error as ValiError).issues);
      if (info.abortPipeEarly) {
        break;
      }
    }
  }

  // Throw error if there are issues
  if (issues.length) {
    throw new ValiError(issues as Issues);
  }

  // Return output of pipe
  return output;
}
