import preact from '@preact/preset-vite'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [preact()],
    server: {
      proxy: {
        '/api': `${env.VITE_SERVER_BASE_URL}/api`
      }
    }
  }
})
