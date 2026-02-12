/**
 * @returns Mobile Only hamburger Nav
 * @used_in @Component/Navbar.tsx
 * @description website navigation menu for mobile only users
 * @screen_size < 786px
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MobileNavbar = (): React.ReactElement => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-black cursor-pointer hover:scale-102 active:scale-100 rounded hidden max-[768px]:block mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            fill="white"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-[.75em] bg-black text-white">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <a href="/">
            <DropdownMenuItem className="cursor-pointer">Home</DropdownMenuItem>
          </a>
          <a href="/services">
            <DropdownMenuItem className="cursor-pointer">
              Services
            </DropdownMenuItem>
          </a>
          <a href="/about">
            <DropdownMenuItem className="cursor-pointer">
              About
            </DropdownMenuItem>
          </a>
          <a href="/#gallery">
            <DropdownMenuItem className="cursor-pointer">
              Gallery
            </DropdownMenuItem>
          </a>
          <a href="/contact">
            <DropdownMenuItem className="cursor-pointer">
              Contact Us
            </DropdownMenuItem>
          </a>

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MobileNavbar;
