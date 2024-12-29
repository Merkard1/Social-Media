import { memo } from "react";

import { ArticleViewSelector } from "@/4_features/ArticleViewSelector";

import { useArticleFilters } from "@/5_entities/Article";

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
  (props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { view, onChangeView } = useArticleFilters();

    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  },
);
