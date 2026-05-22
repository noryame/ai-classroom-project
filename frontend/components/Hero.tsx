export default function Hero() {

  return (
    <section className="flex flex-col justify-center items-center text-center h-[85vh] px-6">

      <h1 className="text-7xl font-bold max-w-5xl leading-tight">

        Future Of Education With

        <span className="text-cyan-400">
          {" "}AI
        </span>

      </h1>

      <p className="text-slate-400 text-2xl mt-8 max-w-3xl">
        Smart classroom management powered by artificial intelligence.
      </p>

      <div className="flex gap-6 mt-10">

        <button className="bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 rounded-2xl text-black font-bold text-xl">
          Get Started
        </button>

        <button className="border border-slate-700 px-8 py-4 rounded-2xl text-xl">
          Learn More
        </button>

      </div>

    </section>
  );
}