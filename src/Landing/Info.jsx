import React from "react";

const Info = () => {
  return (
    <div className="bg-background-light py-4 mb-2 px-4 shadow-md w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Envío gratis */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              <img
                alt="Camión de entrega"
                className="w-20 h-20 text-gray-500 dark:text-gray-400"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGpyTyus7bPp3AsbLIPkM_WSJM91c5KqVqpD4JB8oY3o_TADR-NKrMxv_EgDkty6PRsRmkrC2Q5QBjr8SICDC060zvYhwqWEdsaiSKcvMWzPQPC7Re6qRuHn2ujwVlWnA32fB3UfkRE-wW3hvsd164380NkgFlktwkiINCoXQCFo1-ROwzdDfRLKNhV9G5mwr6ikZQ_IiiUsVXfpMDp-DPs2e6ve6vkTPTasdeO-z9rsETDHVgrA5fOAzVGfAqu453QH5Z5wqmklk"
              />
            </div>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
              Aprovechá el beneficio del envío gratis
            </h3>
            <p className="text-sm text-subtext-light dark:text-subtext-dark">
              Aplica en compras a partir de $30.000. Sumá todo lo que quieras al carrito.
            </p>
          </div>

          {/* Medio de pago */}
          <div className="flex flex-col items-center text-center border-l border-r border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <img
                alt="Tarjeta de crédito"
                className="w-20 h-20 text-gray-500 dark:text-gray-400"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0qwfbS4_rHOvSp_ddVJar9kj9cQHH_se0UBrl6jBCU8EthgDsT3Tl2jppPO02kUpkNsi2Bh_mYKhWz-coCgXZCNEnQPSVJ2Q8lQhwPbCvm7jo3O1b8YbQlxM4yrMHhqwplt_ROj6dLqA4tjN2_L0yioKjcMmeQAYRT_IgEXXUmd-WCTsx7EEo2NxEK4VY-BXUVnsEjYGb1qNfhKdRtf_Q-I4Jc1tHq38-P1yy_aVKAqalDQttKebOFmTvNx2wIXnIpvNN9i4jrr8"
              />
            </div>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
              Elegí tu medio de pago favorito
            </h3>
            <p className="text-sm text-subtext-light dark:text-subtext-dark">
              Pagá con tarjeta o en efectivo. Tu dinero está protegido con Mercado Pago.
            </p>
          </div>

          {/* Entrega rápida */}
          <div className="flex flex-col items-center text-center ">
            <div className="mb-4">
              <img
                alt="Caja de paquete"
                className="w-20 h-20 text-gray-500 dark:text-gray-400"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTCNA0LCZQ8ToRYaN1zZBLaQmnmxTE4av5zHkpE2DPjgMzlRlyjKmmbWB8b8lgT52avMufeD_URXsFKti8Lf2ledhod3IWYukiGoKbVa41UBeE1ShUPaOeGK3_u3TZsgADOdfx-WQ1TJBHJqAIH1mgW2NZN5Py-3-tDR-VJRxk_ZrvjmDgBPhC55frNJ469kLEc9o90wfj-cze_qUInMIpjUz6kZgPzvEvb-wd4nxV0BFyFcGqjS89lcdCIq-hgQGkFwj4xynOS1g"
              />
            </div>
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
              Recibí tus productos en menos de 48 hs
            </h3>
            <p className="text-sm text-subtext-light dark:text-subtext-dark">
              Tus paquetes están seguros. Tenés el respaldo de los envíos con Mercado Libre.
            </p>
          </div>
        </div>
      </div>

  );
};

export default Info;
