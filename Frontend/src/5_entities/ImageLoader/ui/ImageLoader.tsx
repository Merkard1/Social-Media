import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/6_shared/lib/classNames/classNames";

import cls from "./ImageLoader.module.scss";

type variant = "square" | "round";

interface ImageLoaderProps {
  // TODO
  onImageUpload: any;
  label?: string;
  className?: string;
  variant?: variant;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  onImageUpload,
  label = "Drag & Drop a file or click to upload",
  className,
  variant = "square",
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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const preventDefault = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      document.getElementById("image-input")?.click();
    }
  };

  return (
    <div
      className={classNames(cls.ImageLoader, {}, [cls[variant]])}
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
      {preview ? (
        <img src={preview} alt={t("Preview")} className={cls.preview} />
      ) : (
        <p className={cls.placeholder}>{label}</p>
      )}
    </div>
  );
};

export default memo(ImageLoader);
