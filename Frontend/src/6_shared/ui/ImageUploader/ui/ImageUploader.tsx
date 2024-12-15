import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import { Image } from "../model/type/ImageUploader";

import cls from "./ImageUploader.module.scss";

type Variant = "square" | "round";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  label?: string;
  variant?: Variant;
  src?: Image;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  label = "Drag & Drop a file or click to upload",
  variant = "square",
  src,
}) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      onImageUpload(file);
    },
    [onImageUpload],
  );

  const onFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  const preventDefault = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      document.getElementById("image-input")?.click();
    }
  }, []);

  return (
    <div
      className={classNames(cls.ImageUploader, {}, [cls[variant]])}
      onDrop={onDrop}
      onDragOver={preventDefault}
      onDragEnter={preventDefault}
      onClick={() => document.getElementById("image-input")?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className={cls.input}
        hidden
      />
      {src ? (
        <img src={src as string} alt={t("Preview")} className={cls.preview} />
      ) : (
        <p className={cls.placeholder}>{label}</p>
      )}
    </div>
  );
};

export default memo(ImageUploader);
