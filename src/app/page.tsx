/********************************************************************/
/***************** HOME PAGE of KB's Kustomz Website ****************/
/********************************************************************/

import Gallery from "@/Sections/Home/Gallery";
import Hero from "../Sections/Home/Hero";
import { getImageCount } from "@/ServerActions/Images/images";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page ?? 0);

  const count = await getImageCount();

  return (
    <div>
      <Hero />
      <Gallery count={count} page={page} />
    </div>
  );
}
