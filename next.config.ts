import type { NextConfig } from "next";

// 1. 从vercel得到的原配置
// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// 2. 部署github pages需要使用的新配置
/** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',           // 静态导出模式
//     distDir: 'dist',            // 明确指定输出目录为 dist（避免混淆）
//     basePath: '/你的仓库名',     // 必须替换为实际仓库名，如 '/my-next-app'
//     images: {
//       unoptimized: true,        // GitHub Pages 必需
//     },
//   }
  
//   module.exports = nextConfig

// 3. 部署gp修改样式文件找不到的问题
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    basePath: '/nextjs-boilerplate-gp',           // 如 '/my-app'
    assetPrefix: '/nextjs-boilerplate-gp',        // 关键：确保静态资源也加前缀
    
    images: {
      unoptimized: true,
    },
    
    // 确保尾部斜杠一致
    trailingSlash: true,
    
    // 实验性配置（Next.js 14+）
    experimental: {
      // 确保 CSS 被正确提取
      optimizeCss: false,  // GitHub Pages 不需要 CSS 优化
    },
  }
  
  module.exports = nextConfig

// 4. 静态导出模式不适合部署服务器，本地开发默认配置
/** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;
