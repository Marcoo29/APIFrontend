export default function BrandRow({ brands }) {
  return (
    <>
      {brands.map((brand, index) => (
        <img
          key={index}
          src={brand}
          alt="brand"
          className="w-28 h-28 object-contain"
        />
      ))}
    </>
  );
}
