import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My-Awesome-blog",
  description: "A-Cool-Blog",
  srcDir: 'src',
  lastUpdated: true,
  themeConfig: {
    logo:'/images/image.png',
    
    siteTitle: 'welcome to my blog',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🤡 关于我', link: '/' },
      { text: '😎 掘金', link: 'https://juejin.cn/user/4466629837071787' },
      { text: '🤣 部落格', link:'/Notes/index'},
      
      {text:'👯‍♂️ 友链',link:'todo.md'}
    ],

  
    socialLinks: [
      { icon: 'gitee', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright @ &&2025",
    },

    // 文章内导航栏标题
    outlineTitle: "导航栏",

  },
  
  
  

})
