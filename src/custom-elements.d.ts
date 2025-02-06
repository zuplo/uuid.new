/// <reference types="react" />

type ZuploBannerElement = HTMLElement & {
  mode?: "dark" | "light";
};

declare module "react" {
  interface HTMLElementTagNameMap {
    "zuplo-banner": ZuploBannerElement;
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "zuplo-banner": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        ZuploBannerElement
      > & {
        mode?: "dark" | "light";
      };
    }
  }
}

export {};
