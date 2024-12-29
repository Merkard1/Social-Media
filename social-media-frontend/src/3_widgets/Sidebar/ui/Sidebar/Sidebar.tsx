import { memo, useMemo, useState } from "react";

import { LangSwitcher } from "@/4_features/LangSwitcher";
import { ThemeSwitcher } from "@/4_features/ThemeSwitcher";

import ArrowIcon from "@/6_shared/assets/icons/arrow-bottom.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import useMediaQuery from "@/6_shared/lib/hooks/useMedia/useMedia";
import { AppLogo } from "@/6_shared/ui/AppLogo/AppLogo";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { VStack } from "@/6_shared/ui/Stack";

import { useSidebarItems } from "../../model/selectors/getSidebarItems/getSidebarItems";
import { SidebarItem } from "../SidebarItem/SidebarItem";

import cls from "./Sidebar.module.scss";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const isBelowLargeScreen = useMediaQuery("(max-width: 1200px)");
  const [collapsed, setCollapsed] = useState(true);
  const sidebarItemsList = useSidebarItems();

  useInitialEffect(() => {
    if (isBelowLargeScreen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  });

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem
          item={item}
          collapsed={collapsed}
          key={item.path}
        />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },
        [className],
      )}
    >
      <AppLogo
        size={collapsed ? 30 : 50}
        className={cls.appLogo}
      />
      <VStack
        role="navigation" gap="8" className={cls.items} align="center"
        max
      >
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  );
});
