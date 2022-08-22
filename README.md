# 杂项工具

browsers：

- `attachMousewheel`: (target: HTMLElement, callback: Function) => void;
- `clipboardCopy`: (text: any, callback: any) => void;
- `closest`: (element: Element, selector: string) => Function;
- `delegateEvent`: (elements: HTMLElement | string, selector: string, type: string, callback: Function, useCapture: boolean) => void;
- `download`: (data: any, filename: any, gcTimeout: any) => void;
- `elementMatches`: (element: Element, selector: string) => boolean;
- `getCurrentScript`: () => HTMLOrSVGScriptElement | null;
- `getElementPath`: (element: any) => any;
- `lastSeconds`: () => (stop: any) => number;
- `loadCss`: (url: any, callback: any) => void;
- `loadScript`: (url: any, callback: any) => void;
- `replaceStateWith`: (params: StringifiableRecord) => boolean;
- `scrollIntoView`: (element: any, compensation: any) => void;
- `sendBeacon`: (targetUrl: any, content: any) => boolean | undefined;

---

> 谨慎使用
