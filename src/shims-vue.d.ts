declare module "*.vue" {
  import { ComponentPublicInstance } from "vue";
  const component: ComponentPublicInstance;
  export default component;
}
