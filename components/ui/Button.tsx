"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { initSingleButtonFlair } from "@/lib/buttonFlair";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "dark" | "stroke" | "outline" | "orange" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * Button — Komponen Tombol Tegoer Sapa dengan Efek 3D Timbul & GSAP Hover Flair.
 * Mendukung navigasi Next.js Link atau tombol HTML standar.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  target,
  rel,
  onClick,
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      initSingleButtonFlair(btnRef.current);
    }
  }, []);

  const variantClass = {
    primary: "button--primary",
    dark: "button--dark",
    stroke: "button--stroke",
    outline: "button--outline",
    orange: "button--orange",
    white: "button--white",
  }[variant];

  const sizeClass = {
    sm: "button--sm",
    md: "",
    lg: "button--lg",
  }[size];

  const combinedClass = [
    "button",
    variantClass,
    sizeClass,
    className,
  ].filter(Boolean).join(" ");

  const innerContent = (
    <>
      <span className="button__flair" aria-hidden="true" />
      <span className="button__label">{children}</span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("https://wa.me") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          data-block="button"
          className={combinedClass}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <Link
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-block="button"
        className={combinedClass}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      data-block="button"
      className={combinedClass}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...props}
    >
      {innerContent}
    </button>
  );
}
