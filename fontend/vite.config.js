import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// httpss://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
