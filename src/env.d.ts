/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<any, {}, any>;
  export default component;
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  // Only string type here to avoid hard to debug cast problems in your components!
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_BUILD_EPOCH?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Last module patch version validated against: 7.4.4
 */
export as namespace d3;
export const version: string;
export * from "d3-array";
export * from "d3-axis";
export * from "d3-brush";
export * from "d3-chord";
export * from "d3-color";
export * from "d3-contour";
export * from "d3-delaunay";
export * from "d3-dispatch";
export * from "d3-drag";
export * from "d3-dsv";
export * from "d3-ease";
export * from "d3-fetch";
export * from "d3-force";
export * from "d3-format";
export * from "d3-geo";
export * from "d3-hierarchy";
export * from "d3-interpolate";
export * from "d3-path";
export * from "d3-polygon";
export * from "d3-quadtree";
export * from "d3-random";
export * from "d3-scale";
export * from "d3-scale-chromatic";
export * from "d3-selection";
export * from "d3-shape";
export * from "d3-time";
export * from "d3-time-format";
export * from "d3-timer";
export * from "d3-transition";
export * from "d3-zoom";

/**
 * Type definitions for bootstrap 5.1
 */
declare module "bootstrap" {
  export as namespace bootstrap;
  import Alert from "./js/dist/alert";
  import Button from "./js/dist/button";
  import Carousel from "./js/dist/carousel";
  import Collapse from "./js/dist/collapse";
  import Dropdown from "./js/dist/dropdown";
  import Modal from "./js/dist/modal";
  import Offcanvas from "./js/dist/offcanvas";
  import Popover from "./js/dist/popover";
  import ScrollSpy from "./js/dist/scrollspy";
  import Tab from "./js/dist/tab";
  import Toast from "./js/dist/toast";
  import Tooltip from "./js/dist/tooltip";
  declare global {
    interface JQuery {
      alert: Alert.jQueryInterface;
      button: Button.jQueryInterface;
      carousel: Carousel.jQueryInterface;
      collapse: Collapse.jQueryInterface;
      dropdown: Dropdown.jQueryInterface;
      tab: Tab.jQueryInterface;
      modal: Modal.jQueryInterface;
      offcanvas: Offcanvas.jQueryInterface;
      [Popover.NAME]: Popover.jQueryInterface;
      scrollspy: ScrollSpy.jQueryInterface;
      toast: Toast.jQueryInterface;
      [Tooltip.NAME]: Tooltip.jQueryInterface;
    }
    interface Element {
      addEventListener(
        type: Carousel.Events,
        listener: (this: Element, ev: Carousel.Event) => any,
        options?: boolean | AddEventListenerOptions
      ): void;
    }
  }

  export {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    ScrollSpy,
    Tab,
    Toast,
    Tooltip,
  };
}
