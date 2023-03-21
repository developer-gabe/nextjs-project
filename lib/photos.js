import fs from 'fs';
import path from 'path';

const photosDirectory = path.join(process.cwd(), 'pages/photography');

export function getAllPhotoIds() {
  const fileNames = fs.readdirSync(photosDirectory);

  // Remove file extensions and return an array of objects containing the id and file name
  return fileNames.map(fileName => {
    const id = fileName.replace(/\.jpg$/, '');
    return {
      id,
      name: fileName,
    };
  });
}

export function getPhotoData(id) {
  const fullPath = path.join(photosDirectory, `${id}.jpg`);
  const fileName = `${id}.jpg`;

  // Return an object containing the id and file name
  return {
    id,
    name: fileName
  };
}
