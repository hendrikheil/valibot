import type { ErrorMessage, PipeResult } from '../../types.ts';
import { getOutput, getPipeIssues } from '../../utils/index.ts';

/**
 * Creates a validation function that validates an IP v4 or v6 address.
 *
 * @param error The error message.
 *
 * @returns A validation function.
 */
export function ip<TInput extends string>(error?: ErrorMessage) {
  return (input: TInput): PipeResult<TInput> =>
    !/^(?:(?:(?=(25[0-5]))\1|(?=(2[0-4]\d))\2|(?=(1\d{2}))\3|(?=(\d{1,2}))\4)\.){3}(?:(?=(25[0-5]))\5|(?=(2[0-4]\d))\6|(?=(1\d{2}))\7|(?=(\d{1,2}))\8)$/u.test(
      input
    ) &&
    !/^(?:(?:[\dA-Fa-f]{1,4}:){7}[\dA-Fa-f]{1,4}|(?:[\dA-Fa-f]{1,4}:){1,7}:|(?:[\dA-Fa-f]{1,4}:){1,6}:[\dA-Fa-f]{1,4}|(?:[\dA-Fa-f]{1,4}:){1,5}(?::[\dA-Fa-f]{1,4}){1,2}|(?:[\dA-Fa-f]{1,4}:){1,4}(?::[\dA-Fa-f]{1,4}){1,3}|(?:[\dA-Fa-f]{1,4}:){1,3}(?::[\dA-Fa-f]{1,4}){1,4}|(?:[\dA-Fa-f]{1,4}:){1,2}(?::[\dA-Fa-f]{1,4}){1,5}|[\dA-Fa-f]{1,4}:(?::[\dA-Fa-f]{1,4}){1,6}|:(?:(?::[\dA-Fa-f]{1,4}){1,7}|:)|fe80:(?::[\dA-Fa-f]{0,4}){0,4}%[\dA-Za-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\dA-Fa-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/u.test(
      input
    )
      ? getPipeIssues('ip', error || 'Invalid IP', input)
      : getOutput(input);
}
