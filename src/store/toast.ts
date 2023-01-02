import { atom } from "recoil";
import { v1 } from "uuid";

export interface Toast {
  id?: string;
  content: string;
}

const toastState = atom<Toast[]>({
  key: `toastState/${v1()}`,
  default: [],
});

export default toastState;
