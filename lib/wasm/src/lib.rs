use wasm_bindgen::prelude::*;

// Perlin noise implementation
struct PerlinNoise {
    p: [u8; 512],
}

impl PerlinNoise {
    fn new() -> Self {
        // Pre-shuffled permutation table (same as JS version)
        let p_table = [
151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,254,34,51,156,72,162,31,121,141,162,141,93,114,84,181,222,184,14,205,24,195,243,214,31,12,29,157,192,193,61,45,50,215,115,66,128,199,241,191,106,78,49,81,251,179,204,138,67,242,210,145,235,249,144,236,127,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255        
        ];
        
        let mut p = [0u8; 512];
        for i in 0..512 {
            p[i] = p_table[i & 255];
        }
        
        PerlinNoise { p }
    }

    fn fade(&self, t: f32) -> f32 {
        t * t * t * (t * (t * 6.0 - 15.0) + 10.0)
    }

    fn lerp(&self, t: f32, a: f32, b: f32) -> f32 {
        a + t * (b - a)
    }

    fn grad(&self, hash: u8, x: f32, y: f32, z: f32) -> f32 {
        let h = hash & 15;
        let u = if h < 8 { x } else { y };
        let v = if h < 4 { y } else if h == 12 || h == 14 { x } else { z };
        let u_sign = if (h & 1) == 0 { u } else { -u };
        let v_sign = if (h & 2) == 0 { v } else { -v };
        u_sign + v_sign
    }

    fn noise(&self, x: f32, y: f32, z: f32) -> f32 {
        let x_floor = x.floor();
        let y_floor = y.floor();
        let z_floor = z.floor();
        
        let big_x = (x_floor as i32) & 255;
        let big_y = (y_floor as i32) & 255;
        let big_z = (z_floor as i32) & 255;
        
        let x = x - x_floor;
        let y = y - y_floor;
        let z = z - z_floor;
        
        let u = self.fade(x);
        let v = self.fade(y);
        let w = self.fade(z);
        
        let a = (self.p[big_x as usize] as i32) + big_y;
        let aa = (self.p[a as usize] as i32) + big_z;
        let ab = (self.p[(a + 1) as usize] as i32) + big_z;
        let b = (self.p[(big_x + 1) as usize] as i32) + big_y;
        let ba = (self.p[b as usize] as i32) + big_z;
        let bb = (self.p[(b + 1) as usize] as i32) + big_z;

        self.lerp(w, 
            self.lerp(v, 
                self.lerp(u, 
                    self.grad(self.p[aa as usize], x, y, z), 
                    self.grad(self.p[ba as usize], x - 1.0, y, z)),
                self.lerp(u, 
                    self.grad(self.p[ab as usize], x, y - 1.0, z), 
                    self.grad(self.p[bb as usize], x - 1.0, y - 1.0, z))),
            self.lerp(v, 
                self.lerp(u, 
                    self.grad(self.p[(aa + 1) as usize], x, y, z - 1.0), 
                    self.grad(self.p[(ba + 1) as usize], x - 1.0, y, z - 1.0)),
                self.lerp(u, 
                    self.grad(self.p[(ab + 1) as usize], x, y - 1.0, z - 1.0), 
                    self.grad(self.p[(bb + 1) as usize], x - 1.0, y - 1.0, z - 1.0))))
    }
}

#[wasm_bindgen]
pub struct PerlinNoiseGenerator {
    noise: PerlinNoise,
}

#[wasm_bindgen]
impl PerlinNoiseGenerator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> PerlinNoiseGenerator {
        PerlinNoiseGenerator {
            noise: PerlinNoise::new(),
        }
    }

    #[wasm_bindgen]
    pub fn noise(&self, x: f32, y: f32, z: f32) -> f32 {
        self.noise.noise(x, y, z)
    }
}

#[wasm_bindgen]
pub fn generate_noise(width: u32, height: u32, t: f32, scale: f32) -> Vec<f32> {
    let noise_gen = PerlinNoise::new();
    let mut out = Vec::with_capacity((width * height) as usize);

    for y in 0..height {
        for x in 0..width {
            let nx = (x as f32) / (width as f32) * scale;
            let ny = (y as f32) / (height as f32) * scale;
            let noise_value = noise_gen.noise(nx, ny, t);
            // Convert from [-1, 1] to [0, 1]
            let normalized = (noise_value + 1.0) * 0.5;
            out.push(normalized);
        }
    }
    out
}