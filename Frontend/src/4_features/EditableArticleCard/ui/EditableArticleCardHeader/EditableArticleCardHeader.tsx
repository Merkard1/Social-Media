import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateArticleData,
  saveArticleData,
  articleUpsertActions,
  useGetArticleByIdQuery,
  useDeleteArticleMutation } from "@/5_entities/Article";
import { getUserAuthData } from "@/5_entities/User";

import { getRouteArticleDetails, getRouteArticles } from "@/6_shared/const/router";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/6_shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { HStack } from "@/6_shared/ui/Stack";
import { Text } from "@/6_shared/ui/Text/Text";

interface EditableArticleCardHeaderProps {
  id?: string;
}

export const EditableArticleCardHeader = memo(
  ({ id }: EditableArticleCardHeaderProps) => {
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const title = id ? "Edit article" : "Create new article";

    const {
      data: articleData,
      isLoading,
      error,
    } = useGetArticleByIdQuery({ id: id || "" }, { skip: !id });

    const authData = useSelector(getUserAuthData);
    const canEdit = !id || authData?.id === articleData?.user?.id;

    const [deleteArticle, { isLoading: isDeleting, error: deleteError }] = useDeleteArticleMutation();

    const onCancel = useCallback(() => {
      dispatch(articleUpsertActions.cancelEdit());
      navigate(-1);
    }, [dispatch, navigate]);

    const onDeleteEdit = useCallback(async () => {
      if (!id) {
        alert("Cannot delete an article without an ID.");
        return;
      }
      try {
        const result = await deleteArticle({ id });
        alert("Article deleted successfully.");
        navigate(getRouteArticles());
      } catch (error: any) {
        alert("An error occurred while deleting the article. Please try again.");
      }
    }, [deleteArticle, id, navigate]);

    useInitialEffect(() => {
      if (!canEdit) {
        navigate(-1);
      }
    });

    const onSave = useCallback(async () => {
      try {
        let result;
        if (id) {
          result = await dispatch(updateArticleData(id)).unwrap();
        } else {
          result = await dispatch(saveArticleData()).unwrap();
        }
        console.log(result);
        if (result && result?.id) {
          navigate(getRouteArticleDetails(result.id));
        } else {
          navigate(getRouteArticles());
        }
      } catch (error) {
        console.error(id ? "Failed to update article:" : "Failed to save article:", error);
      }
    }, [dispatch, id, navigate]);

    if (isLoading) {
      return (
        <Card padding="24" max border="partial">
          <Text title={t("Loading article...")} />
        </Card>
      );
    }

    if (error) {
      return (
        <Card padding="16" max border="partial">
          <Text variant="error" title={t("Error loading article")} />
        </Card>
      );
    }

    return (
      <Card padding="16" max border="partial">
        <HStack max justify="between">
          <Text title={t(title)} />
          {canEdit && (
            <HStack gap="16">
              {id && (
                <Button
                  onClick={onDeleteEdit}
                  data-testid="EditableProfileCardHeader.DeleteButton"
                  color="error"
                >
                  {t("Delete Article")}
                </Button>
              )}
              {id && (
                <Button
                  onClick={onCancel}
                  data-testid="EditableProfileCardHeader.CancelButton"
                  color="error"
                >
                  {t("Cancel")}
                </Button>
              )}
              <Button
                onClick={onSave}
                data-testid="EditableProfileCardHeader.SaveButton"
                color="success"
              >
                {t(id ? "Save" : "Create")}
              </Button>
            </HStack>
          )}
        </HStack>
      </Card>
    );
  },
);
