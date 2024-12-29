import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { commentReducer,
  getAddCommentContent,
  getAddCommentFormError,
  commentFormActions } from "@/5_entities/Comment";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button } from "@/6_shared/ui/Button/Button";
import { Card } from "@/6_shared/ui/Card/Card";
import { Input } from "@/6_shared/ui/Input/Input";
import { HStack } from "@/6_shared/ui/Stack";

import cls from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  comment: commentReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation("article-details");
  const content = useSelector(getAddCommentContent);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(commentFormActions.setContent(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(content || "");
    onCommentTextChange("");
  }, [onCommentTextChange, onSendComment, content]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Card padding="24" border="partial" max>
        <HStack
          data-testid="AddCommentForm"
          justify="between"
          max
          gap="16"
          className={classNames(
            cls.AddCommentFormRedesigned,
            {},
            [className],
          )}
        >
          <Input
            className={cls.input}
            placeholder={t("Enter your comment")}
            value={content}
            data-testid="AddCommentForm.Input"
            onChange={onCommentTextChange}
          />
          <Button
            data-testid="AddCommentForm.Button"
            onClick={onSendHandler}
          >
            {t("Send")}
          </Button>
        </HStack>
      </Card>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
