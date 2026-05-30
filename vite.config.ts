import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Project uses Create-React-App-style env naming (REACT_APP_*). Tell Vite to
  // expose those alongside the default VITE_* prefix so import.meta.env can read them.
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: { port: 3000 },
});
