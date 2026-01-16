
const ImagePreview = ({ src, handleDelete}) => {

  
  
  return (
    <div style={{backgroundImage:`url('${src}')`}} className="max-[768px]:w-full max-[768px]:h-90 w-50 h-50 bg-center bg-cover ml-[1em] mb-[1em] mr-[1em] rounded-2xl">
      <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" className="bi bi-x-circle-fill mt-[-9] ml-[-1em] cursor-pointer" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
      </svg>
    </div>
  )
}

export default ImagePreview