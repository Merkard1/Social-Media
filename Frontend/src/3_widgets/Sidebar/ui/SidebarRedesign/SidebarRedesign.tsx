import { LangSwitcher } from "@/4_features/LangSwitcher";
import { ThemeSwitcher } from "@/4_features/ThemeSwitcher";

import ArrowIcon from "@/6_shared/assets/icons/arrow-bottom.svg";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { AppLogo } from "@/6_shared/ui/AppLogo/AppLogo";
import { Icon } from "@/6_shared/ui/Icon/Icon";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./SidebarRedesign.module.scss";

interface SidebarRedesignProps {
 className?: string,
 collapsed?: boolean,
 itemsList?: any,
 onToggle: () => void;
}

const SidebarRedesign = (props : SidebarRedesignProps) => {
  const { className, collapsed, itemsList, onToggle } = props;

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.SidebarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className],
      )}
    >
      <AppLogo
        size={collapsed ? 30 : 50}
        className={cls.appLogo}
      />
      <VStack role="navigation" gap="8" className={cls.items}>
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
};

export default SidebarRedesign;
