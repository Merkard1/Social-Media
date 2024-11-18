import { LangSwitcher } from "@/4_features/LangSwitcher";
import { ThemeSwitcher } from "@/4_features/ThemeSwitcher";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button } from "@/6_shared/ui/Button/Button";
import { VStack } from "@/6_shared/ui/Stack";

import cls from "./SidebarDeprecated.module.scss";

interface SidebarDeprecatedProps {
  className?: string,
  collapsed?: boolean,
  itemsList?: any,
  onToggle: () => void;
}

const SidebarDeprecated = (props : SidebarDeprecatedProps) => {
  const { className, collapsed, itemsList, onToggle } = props;

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },
        [className],
      )}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        // TODO mb change variant
        variant="outline"
        size="l"
        square
      >
        {collapsed ? ">" : "<"}
      </Button>
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  );
};
export default SidebarDeprecated;
