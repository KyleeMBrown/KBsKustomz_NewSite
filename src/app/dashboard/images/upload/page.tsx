import {getImageCount, uploadImage } from '@/ServerActions/Images/images';
import Upload from '@/components/Upload';


const page = async() => {
 //get total image count
  const imageCount:number = await getImageCount();

  return (
    <>
      <Upload imageCount={imageCount} uploadImage={uploadImage} />
    </>
  )
}

export default page