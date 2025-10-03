const Card = () => {
  return (
      <div className="overflow-x-auto">
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
              <div className="mt-auto flex flex-col items-center pt-4 space-y-2">
                <span className="text-lg font-bold text-primary">$49.99</span>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/90">
                  <span className="material-symbols-outlined text-xl bg-black">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        );

        }

        
        export default Card;