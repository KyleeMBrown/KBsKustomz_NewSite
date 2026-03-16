import { useIsMobile } from '@/lib/helpers/clientHelpers';
import { Images } from '@/lib/types/Types';

const GalleryImageList = ({ images }) => {
  const isMobile = useIsMobile(768);

  return (
    <div
      className={`
        w-full
        columns-1 sm:columns-2 md:columns-3
        gap-2
        mb-[2em]
      `}
    >
      {images.map((item:Images) => (
        <div
          key={item.id}
          className="mb-2 break-inside-avoid"
        >
          <img
            src={item.image_url}
            alt={item.alt_text}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryImageList;