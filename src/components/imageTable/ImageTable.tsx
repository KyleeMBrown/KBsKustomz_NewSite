'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Database } from "@/lib/types/supabaseKbs"
import { Images } from "@/lib/types/Types"

const ImageTable = () => {

    const [data, setData]: [Images[], Dispatch<SetStateAction<Images[]>>] = useState([]);
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
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
    <div className="w-[90%] container mx-auto"><DataTable loading={loading} columns={columns} data={data}/></div>
  )
}

export default ImageTable