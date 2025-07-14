// use ? to get the locale string
// use unicode-segmenter or Intl.Segment to split into chars

export const countChars = async (filePath) => {
  const readStream = fs.createReadStream(filePath);

  return Promise((resolve, reject) => {
    return resolve(null);
  });
};
