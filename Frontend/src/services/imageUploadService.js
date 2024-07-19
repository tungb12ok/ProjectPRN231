import { storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (file) => {
  if (!file) throw new Error('No file provided for upload');

  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  return url;
};

