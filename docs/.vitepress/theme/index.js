import Theme from 'vitepress/theme'
import './style/var.css'
import Home from './home.vue';
import theme from '@huyikai/vitepress-helper/theme/index';

export default {
    extends: theme,
    enhanceApp: ({ app }) => {
        app.component('Home', Home);
    }
};

// export default {
//     ...Theme,
//     // Layout() {
//     //     return h(Theme.Layout, null, {
//     //         "home-features-before": () => h(AnimationTitle),
//     //     });
//     // },
//     enhanceApp({ app }) {
//         // app.component("FreeStyle", FreeStyle);
//      },

// }
