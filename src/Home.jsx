import Card from './Card';

const Home = () => {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark"
      id="home"
    >
      {/* HEADER */}
      <header className="sticky top-0 z-10 w-full border-b border-primary/20 bg-background-light/80 dark:border-primary/30 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <a
              className="flex items-center gap-3 text-xl font-bold text-[#221010] dark:text-[#f8f5f5]"
              href="#"
            ></a>
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

        <Card />
      </main>
    </section>
  );
}

        export default Home;
