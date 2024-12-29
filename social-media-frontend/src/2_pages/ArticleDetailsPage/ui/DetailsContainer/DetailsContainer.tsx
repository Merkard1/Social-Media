import { memo } from "react";
import { useParams } from "react-router-dom";

import { ArticleDetails } from "@/5_entities/Article";

import { Card } from "@/6_shared/ui/Card/Card";

interface DetailsContainterProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainterProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  return (
    <Card max border="partial" className={className} padding="24">
      <ArticleDetails id={id!} />
    </Card>
  );
});
