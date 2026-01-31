import Image from "next/image"

/**
 * The Contact page for KB's Kustomz
 * @author Kylee Brown
 */

const page = () => {
  return (
    <div className="w-full text-white h-[85vh] max-[768px]:h-auto max-[768px]:mt-8 max-[768px]:mb-8 max-[768px]:flex-col flex items-center justify-center bg-black">
      <div className="w-[50%] max-[768px]:w-full gap-[1em] flex flex-col items-center justify-center">
        <div className="w-[80%]" >
        <h1 className=" w-full max-[768px]:mb-[0.15em] mb-[0.25em] text-[2.55em] font-bold max-[768px]:text-2xl">Contact KB's Kustomz <br></br>Wyanet, IL</h1>
        <p className=" font-light max-[768px]:mb-[0.5em] mb-[0.75em]">Contact KB’s Kustomz, your local custom paint and auto body shop in Wyanet, IL, to get started on your next project. Call or email today for a free quote</p>
        </div>
        {/* Contact Button 2 Stack */}
        <a target="_blank" href="mailto:korybrown24@gmail.com?subject=Contact%20Us%20|%20KB's%20Kustomz" className="bg-white hover:border transition-all ease-in duration-[0.25s] hover:text-white hover:bg-transparent cursor-pointer rounded text-black w-[80%] h-[4em] flex items-center justify-between p-[1.5em]">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
          </svg>
          <h2 className="text-xl font-semibold">Email</h2>
        </a>
        <a href="tel:8157517039" className="bg-white transition-all ease-in duration-[0.25s] hover:border hover:text-white hover:bg-transparent cursor-pointer rounded text-black w-[80%] h-[4em] flex items-center justify-between p-[1.5em]">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
        </svg>
          <h2 className="text-xl font-semibold">Call Us</h2>
        </a>
      </div>
      <div className="w-[50%] max-[768px]:w-full max-[768px]:mt-[1em] flex items-center justify-center">
        <div className="max-[768px]:w-[80%]">
          <h2 className="text-2xl font-semibold mb-3">Wanna chat in person?</h2>
  
          <div className="flex items-center justify-start gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="" fill="white" viewBox="0 0 30 30" width="20px" height="20px">
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z" />
            </svg>
            <a href="/about"><h4 className="text-sm font-extralight cursor-pointer">Monday-Friday, 8am-5pm (CST)</h4></a>
          </div>
          <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-car-front" viewBox="0 0 16 16">
            <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276"/>
            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z"/>
          </svg>
            <a href="https://www.google.com/maps/place/KB's+Kustomz/@41.388281,-89.5942745,1350m/data=!3m1!1e3!4m6!3m5!1s0x88098fe3e725c8bf:0x2ae78e393bcc4d23!8m2!3d41.3879585!4d-89.5909702!16s%2Fg%2F11y522h0mc?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"><h4 className="text-sm font-extralight cursor-pointer">13845 1650 North Ave Wyanet, IL 61379</h4></a>
          </div>
          <br></br>
          <a href="https://www.google.com/maps/place/KB's+Kustomz/@41.388281,-89.5942745,1350m/data=!3m1!1e3!4m6!3m5!1s0x88098fe3e725c8bf:0x2ae78e393bcc4d23!8m2!3d41.3879585!4d-89.5909702!16s%2Fg%2F11y522h0mc?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D" className="max-[768px]:hidden"><Image fetchPriority="high" className="grayscale-100 rounded-sm " width={500} height={500} alt="KB's Kustomz Map" loading="eager" src="/images/map.jpg"/></a>
        </div>
      </div> 
    </div>
  )
}

export default page