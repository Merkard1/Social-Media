import { TypedUseSelectorHook, useSelector } from "react-redux";

import { RootState } from "@/1_app/providers/StoreProvider/config/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
