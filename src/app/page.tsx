/********************************************************************/
/***************** HOME PAGE of KB's Kustomz Website ****************/
/********************************************************************/

import Gallery from "@/Sections/Home/Gallery";
import Hero from "../Sections/Home/Hero";
import { getImageCount } from "@/ServerActions/Images/images";

export default async function Home({ searchParams }) {
  const params = await searchParams

  const page = Number(await params?.page ?? 0)

  const response = await fetch(`${process.env.HOST}/api/images/?page=${page}`,
  {
    next:{tags:["images"]}
    }
  )

  const {images} = await response.json()
  const count = await getImageCount()

  return (
    <div>
      <Hero />
      <Gallery images={images} count={count} />
    </div>
  );
}
