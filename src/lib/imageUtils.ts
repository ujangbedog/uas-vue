export const isValidImageUrl = async (url: string): Promise<boolean> => {
  try {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }

    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".svg",
      ".bmp",
    ];
    if (imageExtensions.some((ext) => url.toLowerCase().endsWith(ext))) {
      return true;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  } catch (e) {
    return false;
  }
};

export const getImagePlaceholder = (): string => {
  return "/vite.svg";
};
