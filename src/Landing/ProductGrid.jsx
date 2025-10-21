const products = [
  {
    title: "CABINA",
    img: "https://cdn-icons-png.flaticon.com/512/3061/3061680.png",
  },
  {
    title: "MOTOR",
    img: "https://cdn-icons-png.flaticon.com/512/2061/2061866.png",
  },
  {
    title: "RODAMIENTOS",
    img: "https://cdn-icons-png.flaticon.com/512/4257/4257495.png",
  },
  {
    title: "SUSPENSIÓN",
    img: "https://cdn-icons-png.flaticon.com/512/739/739299.png",
  },
  {
    title: "DIRECCIÓN",
    img: "https://cdn-icons-png.flaticon.com/512/5447/5447880.png",
  },
  {
    title: "FRENOS",
    img: "https://cdn-icons-png.flaticon.com/512/9819/9819061.png",
  },
];

export default function ProductsGrid() {
  return (
    <section className="bg-[#3b3b3b] text-white py-20 px-6 md:px-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Título en dos renglones */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight text-left leading-tight">
          SOMOS <br />
          ESPECIALISTAS...
        </h2>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-[#555]">
          {products.map((p, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center border border-[#555] py-10 px-6 bg-[#3b3b3b] hover:bg-[#B91C1C] transition-all duration-300 cursor-pointer"
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-16 h-16 mb-5 object-contain filter invert brightness-0 saturate-0 contrast-100"
              />
              <h3 className="text-lg md:text-xl font-bold tracking-wide text-white">
                {p.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
