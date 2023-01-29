declare module "*.vue" {
  import { ComponentPublicInstance } from "vue";
  const component: ComponentPublicInstance;
  export default component;
}

declare module "*.module.css" {
  type IClassNames = {
    [className: string]: string;
  };
  const classNames: IClassNames;
  export = classNames;
}
declare module "*.css" {
  const style: string;
  export = style;
}
