import axios from "axios";

import { LOCAL_STORAGE_USER } from "@/6_shared/const/localstorage";

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(LOCAL_STORAGE_USER) || "",
  },
});
