"use client";

/**
 * @returns Header 
 * @used_in / -> layout.tsx
 * CLIENT COMPONENT
 */

import Link from "next/link";
import Navbar from "@/Components/Navbar"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/Styling configs/utils";

const Header = () => {
  const pathname = usePathname();
  const protectedRoutes = ["/auth", "/dashboard"];
  const hideHeader = protectedRoutes.some((path) => pathname.startsWith(path));

  return (
    <header className={cn(hideHeader && "hidden")}>
      {/* Header Top */}
      <div className="w-full h-[3em] bg-black flex justify-end items-center p-4">
        <Link
          href="tel: 815-751-7039"
          className="flex items-center text-white gap-2 mr-9 max-[768px]:mr-1"
        >
          <Image
            alt="phone icon"
            src="/icons/icons8-phone.png"
            width={20}
            height={20}
            className="cursor-pointer hover:scale-104 active:scale-100"
            loading="eager"
          />
          815-751-7039
        </Link>
      </div>
      {/* Header Bottom -> Navigation Bar */}
      <Navbar />

      {/* LOGO */}
      <Link href="/">
        <Image
          alt="KB's Kustomz Logo"
          src="/images/logo.png"
          width={120}
          height={120}
          className="cursor-pointer hover:scale-103 active:scale-100 absolute top-0"
          loading="eager"
          preload={true}
        />
      </Link>
    </header>
  );
};

export default Header;
