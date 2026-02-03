import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/financial-health-assessment-platform/', // must match repo name
  plugins: [react()],
});
