"use client";

import { useRef, useEffect, useState } from "react";

type NavId = "home" | "create" | "analytics" | "transactions" | "profile" | "";

interface IconButtonProps {
  children: React.ReactNode;
  iconName: NavId;
  text: string;
  color?: string;
  className?: string;
  spanClass?: string;
  activeNav?: NavId;
  handleNav: (setActiveNav: NavId) => void;
}

export default function IconButton({
  children,
  iconName = "home",
  text,
  color,
  className,
  spanClass,
  handleNav,
  activeNav = "home",
  ...props
}: IconButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (activeNav === iconName && activeNav !== "" && ref.current) {
      setWidth(ref.current.offsetWidth + 30);
    } else {
      setWidth(0);
    }
  }, [activeNav, iconName]);

  return (
    <button
      onClick={() => handleNav(iconName)}
      className={`
        flex m-1 p-2 items-center align-middle rounded-full text-white ${
          activeNav === iconName && activeNav !== ""
            ? "bg-appbar-blue"
            : color || "bg-appbar-secondary"
        } ${className}
      `}
      {...props}
    >
      {children}
      <div
        style={{
          width,
          height: "30px",
          transition: "width 0.3s ease-in-out",
        }}
        className="overflow-x-hidden bg-appbar-blue"
      >
        <span ref={ref} className={`px-0.5 ${spanClass}`}>
          {text}
        </span>
      </div>
    </button>
  );
}
