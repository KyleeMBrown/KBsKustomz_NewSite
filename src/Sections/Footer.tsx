"use client";

/**
 * @returns Footer 
 * @used_in / -> layout.tsx
 * CLIENT COMPONENT
 */

import { cn } from "@/Styling configs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const protectedRoutes = ["/auth", "/dashboard"];
  const hideFooter = protectedRoutes.some((path) => pathname.startsWith(path));
  return (
    <div
      className={cn(
        "w-full p-[2em] text-white max-[768px]:h-[9.5em] h-[8em] flex flex-col items-center justify-center  gap-1 border-t border-white bg-black",
        hideFooter && "hidden"
      )}
    >
      <p className="font-extralight max-[350px]:text-[0.85em] max-[380px]:text-[0.85em] max-[768px]:text-center text-[1.05em]">
        <a
          target="_blank"
          href="https://www.google.com/maps/place/KB's+Kustomz/@41.388281,-89.5942745,1350m/data=!3m1!1e3!4m6!3m5!1s0x88098fe3e725c8bf:0x2ae78e393bcc4d23!8m2!3d41.3879585!4d-89.5909702!16s%2Fg%2F11y522h0mc?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
        >
          13845 County Rd 1650 N, Wyanet, IL 61379
        </a>{" "}
        | korybrown24@gmail.com |{" "}
        <Link href="tel:815-751-7039">815-751-7039</Link>
      </p>
      <div className="h-full flex items-center justify-center gap-4 max-[350px]:text-[0.85em]">
        <Link className="hover:scale-102" href="/">
          Home
        </Link>
        <Link className="hover:scale-102" href="/about">
          About
        </Link>
        <Link className="hover:scale-102" href="/services">
          Services
        </Link>
        <Link className="hover:scale-102" href="/contact">
          Contact Us
        </Link>
      </div>
      <a href="/about">
        <div className="flex items-center justify-start gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=""
            fill="white"
            viewBox="0 0 30 30"
            width="12px"
            height="12px"
          >
            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z" />
          </svg>
          <h4 className="text-[.75em] font-extralight cursor-pointer max-[768px]:mb-1">
            Monday-Friday, 8am-5pm (CST)
          </h4>
        </div>
      </a>
      <p className="text-[0.75em] font-thin">
        © 2023 KB’s Kustomz. All rights reserved | Website developed by <a target="blank" className="font-medium underline text-[#ffffffc4]" href="https://www.linkedin.com/in/kylee-brown-7167b9274/">Kylee</a>
      </p>
    </div>
  );
};

export default Footer;
