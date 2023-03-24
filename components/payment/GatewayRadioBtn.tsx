import Image from "next/image";
import React from "react";

interface GatewayRadioBtnProps {
  id: string;
  title: string;
  name: string;
  logo: string;
}

export default function GatewayRadioBtn({
  id,
  title,
  name,
  logo,
}: GatewayRadioBtnProps) {
  return (
    <div className="flex gap-3 items-center border-2 rounded-md w-32 p-2">
      <input type="radio" name={"gateway"} id={id} value={id} />
      <label htmlFor={id} className="flex gap-2 justify-between flex-1">
        <span>{title}</span>
        <span>
          <Image
            src={logo}
            alt={`${name} logo`}
            width={128}
            height={128}
            className="w-5 h-5"
          />
        </span>
      </label>
    </div>
  );
}
