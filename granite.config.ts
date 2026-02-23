import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'followsync',
  brand: {
    displayName: '팔로우싱크',
    primaryColor: '#3182F6',
    icon: 'https://static.toss.im/appsintoss/20215/64990804-5a76-4641-8b4e-b3d201baddb7.png',
  },
  web: {
    host: '172.30.1.45',
    port: 5173,
    commands: {
      dev: 'next dev -p 5173 --hostname 0.0.0.0',
      build: 'next build',
    },
  },
  outdir: 'out',
  webViewProps: {
    type: 'partner',
  },
  permissions: [],
});
