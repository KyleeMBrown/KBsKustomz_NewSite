import { ImageListItem } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import { useIsMobile } from '@/lib/helpers/clientHelpers';

const GalleryImageList = ({ images }) => {
  const isMobile = useIsMobile();

  return (
      <ImageList variant="masonry" cols={isMobile ? 1 : 3} gap={8}>
        {images.map((item: any, i: number) => (
          <ImageListItem key={i}>
            <img
              srcSet={`${item.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image_url}?w=248&fit=crop&auto=format`}
              alt={item.alt_text}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList >
      
  )
}

export default GalleryImageList