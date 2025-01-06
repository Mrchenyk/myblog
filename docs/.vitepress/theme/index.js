
import './style/var.css'
import Home from './home.vue';
import theme from '@huyikai/vitepress-helper/theme/index';
import AnimationTitle from '../components/AnimationTitle.vue';
import RoundImage from '../components/RoundImage.vue';
import Friends from '../components/Friends.vue';



export default {
    extends: theme,
    enhanceApp: ({ app }) => {
        app.component('Home', Home);
        app.component('AnimationTitle', AnimationTitle);
        app.component('RoundImage', RoundImage);
        app.component('Friends',Friends)
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
