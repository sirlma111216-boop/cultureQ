import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 강의안은 정적 사이트다. 서버 함수·환경변수·외부 API 호출이 없다.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { outDir: 'dist' },
});
