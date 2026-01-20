import Image from "next/image"
const ImagePreview = ({ src, handleDelete}) => {

  return (
    <>
    {/*<div style={{backgroundImage:`url('${src}')`}} className="w-full h-full aspect-square max-[768px]:w-[90%] bg-center bg-contain bg-repeat">
      <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-x-circle-fill mt-[-9] ml-[-8] cursor-pointer" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
      </svg>
  </div>*/}
      <div>

      <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="red" className="bi relative bi-x-circle-fill ml-[0.5em] mb-[-0.9em] cursor-pointer" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
      </svg>
      <center>
      
      <Image className="h-auto w-[90%] z-[-2]" width={400} height={100} alt="Image" src={src} />
        </center>
        </div>
    </>
  )
}

export default ImagePreview