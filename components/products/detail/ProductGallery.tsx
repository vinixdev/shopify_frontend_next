import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  thumbnail: string;
  gallery: string[];
  alt: string;
}

export default function ProductGallery({
  thumbnail,
  gallery,
  alt,
}: ProductGalleryProps) {
  const [preview, setPreview] = useState<string>(thumbnail);

  const changePreview = (src: string) => setPreview(src);

  return (
    <div className="w-full flex flex-col gap-5 md:gap-2">
      <div className="preview w-full overflow-hidden rounded-md hover:brightness-75 duration-300 transition-all">
        <Image
          className="hover:scale-150 duration-700 transition-all ease-in-out"
          src={preview}
          width={600}
          height={600}
          alt={alt}
        />
      </div>
      <ul className="gallery flex flex-wrap justify-center md:justify-start items-center gap-2 overflow-hidden">
        <li
          onClick={(e: React.MouseEvent) => changePreview(thumbnail)}
          className={`overflow-hidden rounded-md bg-gray-200 cursor-pointer hover:brightness-75 duration-300 transition-all ${
            thumbnail === preview ? "brightness-75" : ""
          }`}
        >
          <Image src={thumbnail} width={75} height={75} alt={alt} />
        </li>
        {gallery.length
          ? gallery.map((img, i) => {
              return (
                <li
                  key={i}
                  className={`overflow-hidden rounded-md bg-gray-200 cursor-pointer hover:brightness-75 duration-300 transition-all ${
                    img === preview ? "brightness-75" : ""
                  }`}
                  onClick={(e: React.MouseEvent) => changePreview(img)}
                >
                  <Image
                    className=""
                    src={img}
                    width={75}
                    height={75}
                    alt={alt}
                  />
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
