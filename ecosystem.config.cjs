module.exports = {
  apps: [
    {
      name: 'idplay-web',
      cwd: '/var/www/html/backupidplay-web',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        NEXT_PUBLIC_MEDIA_URL: 'https://idplay.co.id'
      }
    }
  ]
};
