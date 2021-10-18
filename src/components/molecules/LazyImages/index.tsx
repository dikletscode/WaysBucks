import React, { useCallback, useEffect, useState } from "react";
import { gif, image } from "../../../assets/assetsRegister";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  errorImg?: string;
}

export default ({ src, errorImg, ...props }: ImageProps) => {
  const [imgSrc, setSrc] = useState(gif.spinner || src);
  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || gif.spinner);
  }, [errorImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return <img {...props} alt={imgSrc} src={imgSrc} />;
};
