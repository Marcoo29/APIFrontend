const Categories = () => {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        Performance Parts
      </h1>
      <div className="flex flex-wrap gap-2">
        <div>
          <button className="flex flex-row px-3 py-3 mb-1 bg-white-200 border rounded-full border-gray-200 hover:bg-gray-500 hover:scale-105">
            <img
              className="w-24 h-24 object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/037/073/074/small_2x/ai-generated-stack-of-black-car-tires-arranged-artistically-against-a-transparent-background-created-with-generative-ai-technology-png.png"
            ></img>
          </button>
          <span className="mt-2 font-medium">NEUMÁTICOS</span>
        </div>

        <div>
          <button className="flex flex-row px-3 py-3 mb-1 bg-white-200 border rounded-full border-gray-200 hover:bg-gray-500 hover:scale-105">
            <img
              className="w-24 h-24 object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/044/249/361/small_2x/side-rear-view-mirror-on-a-car-transparent-background-png.png"
            ></img>
          </button>
          <span className="mt-2 font-medium">ESPEJOS</span>
        </div>

        <div>
          <button className="flex flex-row px-3 py-3 mb-1 bg-white-200 border rounded-full border-gray-200 hover:bg-gray-500 hover:scale-105">
            <img
              className="w-24 h-24 object-contain"
              src="https://png.pngtree.com/png-vector/20230912/ourmid/pngtree-engine-oil-filter-isolated-parts-png-image_9392138.png"
            ></img>
          </button>
          <span className="mt-2 font-medium">FILTROS</span>
        </div>
        <div>
          <button className="flex flex-row px-3 py-3 mb-1 bg-white-200 border rounded-full border-gray-200 hover:bg-gray-500 hover:scale-105">
            <img
              className="w-24 h-24 object-contain"
              src="https://static.vecteezy.com/system/resources/previews/009/380/198/non_2x/start-and-stop-engine-button-clipart-design-illustration-free-png.png"
            ></img>
          </button>
          <span className="mt-2 font-medium">ENCENDIDO</span>
        </div>
        <div>
          <button className="flex flex-row px-3 py-3 mb-1 bg-white-200 border rounded-full border-gray-200 hover:bg-gray-500 hover:scale-105">
            <img
              className="w-24 h-24 object-contain"
              src="https://png.pngtree.com/png-clipart/20250101/original/pngtree-car-headlight-with-reflector-isolated-on-white-background-designed-for-efficient-png-image_18463175.png"
            ></img>
          </button>
          <span className="mt-2 font-medium">ILUMINACIÓN</span>
        </div>
      </div>
    </div>
  );
};

export default Categories;
