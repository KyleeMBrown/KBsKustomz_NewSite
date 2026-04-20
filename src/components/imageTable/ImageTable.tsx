'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Images } from "@/lib/types/Types"
import ModalPopup from "../ModalPopup"
import { Button } from "../ui/button"

const ImageTable = ():React.ReactElement => {

    // handle state of fetched images
    const [data, setData]: [Images[], Dispatch<SetStateAction<Images[]>>] = useState<Images[]>([]);
    // handle the loading state
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    // handle the popup modal state
    const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    // handle the error state
    const [error, setError]:[Error, Dispatch<SetStateAction<Error>>]  = useState(null);
    
    /* Function to fetch images */ 
    const fetchImages = async () => {
        try {
            // start loading
            setLoading(true)
            // fetch the images
            const response = await fetch(`/api/images/?page=-1`,
                {
                    next: {
                        tags: ["images"]
                    }
                })
            // retrieve data from response
            const {images}= await response.json()
            // set the data
            setData(images)
            // stop loading
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setOpen(true)
            setError(err)
            // log error
            console.log(err)
        }
    }

    // useEffect() hook to fetch images on page load
    useEffect(() => {
        // fetch the images
        fetchImages()
    }, [])
    
    return (
      <>
            <div className="w-[90%] container mx-auto bg-[#150a04] max-[768px]:h-screen flex flex-col justify-center">
                <DataTable loading={loading} columns={columns} data={data} refresh={fetchImages} />
            </div>
            {/* Error Popup */}
            <ModalPopup className="bg-white" open={open} setOpen={setOpen} title={<p className="text-red-500">ERROR</p>} description={<span className="text-red-500">{error?.message}</span>} customClose={<Button variant="outline" className="cursor-pointer" onClick={() => { setOpen(false) }}>Close</Button>} />
      </>
  )
}

export default ImageTable