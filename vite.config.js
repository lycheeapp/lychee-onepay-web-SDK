import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';

export default defineConfig({
    plugins: [react(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'), // Replace with the current environment
            preventAssignment: true,  // Required for Rollup 2.0 and later
        }),
    ],
    build: {
        lib: {
            entry: 'src/index.jsx', // Entry point
            name: 'Lychee_SDK',
            formats: ['umd'],
            fileName: (format) => `Lychee-SDK.${format}.js`,
        },
        rollupOptions: {
            // external: ['react', 'react-dom'],
        },
    },
});
