import Image from "next/image"

/**
 * The About page for KB's Kustomz
 * @author Kylee Brown
 */

const page = () => {
  return (
      <div className="h-[85vh] max-[420px]:h-screen w-full max-[768px]:flex-col flex text-white bg-linear-to-b from-black to-[#292727]">
          <div className="w-[50%] max-[768px]:w-full h-full flex flex-col items-center justify-center p-4 max-[768px]:pb-0">
            <h1 className="w-[80%] max-[768px]:mb-0 mb-[0.75em] text-4xl font-bold max-[768px]:text-2xl">About KB's Kustomz <br></br>Wyanet, IL</h1>
              <p className="text-left w-[80%] font-light text-lg max-[420px]:mt-3"><strong>KB's Kustomz</strong> was established in 2023 by Kory Brown and is located at <a target="_blank" className="underline" href="https://www.google.com/maps/place/KB's+Kustomz/@41.388281,-89.5942745,1350m/data=!3m1!1e3!4m6!3m5!1s0x88098fe3e725c8bf:0x2ae78e393bcc4d23!8m2!3d41.3879585!4d-89.5909702!16s%2Fg%2F11y522h0mc?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D">13845 1650 N Ave in Wyanet, IL</a>.
                  This shop offers Custom Paint and Body Shop Services.
                  <br></br>
                  <br></br>
                  Wondering what KB's Kustomz can do for you? <a href="tel:8157517039">Call for a Free Quote Today!</a>
              </p>
            <div className="flex max-[768px]:hidden items-center w-[80%] max-[768px]:flex-col justify-start gap-[1em] mt-[1.5em]">
                <Image className="rounded drop-shadow-lg" width={250} height={250} fetchPriority="high" src="/images/hat.jpg" alt="KB's Kustomz Custom hat" />
                <Image className="rounded drop-shadow-lg" width={250} height={250} fetchPriority="high" src="/images/shopInside.jpg" alt="KB's Kustomz Custom Shop Inside" />            
            </div>
          </div>
          <div className="w-[50%] max-[768px]:w-full h-full flex flex-col items-center justify-center p-4 max-[768px]:pt-0">
              {/* Hours Table TITLE */}
              <div className="text-center text-lg border w-[80%]">
                 <h2 className="font-normal text-xl p-2 ">Hours</h2>
              </div>
              {/* Hours Table */}
              <table className="w-[80%] text-lg">
                 <tbody>
                  <tr className="bg-[#292727] text-center ">
                      <td className="p-[.75em] font-semibold">
                          Mon-Fri 
                      </td>
                      <td>
                          8am-5pm
                      </td>
                  </tr>
                  <tr className=" text-center ">
                      <td className="p-[.75em] font-semibold">
                          Saturday
                      </td>
                      <td>
                          Closed
                      </td>
                  </tr>
                  <tr className="bg-[#292727] text-center ">
                      <td className="p-[.75em] font-semibold">
                          Sunday
                      </td>
                      <td>
                          Closed
                      </td>
                      </tr>
                </tbody>
              </table>
              <br>
              </br>
            
                <a target="_blank" href="https://www.google.com/maps/place/KB's+Kustomz/@41.388281,-89.5942745,1350m/data=!3m1!1e3!4m6!3m5!1s0x88098fe3e725c8bf:0x2ae78e393bcc4d23!8m2!3d41.3879585!4d-89.5909702!16s%2Fg%2F11y522h0mc?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D" className="border rounded hover:bg-black hover:text-white cursor-pointer w-[80%] flex justify-between items-center p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-sign-merge-right" viewBox="0 0 16 16">
                        <path d="M8.75 6v1q.211.451.588.95c.537.716 1.259 1.44 2.016 2.196l-.708.708-.015-.016c-.652-.652-1.33-1.33-1.881-2.015V12h-1.5V6H6.034a.25.25 0 0 1-.192-.41l1.966-2.36a.25.25 0 0 1 .384 0l1.966 2.36a.25.25 0 0 1-.192.41z"/>
                        <path fillRule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zm-1.4.7a.495.495 0 0 1 .7 0l6.516 6.515a.495.495 0 0 1 0 .7L8.35 14.866a.495.495 0 0 1-.7 0L1.134 8.35a.495.495 0 0 1 0-.7L7.65 1.134Z"/>
                    </svg>
                    <h3>Get Directions</h3>
                </a>
          </div>
      </div>
  )
}

export default page