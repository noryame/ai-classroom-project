export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-800 bg-slate-950">

      <h1 className="text-3xl font-bold text-cyan-400">
        AI Classroom
      </h1>

      <div className="flex gap-4">

        <button className="bg-cyan-500 px-5 py-2 rounded-xl text-black font-bold">
          Login
        </button>

        <button className="border border-cyan-500 px-5 py-2 rounded-xl">
          Dashboard
        </button>

      </div>

    </nav>
  );
}