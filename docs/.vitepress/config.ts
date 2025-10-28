import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Artlets Docs',
  
  // Server configuration for production deployments
  vite: {
    server: {
      host: '0.0.0.0',
      port: 8080
    },
    preview: {
      host: '0.0.0.0',
      port: 8080
    }
  },
  
  // Add head configuration for scripts and meta tags
  head: [
    [
      'script',
      {},
      `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/646c6a0774285f0ec46d121c/1h13nsbn0';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`
    ]
  ],
  
  themeConfig: {
    logo: '/logo_purple_transparent.png',
    siteTitle: 'Artlets',
    
    // Navigation bar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/general/getting_started' }
    ],

    // Sidebar configuration
    sidebar: [
      {
        text: 'General',
        items: [
          { text: 'Getting Started', link: '/general/getting_started' },
          { text: 'Compatibility', link: '/general/compatibility' }
        ]
      },
      {
        text: 'Nodes',
        collapsed: false,
        items: [
          { text: 'Math', link: '/nodes/math' },
          { text: 'Channels', link: '/nodes/channels' },
          { text: 'Output', link: '/nodes/output' }
        ]
      },
      {
        text: 'DCC extensions',
        collapsed: true,
        items: [
          { text: 'Blender', link: '/extensions/send_to_artlets_blender' }
        ]
      }
    ],

    // Footer
    footer: {
      copyright: 'Copyright © Shapesquad'
    },

    // Search (local search)
    search: {
      provider: 'local'
    }
  }
})
