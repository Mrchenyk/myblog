// node_modules/@huyikai/vitepress-helper/theme/index.ts
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/fonts.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/vars.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/base.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/icons.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/utils.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/components/custom-block.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/components/vp-code-group.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/components/vp-doc.css";
import "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/styles/components/vp-sponsor.css";
import Layout from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/@huyikai/vitepress-helper/theme/Theme.vue";
import VPBadge from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPBadge.vue";
import { default as default2 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPImage.vue";
import { default as default3 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPButton.vue";
import { default as default4 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPHomeHero.vue";
import { default as default5 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPHomeFeatures.vue";
import { default as default6 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPHomeSponsors.vue";
import { default as default7 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPDocAsideSponsors.vue";
import { default as default8 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPSponsors.vue";
import { default as default9 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPTeamPage.vue";
import { default as default10 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageTitle.vue";
import { default as default11 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPTeamPageSection.vue";
import { default as default12 } from "C:/Users/86186/Desktop/vue-入门/blog/node_modules/vitepress/dist/client/theme-default/components/VPTeamMembers.vue";
import { useSidebar } from "vitepress/dist/client/theme-default/composables/sidebar";
var theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", VPBadge);
  }
};
var theme_default = theme;
export {
  default3 as VPButton,
  default7 as VPDocAsideSponsors,
  default5 as VPHomeFeatures,
  default4 as VPHomeHero,
  default6 as VPHomeSponsors,
  default2 as VPImage,
  default8 as VPSponsors,
  default12 as VPTeamMembers,
  default9 as VPTeamPage,
  default11 as VPTeamPageSection,
  default10 as VPTeamPageTitle,
  theme_default as default,
  useSidebar
};
//# sourceMappingURL=@huyikai_vitepress-helper_theme_index.js.map
