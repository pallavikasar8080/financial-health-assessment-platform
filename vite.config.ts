import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/financial-health-assessment-platform/', // ✅ must match repo name
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
