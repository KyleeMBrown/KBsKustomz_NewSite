import Image from 'next/image'

/**
 * The Services page for KB's Kustomz
 * @description displays the services offered by KB's Kustomz
 * @author Kylee Brown
 */

const page = () => {
    return (
        <>
            {/* Greyscale Image */}
            <div className="w-full h-[85vh] grayscale text-white bg-[url('/images/ServiceBG-min.jpeg')] bg-no-repeat bg-center bg-cover">
                {/*  Gradient Overlay */}    
                <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-31% from-black'>
                    {/* Inner Main Text */}
                    <div className="w-[90%] h-full flex items-start pl-[4em] max-[768px]:pl-0 justify-center flex-col">
                        <h1 className="max-[768px]:w-full max-[768px]:mb-[0.5em] mb-[0.75em] text-4xl font-bold max-[768px]:text-2xl">Custom Paint & Auto Body Services <br></br>Wyanet, IL</h1>
                        <h3 className="max-[768px]:w-full text-lg mb-[0.5em]">Restoring Quality. Elevating Style</h3>

                        <p className="w-[40%] max-[768px]:w-full text-[0.88em] font-normal">From custom paint to complete body work, KB’s Kustomz delivers clean lines, bold finishes, and quality craftsmanship built to last. Every vehicle is treated with precision and care.</p>
                        <br></br>
                        {/* Service Squares */}
                        <div className='max-[768px]:flex-col flex items-start justify-center gap-4 text-black'>
                            <div className="p-3 hover:scale-104 transition-all ease-in flex flex-col gap-[0.5em] drop-shadow-md items-start justify-center bg-white w-[20em] max-[768px]:w-full">
                                <Image className="max-[768px]:w-[8%]" fetchPriority='high' width={40} height={40} alt="Paint Can" src="/images/paint-bucket.svg"/>
                                <h3 className="font-medium ">Custom Paint</h3>
                                <p className="text-[0.85em] text-gray-700">Custom paint and body work built with <span className="text-black">precision</span>, <span className="text-black">quality</span>, and <span className="text-black">care</span>.</p>
                                <a className="max-[768px]:text-sm cursor-pointer border-2 hover:bg-white hover:text-black active:scale-98 p-2 bg-black text-white rounded mt-2"target="_blank" href="mailto:korybrown24@gmail.com?subject=Book%20a%20service%20|%20 Custom Paint%20|%20KB's%20Kustomz%20Services&body=I%20am%20interested%20in...">Book Now</a>
                            </div>
                            <div className="p-3 hover:scale-104 transition-all ease-in pr-1.5 flex flex-col gap-[0.5em] drop-shadow-md items-start justify-center bg-white w-[20em] max-[768px]:w-full">
                                <Image className="max-[768px]:w-[8%]" fetchPriority='high' width={40} height={40} alt="Paint Can" src="/images/car-front-fill.svg"/>
                                <h3 className="font-medium">Auto Body</h3>
                                <p className="text-[0.85em] text-gray-700">Precision auto body repair focused on <span className="text-black">quality</span>, <span className="text-black">safety</span>, and <span className="text-black">clean</span> results.</p>
                                <a className="max-[768px]:text-sm cursor-pointer border-2 hover:bg-white hover:text-black active:scale-98 p-2 bg-black text-white rounded mt-2" target="_blank" href="mailto:korybrown24@gmail.com?subject=Book%20a%20service%20|%20 Auto Body%20|%20KB's%20Kustomz%20Services&body=I%20am%20interested%20in...">Book Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>     
  )
}

export default page