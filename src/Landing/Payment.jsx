// Payment.jsx
import React from "react";

const Payment = () => {
  return (
    <div className="bg-background-light py-6 px-4 shadow-md w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-800 dark:text-gray-200">
        {/* Pagá en cuotas */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M22 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414v14c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586h-20c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-14c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h20zm1 8h-22v8c0 .552.448 1 1 1h20c.552 0 1-.448 1-1v-8zm-15 5v1h-5v-1h5zm13-2v1h-3v-1h3zm-10 0v1h-8v-1h8zm-10-6v2h22v-2h-22zm22-1v-2c0-.552-.448-1-1-1h-20c-.552 0-1 .448-1 1v2h22z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base">Pagá en cuotas</h3>
            <a className="text-primary text-sm" href="#">
              Ver promociones bancarias
            </a>
          </div>
        </div>

        {/* Tarjeta de débito */}
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21.5 6c.276 0 .5.224.5.5v11c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-11c0-.276.224-.5.5-.5h19zm2.5 0c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12zm-20 3.78c0-.431.349-.78.78-.78h.427v1.125h-1.207v-.345zm0 .764h1.208v.968h-1.208v-.968zm0 1.388h1.208v1.068h-.428c-.431 0-.78-.349-.78-.78v-.288zm4 .288c0 .431-.349.78-.78.78h-.429v-1.068h1.209v.288zm0-.708h-1.209v-.968h1.209v.968zm0-1.387h-1.629v2.875h-.744v-4h1.593c.431 0 .78.349.78.78v.345zm5.5 2.875c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.484 0 .937.138 1.32.377-.53.552-.856 1.3-.856 2.123 0 .824.326 1.571.856 2.123-.383.239-.836.377-1.32.377zm1.5-2.5c0-1.381 1.12-2.5 2.5-2.5 1.381 0 2.5 1.119 2.5 2.5s-1.119 2.5-2.5 2.5c-1.38 0-2.5-1.119-2.5-2.5zm-8 4.5h-3v1h3v-1zm4 0h-3v1h3v-1zm5 0h-3v1h3v-1zm4 0h-3v1h3v-1z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base">Tarjeta de débito</h3>
            <a className="text-primary text-sm" href="#">
              Ver más
            </a>
          </div>
        </div>

        {/* Efectivo */}
        <div className="flex items-center space-x-4 border-r border-gray-300 dark:border-gray-600 pr-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12.164 7.165c-1.15.191-1.702 1.233-1.231 2.328.498 1.155 1.921 1.895 3.094 1.603 1.039-.257 1.519-1.252 1.069-2.295-.471-1.095-1.784-1.827-2.932-1.636zm1.484 2.998l.104.229-.219.045-.097-.219c-.226.041-.482.035-.719-.027l-.065-.387c.195.03.438.058.623.02l.125-.041c.221-.109.152-.387-.176-.453-.245-.054-.893-.014-1.135-.552-.136-.304-.035-.621.356-.766l-.108-.239.217-.045.104.229c.159-.026.345-.036.563-.017l.087.383c-.17-.021-.353-.041-.512-.008l-.06.016c-.309.082-.21.375.064.446.453.105.994.139 1.208.612.173.385-.028.648-.36.774zm10.312 1.057l-3.766-8.22c-6.178 4.004-13.007-.318-17.951 4.454l3.765 8.22c5.298-4.492 12.519-.238 17.952-4.454zm-2.803-1.852c-.375.521-.653 1.117-.819 1.741-3.593 1.094-7.891-.201-12.018 1.241-.667-.354-1.503-.576-2.189-.556l-1.135-2.487c.432-.525.772-1.325.918-2.094 3.399-1.226 7.652.155 12.198-1.401.521.346 1.13.597 1.73.721l1.315 2.835zm2.843 5.642c-6.857 3.941-12.399-1.424-19.5 5.99l-4.5-9.97 1.402-1.463 3.807 8.406-.002.007c7.445-5.595 11.195-1.176 18.109-4.563.294.648.565 1.332.684 1.593z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base">Efectivo</h3>
            <a className="text-primary text-sm" href="#">
              Ver más
            </a>
          </div>
        </div>

        {/* Más medios de pago */}
        <div className="flex items-center space-x-4 pl-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base">Más medios de pago</h3>
            <a className="text-primary text-sm" href="#">
              Ver todos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
