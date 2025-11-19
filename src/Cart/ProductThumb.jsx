import { useEffect, useState } from "react";

const imageCache = new Map();

export default function ProductThumb({ id, name, fallbackImage }) {
  const [src, setSrc] = useState(imageCache.get(id) || null);

  useEffect(() => {
    let active = true;

    if (imageCache.has(id)) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:4002/images?id=${id}`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        if (active && data?.file) {
          const img = `data:image/jpeg;base64,${data.file}`;
          imageCache.set(id, img);
          setSrc(img);
        }
      } catch {
        const fb = fallbackImage || "/default-product.png";
        imageCache.set(id, fb);
        if (active) setSrc(fb);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, fallbackImage]);

  return (
    <img
      src={src || fallbackImage || "/default-product.png"}
      alt={name}
      className="h-16 w-16 object-cover rounded-md border border-gray-300 bg-white"
      onError={(e) => (e.currentTarget.src = "/default-product.png")}
    />
  );
}
