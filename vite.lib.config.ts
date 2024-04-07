import { resolve } from 'path';
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      dts({
        include: ['src'],
        exclude: ['node_modules', 'dist', '**/*.stories.tsx', './src/vite-env.d.ts', './src/main.tsx', './src/App.tsx'],
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'near-payments',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDom',
          },
        },
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  }),
);
