import { defineConfig } from 'vitepress'
import vitepressHelper, { config } from '@huyikai/vitepress-helper';
import { defineConfigWithTheme } from 'vitepress';

// vitepress-helper default setting
const vitepressHelperConfig = {
  directory: 'docs',
  collapsible: true
};

const vitepressConfig = {
  title: "我有&&症-blog",
  description: "A-Cool-Blog",
  lastUpdated: true,
  srcDir: '../docs',
  themeConfig: {
    // sidebar: [
    //   {
    //     text: "Leetcode",
    //     items: [{ text: "力扣刷题日记", link: "/leetcode/" },
    //       { text: "c++手撕快排", link: "/leetcode/c++手撕快排" },
    //       { text: "最小代价问题", link: "/leetcode/最小代价问题" },
    //       { text: "LRU", link: "/leetcode/LRU" },],

    //   },
    //   {
    //     text: "开发笔记",
    //     items: [
    //       { text: "Go基本语法", link: "/Learning/Go-base" },

    //     ]
    //   }
    // ],

    logo: '/image.png',

    siteTitle: 'welcome to my blog',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🤡 关于我', link: '/' },
      { text: '😎 掘金', link: 'https://juejin.cn/user/4466629837071787' },
      

      { text: '👯‍♂️ 友链', link: 'todo.md' }
    ],


    socialLinks: [
      { icon: 'gitee', link: 'https://gitee.com/chen-yuki238' },

      {
        icon: 'juejin', link: "https://juejin.cn/user/4466629837071787"
      },
      {
        icon: 'github', link: "https://github.com/"
      }
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

  }
}

export default async () => {
  const vitepressHelperInstance = await vitepressHelper({
    ...vitepressHelperConfig,
    ...vitepressConfig
  });
  return defineConfigWithTheme({
    extends: config,
    ...vitepressHelperInstance
  });
};


// // https://vitepress.dev/reference/site-config
// export default defineConfig({
//   title: "我有&&症-blog",
//   description: "A-Cool-Blog",
//   srcDir: 'src',
//   lastUpdated: true,
//   themeConfig: {
//     // sidebar: [
//     //   {
//     //     text: "Leetcode",
//     //     items: [{ text: "力扣刷题日记", link: "/leetcode/" },
//     //       { text: "c++手撕快排", link: "/leetcode/c++手撕快排" },
//     //       { text: "最小代价问题", link: "/leetcode/最小代价问题" },
//     //       { text: "LRU", link: "/leetcode/LRU" },],
        
//     //   },
//     //   {
//     //     text: "开发笔记",
//     //     items: [
//     //       { text: "Go基本语法", link: "/Learning/Go-base" },
          
//     //     ]
//     //   }
//     // ],

//     logo:'/images/image.png',
    
//     siteTitle: 'welcome to my blog',
//     // https://vitepress.dev/reference/default-theme-config
//     nav: [
//       { text: '🤡 关于我', link: '/' },
//       { text: '😎 掘金', link: 'https://juejin.cn/user/4466629837071787' },
//       { text: '🤣 部落格', link:'/leetcode'},
      
//       {text:'👯‍♂️ 友链',link:'todo.md'}
//     ],

  
//     socialLinks: [
//       { icon: 'gitee', link: 'https://gitee.com/chen-yuki238' },

//       {
//         icon: 'juejin',link:"https://juejin.cn/user/4466629837071787"
//       },
//       {
//         icon: 'github',link:"https://github.com/"
//       }
//     ],

//     search: {
//       provider: 'local'
//     },

//     footer: {
//       message: "Released under the MIT License.",
//       copyright: "Copyright @ &&2025",
//     },

//     // 文章内导航栏标题
//     outlineTitle: "导航栏",

//   },

// })
