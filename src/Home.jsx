export default function Home() {
  return (
    <section
      id="catalogo"
      className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-10 w-full border-b border-primary/20 bg-background-light/80 dark:border-primary/30 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <a
              className="flex items-center gap-3 text-xl font-bold text-[#221010] dark:text-[#f8f5f5]"
              href="#"
            >
              <span className="material-symbols-outlined text-primary text-3xl">
                directions_car
              </span>
              SpeedParts
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* FILTROS */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Performance Parts
          </h1>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
              All
            </button>
            <button className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-[#221010] hover:bg-primary/20 dark:bg-primary/20 dark:text-[#f8f5f5] dark:hover:bg-primary/30">
              Engine
            </button>
            <button className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-[#221010] hover:bg-primary/20 dark:bg-primary/20 dark:text-[#f8f5f5] dark:hover:bg-primary/30">
              Suspension
            </button>
            <button className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-[#221010] hover:bg-primary/20 dark:bg-primary/20 dark:text-[#f8f5f5] dark:hover:bg-primary/30">
              Brakes
            </button>
            <button className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-[#221010] hover:bg-primary/20 dark:bg-primary/20 dark:text-[#f8f5f5] dark:hover:bg-primary/30">
              Exhaust
            </button>
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
          {/* EJEMPLO DE PRODUCTO */}
          <div className="group relative flex flex-col overflow-hidden rounded-lg bg-background-light shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-background-dark">
            <div className="relative">
              <div
                className="aspect-square w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAyNDqllY5iqGHfYAPupYmiTc3xtXQKXrH6ukphv183nKM9WL1LGbMHF_8sS1TH_UZjlmPmsbi_LuMurWPPpWWtc3hLHdqnt0hmIAf9o9Bdc2TyMjTY1km0p0xzxPPGgvJaHxV0GGtBAvJIAB4z3b6h6nS6fx_842FiqOWXMk3rHVrPNE-LUdCTb3TJVSYu3O-j2WuVIkGwqPteuDjI9jcra-wQcsR3fyZLfbf8fO9OZdSxLjmhhOzLnRalO0Er0rjgaFaDqmMV8cY")',
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background-light/70 text-[#221010] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-background-dark/70 dark:text-[#f8f5f5]">
                <span className="material-symbols-outlined text-lg">
                  favorite
                </span>
              </button>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-bold">Air Filter</h3>
              <p className="text-sm text-[#221010]/60 dark:text-[#f8f5f5]/60">
                Performance Intake
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-lg font-bold text-primary">$49.99</span>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/90">
                  <span className="material-symbols-outlined text-xl">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
