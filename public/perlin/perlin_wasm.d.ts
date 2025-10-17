/* tslint:disable */
/* eslint-disable */
export function generate_noise(width: number, height: number, t: number, scale: number): Float32Array;
export class PerlinNoiseGenerator {
  free(): void;
  [Symbol.dispose](): void;
  constructor();
  noise(x: number, y: number, z: number): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_perlinnoisegenerator_free: (a: number, b: number) => void;
  readonly perlinnoisegenerator_new: () => number;
  readonly perlinnoisegenerator_noise: (a: number, b: number, c: number, d: number) => number;
  readonly generate_noise: (a: number, b: number, c: number, d: number) => [number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
