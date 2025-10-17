const Card = ({ id, title, price, image }) => {
  return (
    <div className="overflow-x-auto">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href={`/products/${id}`}>
          <img
            className="p-8 rounded-t-lg"
            src={image || "https://via.placeholder.com/150"}
            alt={title || "Producto"}
          />
        </a>
        <div className="px-5 pb-5">
          <a href={`/products/${id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {title || "Producto de ejemplo"}
            </h5>
          </a>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${price ?? "0"}
            </span>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
