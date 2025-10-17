// WASM Perlin Noise Loader
export interface WasmPerlinNoise {
    noise(x: number, y: number, z: number): number;
}

export interface WasmModule {
    PerlinNoiseGenerator: new () => WasmPerlinNoise;
    default: (wasmPath?: string) => Promise<void>;
}

let wasmModule: WasmModule | null = null;

export async function loadWasmPerlin(): Promise<WasmPerlinNoise | null> {
    try {
        if (!wasmModule) {
            // Use eval to bypass TypeScript module resolution
            const importWasm = new Function('return import("/perlin/perlin_wasm.js")');
            wasmModule = await importWasm() as WasmModule;
            await wasmModule.default();
        }
        return new wasmModule.PerlinNoiseGenerator();
    } catch (error) {
        console.warn('Failed to load WASM Perlin noise:', error);
        return null;
    }
}
