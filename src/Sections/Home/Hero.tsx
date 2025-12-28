"use client"

const Hero = (): React.JSX.Element => {

  return (
    <div className='w-full h-[85vh] max-[768px]:flex-col text-white flex items-center justify-center'>
          {/* LEFT */}
          <div className='w-[50%] max-[768px]:h-[24em] max-[768px]:w-full flex flex-col items-center justify-center h-full'>
              <h1 className='text-[5.5em] max-[768px]:text-[3em]'>KB's Kustomz</h1>
              <br></br>
              <h2 className='text-[1.75em] max-[768px]:text-[1.5em]'>Custom Paint & Body Shop</h2>
              <br></br>
              <h3 className="text-[1.15em] max-[768px]:text-[1em]">Wyanet, Illinois</h3>
          </div>
           {/* Right */}
           <div className='w-[50%] h-full max-[768px]:w-full flex items-center justify-center'>
          {/* Space for Google Map Embed */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5877.589673270109!2d-89.59097!3d41.387959!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88098fe3e725c8bf%3A0x2ae78e393bcc4d23!2sKB&#39;s%20Kustomz!5e1!3m2!1sen!2sus!4v1766447386026!5m2!1sen!2sus" width="600" height="450" className="rounded-xl max-[768px]:h-[22em] max-[768px]:w-[90%]" loading="lazy"></iframe>        
          </div>
    </div>
  )
}

export default Hero