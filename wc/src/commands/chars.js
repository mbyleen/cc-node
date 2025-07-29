import fs from "fs";

// This implementation does not respect the system locale
const isHighSurrogate = (char) => /[\uD800-\uDBFF]/.test(char);
const isLowSurrogate = (char) => /[\uDC00-\uDFFF]/.test(char);

const countCodePoints = (str) => {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];

    if (isHighSurrogate(currentChar)) {
      const isLastChar = i === str.length - 1;
      const nextChar = str[i + 1];

      // Check for an unpaired UTF-16 surrogate at the end of the input string
      if (isLastChar) {
        count += 1;
        break;
      }

      // Skip the second code point of a UTF-16 surrogate pair
      if (isLowSurrogate(nextChar)) {
        i += 1;
        count += 1;
      }
    } else {
      count += 1;
    }
  }
  return count;
};

export const countChars = async (filePath) => {
  const readStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    let characters = 0;

    readStream.on("data", (chunk) => {
      characters += countCodePoints(chunk.toString());
    });

    readStream.on("end", () => {
      resolve(characters);
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
};
