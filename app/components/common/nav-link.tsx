"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
import type { FC, ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
};
export default NavLink;
