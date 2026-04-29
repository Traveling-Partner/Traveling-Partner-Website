const CLOUDINARY_HOST = "res.cloudinary.com";

const isCloudinaryUrl = (value: string): boolean => {
  try {
    return new URL(value).hostname === CLOUDINARY_HOST;
  } catch {
    return false;
  }
};

export const optimizeCloudinaryImage = (
  src: string,
  width: number,
  quality = 75
): string => {
  if (!src || !isCloudinaryUrl(src)) return src;
  if (src.includes("/upload/f_auto")) return src;

  const transformation = `f_auto,q_${quality},w_${width},c_limit,dpr_auto`;
  return src.replace("/upload/", `/upload/${transformation}/`);
};

