import { useDispatch } from "react-redux";

import { AppDispatch } from "@/1_app/providers/StoreProvider";

export const useAppDispatch = () => useDispatch<AppDispatch>();
