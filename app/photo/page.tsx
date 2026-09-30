import PhotoBoard from '@/components/photo/PhotoBoard';
import { photos } from '@/lib/photos';

export const metadata = {
  title: 'Photos | Sean Lai',
  description: 'A corkboard of photos, pinned up as I go.',
};

export default function Page() {
  return <PhotoBoard photos={photos} />;
}
