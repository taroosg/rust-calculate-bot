/* tslint:disable */
/* eslint-disable */
/**
 * @param {number} n
 * @returns {Uint32Array}
 */
export function prime_factorization(n: number): Uint32Array;
/**
 * @param {number} n
 * @returns {BigInt}
 */
export function fib(n: number): BigInt;

export type InitInput =
  | RequestInfo
  | URL
  | Response
  | BufferSource
  | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly prime_factorization: (a: number, b: number) => void;
  readonly fib: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {InitInput | Promise<InitInput>} module_or_path
 *
 * @returns {Promise<InitOutput>}
 */
export default function init(
  module_or_path?: InitInput | Promise<InitInput>,
): Promise<InitOutput>;
