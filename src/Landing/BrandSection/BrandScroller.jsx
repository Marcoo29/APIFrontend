import BrandRow from "./BrandRow";

export default function BrandScroller({ brands, reverse }) {
  const fullList = [...brands, ...brands]; // igual que antes

  return (
    <div
      className={`flex items-center gap-12 w-max ${
        reverse ? "animate-scrollReverse" : "animate-scroll"
      }`}
    >
      <BrandRow brands={fullList} />
    </div>
  );
}
