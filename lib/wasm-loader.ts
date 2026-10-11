// WASM Perlin Noise Loader
export interface WasmPerlinNoise {
    noise(x: number, y: number, z: number): number;
}

export interface WasmModule {
    PerlinNoiseGenerator: new () => WasmPerlinNoise;
    generate_noise: (width: number, height: number, t: number, scale: number) => Float32Array;
    default: (wasmPath?: string) => Promise<void>;
}

let wasmModule: WasmModule | null = null;

async function loadModule(): Promise<WasmModule | null> {
    try {
        if (!wasmModule) {
            // Use eval to bypass TypeScript module resolution
            const importWasm = new Function('return import("/perlin/perlin_wasm.js")');
            const mod = await importWasm() as WasmModule;
            await mod.default();
            wasmModule = mod;
        }
        return wasmModule;
    } catch (error) {
        console.warn('Failed to load WASM Perlin noise:', error);
        return null;
    }
}

export async function loadWasmPerlin(): Promise<WasmPerlinNoise | null> {
    const mod = await loadModule();
    return mod ? new mod.PerlinNoiseGenerator() : null;
}

// Whole-grid noise in one WASM call, normalized to [0, 1]; avoids a JS↔WASM crossing per cell.
export async function loadWasmNoiseField(): Promise<WasmModule['generate_noise'] | null> {
    const mod = await loadModule();
    return mod ? mod.generate_noise : null;
}
