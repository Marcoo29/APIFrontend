export default function RelatedProducts({ related, navigate }) {
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-red-500 mb-2">
          También podría interesarte
        </h2>
        <div className="w-240 h-[2px] bg-gray-200 mx-auto" />
      </div>

      <div className="relative flex items-center">
        <button
          onClick={() =>
            document.getElementById("relatedScroll")?.scrollBy({
              left: -250,
              behavior: "smooth",
            })
          }
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white border rounded p-2 shadow-sm"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        <div
          id="relatedScroll"
          className="flex gap-5 overflow-x-hidden pb-6 px-10 mx-auto"
        >
          {related.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/${p.id}`)}
              className="min-w-[230px] max-w-[230px] bg-white border flex flex-col items-center shadow-sm hover:shadow-md cursor-pointer rounded-md"
            >
              <div className="bg-gray-50 w-full border-b flex items-center justify-center h-[230px] rounded-t-md">
                <img
                  src={
                    p.imageBase64
                      ? `data:image/jpeg;base64,${p.imageBase64}`
                      : "https://via.placeholder.com/230x230?text=Producto"
                  }
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 w-full">
                <p className="font-semibold text-sm mb-3 text-center leading-tight">
                  {p.name.length > 25 ? p.name.slice(0, 25) + "..." : p.name}
                </p>

                <div className="flex justify-center w-full mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${p.id}`);
                    }}
                    className="w-[120px] text-white bg-red-500 hover:bg-red-600 text-xs font-semibold py-2 px-4 rounded-sm"
                  >
                    Ver producto
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            document.getElementById("relatedScroll")?.scrollBy({
              left: 250,
              behavior: "smooth",
            })
          }
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white border rounded p-2 shadow-sm"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
