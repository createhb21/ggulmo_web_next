import type { NextRouter } from "next/router";

import { PATH } from "@/constants";

export class PathStorage {
  private _key: string;

  constructor(key: string) {
    this._key = key;
  }

  static isNextRouter = (router: NextRouter | string): router is NextRouter => {
    return (router as NextRouter).pathname !== undefined;
  };

  get key() {
    return this._key;
  }

  getPath() {
    return globalThis?.sessionStorage.getItem(this.key) ?? PATH.root;
  }

  setPath(path: string) {
    globalThis?.sessionStorage.setItem(this._key, path);
  }

  clearPath() {
    globalThis?.sessionStorage.removeItem(this.key);
  }
}
