import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    './src/vue/index.ts',
    './src/react/index.ts',
  ],
  format: [
    'cjs',
    'esm',
  ],
  dts: true,
  clean: true,
})
