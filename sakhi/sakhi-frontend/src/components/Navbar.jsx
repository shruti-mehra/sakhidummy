import { ShieldCheck } from "lucide-react";

function Navbar({ title = "SAKHI" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rose-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="sakhi-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md">
            <ShieldCheck size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-rose-700">{title}</h1>
            <p className="text-xs text-gray-500">Your safety companion</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;