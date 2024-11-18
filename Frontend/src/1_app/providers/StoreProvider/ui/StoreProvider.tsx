import { ReducersMapObject } from "@reduxjs/toolkit";
import { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";

import { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

const StoreProvider = ({
  children,
  initialState,
  asyncReducers,
}: StoreProviderProps) => {
  // const navigate = useNavigate();

  const store = useMemo(() =>
    createReduxStore(
      initialState as StateSchema,
      asyncReducers as ReducersMapObject,
    ), [initialState, asyncReducers]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
