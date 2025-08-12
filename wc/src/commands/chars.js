import fs from "fs";

const countGraphemesWithLocale = (str, locale) => {
  const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
  let count = 0;
  for (const _ of segmenter.segment(str)) {
    count++;
  }
  return count;
};

const getSystemLocale = () => {
  const locale =
    process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG || "en-US";
  return locale.replace("_", "-");
};

const countWithSystemLocale = (str) => {
  const locale = getSystemLocale().split(".")[0];
  return countGraphemesWithLocale(str, locale);
};

export const countChars = async (filePath) => {
  const readStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    let characters = 0;

    readStream.on("data", (chunk) => {
      characters += countWithSystemLocale(chunk.toString());
    });

    readStream.on("end", () => {
      resolve(characters);
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
};
