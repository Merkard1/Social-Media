import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { fetchAllUsersList } from "@/5_entities/User/model/services/fetchAllUsers";
import { usersListActions } from "@/5_entities/User/model/slice/usersListSlice";

import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/6_shared/lib/hooks/useDebounce/useDebounce";
import { Input } from "@/6_shared/ui/Input/Input";

interface UserSearchProps {
  onSearchChange: (isTyping: boolean) => void
}

export const UserSearch = memo((props: UserSearchProps) => {
  const { onSearchChange } = props;
  const { t } = useTranslation("chat");
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    (q: string) => {
      if (q !== "") {
        dispatch(fetchAllUsersList({ q }));
      }
    },
    [dispatch],
  );

  const debounceFetchData = useDebounce(fetchData, 500);

  const setSearch = useCallback(
    (q: string) => {
      dispatch(usersListActions.setQuery(q));
      debounceFetchData(q);
      if (onSearchChange) {
        onSearchChange(!!q);
      }
    },
    [dispatch, debounceFetchData, onSearchChange],
  );

  return (
    <Input
      onChange={(e) => setSearch(e)}
      placeholder={t("Search")}
    />
  );
});
