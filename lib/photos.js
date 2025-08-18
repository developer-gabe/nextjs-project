import fs from 'fs';
import path from 'path';

const photosDirectory = path.join(process.cwd(), 'public/images/gallery');

// Photo metadata
const photoMetadata = {
  "DSC00331": {
    title: "Desert Solitude",
    location: "San Luis Valley, Colorado",
    year: "2023",
    description: "A minimalist landscape capturing the vast emptiness and subtle beauty of Colorado's high desert.",
    category: "Landscape"
  },
  "DSC00075": {
    title: "Mountain Vista",
    location: "Rocky Mountain National Park",
    year: "2023",
    description: "Early morning light illuminates the rugged peaks of the Continental Divide.",
    category: "Landscape"
  },
  "tall": {
    title: "Vertical Ascent",
    location: "Colorado Rockies",
    year: "2023",
    description: "A study in verticality, showcasing the dramatic rise of mountain peaks against the sky.",
    category: "Landscape"
  },
  "rmnp": {
    title: "Alpine Majesty",
    location: "Rocky Mountain National Park",
    year: "2023",
    description: "The raw beauty of the high country, where weather and light create ever-changing scenes.",
    category: "Landscape"
  },
  "DSC00838": {
    title: "Desert Light",
    location: "American Southwest",
    year: "2023",
    description: "Golden hour transforms the desert landscape into a canvas of light and shadow.",
    category: "Landscape"
  },
  "DSC01000": {
    title: "Golden Hour",
    location: "Colorado Front Range",
    year: "2023",
    description: "The last light of day paints the landscape in warm, golden tones.",
    category: "Landscape"
  },
  "DSC01586": {
    title: "Mountain Silhouette",
    location: "Rocky Mountains",
    year: "2023",
    description: "A dramatic interplay of light and shadow defines the mountain ridges at sunset.",
    category: "Landscape"
  }
};

export function getAllPhotoIds() {
  const fileNames = fs.readdirSync(photosDirectory);

  return fileNames.map(fileName => {
    const id = fileName.replace(/\.jpg$/, '');
    return {
      id,
      name: fileName,
      ...photoMetadata[id]
    };
  });
}

export function getPhotoData(id) {
  const fileName = `${id}.jpg`;
  
  return {
    id,
    name: fileName,
    ...photoMetadata[id]
  };
}
