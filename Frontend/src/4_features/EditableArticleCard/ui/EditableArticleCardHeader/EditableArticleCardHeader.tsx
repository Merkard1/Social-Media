import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getArticleUpsertReadOnly,
  updateArticleData,
  saveArticleData,
  articleUpsertActions,
  useGetArticleByIdQuery } from "@/5_entities/Article";
import { getUserAuthData } from "@/5_entities/User";

import { getRouteArticleDetails } from "@/6_shared/const/router";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
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
    const readonly = useSelector(getArticleUpsertReadOnly);
    const canEdit = !id || authData?.id === articleData?.user?.id;

    const onEdit = useCallback(() => {
      dispatch(articleUpsertActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(articleUpsertActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(async () => {
      try {
        let result;
        if (id) {
          result = await dispatch(updateArticleData(id)).unwrap();
        } else {
          result = await dispatch(saveArticleData()).unwrap();
        }

        if (result && result.id) {
          navigate(getRouteArticleDetails(result.id));
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
            <div>
              {readonly ? (
                <Button
                  onClick={onEdit}
                  data-testid="EditableProfileCardHeader.EditButton"
                >
                  {t("Edit")}
                </Button>
              ) : (
                <HStack gap="16">
                  {id && (
                    <Button
                      onClick={onCancelEdit}
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
            </div>
          )}
        </HStack>
      </Card>
    );
  },
);
