import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const error = useRouteError();

  const code = error?.status || "404";
  const subtitle =
    error?.statusText || "Sorry, the page you visited does not exist.";

  return (
    <main className="min-h-svh flex justify-center items-center bg-[#0a0a0a] p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md text-center fade-in-up">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
          Error
        </p>
        <h1 className="mt-3 text-[88px] md:text-[112px] leading-none font-semibold text-white tracking-tighter tabular-nums">
          {code}
        </h1>
        <p className="mt-4 text-neutral-400 text-base">{subtitle}</p>

        <div className="mt-8 flex items-center justify-center gap-2.5">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-neutral-200 text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer"
          >
            Go back
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
          >
            Back Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
