import Card from "./Card";
import CardList from "./CardList";
import Categories from "./Categories";

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
        <Categories />

        <div className="grid grid-cols-[0.7fr_3fr]">
          <div>asd</div>
          <CardList />
          
          {/*<div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 20 }, (_, i) => (
              <Card key={i} />
            ))}
          </div>*/}
        </div>
      </main>
    </section>
  );
};

export default Home;
