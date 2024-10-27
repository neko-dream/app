import Compressor from "compressorjs";

/**
 * 画像を小さくする
 */
export const fileCompress = (file: File | Blob): Promise<File | Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth: 300,
      maxHeight: 300,
      success(normalizedFile) {
        resolve(normalizedFile);
      },
      error(error) {
        reject(error);
      },
    });
  });
};
