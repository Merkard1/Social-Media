import { memo } from "react";
import { useParams } from "react-router-dom";

import { Page } from "@/3_widgets/Page";

import { EditableArticleCard } from "@/4_features/EditableArticleCard";

import { VStack } from "@/6_shared/ui/Stack";

interface ArticlePageProps {
 className?: string
}

const ArticlePage = (props : ArticlePageProps) => {
  const { className } = props;

  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid="ArticlePage">
      <VStack gap="16" max>
        <EditableArticleCard id={id} />
      </VStack>
    </Page>
  );
};

export default memo(ArticlePage);
