import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1),_transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Header */}
      <header className="w-full border-b border-white/[0.06] sticky top-0 bg-black/60 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm tracking-tight">
              D
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              DoFocus
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#features"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Workflow
            </a>
            <a
              href="#stats"
              className="text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Productivity
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-neutral-200 text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-16 grid lg:grid-cols-2 gap-14 items-center">
        <div className="fade-in-up">
          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium text-neutral-400 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Productivity + Pomodoro Focus System
          </p>

          <h2 className="text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
            Focus Better.
            <br />
            <span className="text-neutral-400">Complete More.</span>
          </h2>

          <p className="mt-6 text-lg text-neutral-400 leading-relaxed max-w-xl">
            DoFocus helps students and professionals manage tasks, track
            productivity, and stay focused using a clean Pomodoro-based
            workflow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="px-5 py-3 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              onClick={() => navigate("/register")}
            >
              Start Focusing
            </button>

            <a
              href="#features"
              className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-neutral-200 font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          <div className="mt-12 flex items-center gap-10 text-sm text-neutral-500">
            <div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                10K+
              </h3>
              <p className="mt-0.5">Focus Sessions</p>
            </div>

            <div className="border-l border-white/10 pl-10">
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                5K+
              </h3>
              <p className="mt-0.5">Tasks Completed</p>
            </div>

            <div className="border-l border-white/10 pl-10">
              <h3 className="text-2xl font-semibold text-white tracking-tight">
                99%
              </h3>
              <p className="mt-0.5">User Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Hero UI mockup */}
        <div className="relative fade-in-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-50 blur-2xl" />
          <div className="relative bg-[#111111] border border-white/[0.08] rounded-3xl p-6 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white tracking-tight">
                Today's Tasks
              </h3>
              <span className="text-xs text-neutral-400 font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Focused
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.05] transition-colors duration-200">
                <div>
                  <p className="font-medium text-white">Study DBMS</p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    25 min focus session
                  </p>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                  Focus
                </button>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.05] transition-colors duration-200">
                <div>
                  <p className="font-medium text-neutral-500 line-through">
                    React Revision
                  </p>
                  <p className="text-sm text-neutral-600 mt-0.5">Completed</p>
                </div>
                <span className="text-neutral-300 font-semibold">✓</span>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.05] transition-colors duration-200">
                <div>
                  <p className="font-medium text-white">System Design</p>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    45 min focus session
                  </p>
                </div>
                <button className="px-3.5 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                  Focus
                </button>
              </div>
            </div>

            {/* Timer Card */}
            <div className="mt-6 rounded-2xl bg-black border border-white/[0.08] p-7 text-center">
              <p className="text-neutral-500 text-[11px] uppercase tracking-[0.18em] font-medium">
                Current Focus Session
              </p>

              <h2 className="text-6xl font-semibold mt-4 text-white tracking-tighter tabular-nums">
                24:59
              </h2>

              <div className="mt-6 flex justify-center gap-2.5">
                <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                  Pause
                </button>

                <button className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-neutral-200 text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24 border-y border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Features
            </p>
            <h2 className="text-4xl font-semibold mt-4 text-white tracking-tight">
              Everything You Need To Stay Focused
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Task Management",
                desc: "Create, edit, delete, and organize your daily tasks efficiently.",
              },
              {
                title: "Pomodoro Timer",
                desc: "Use focused work sessions to improve deep work consistency.",
              },
              {
                title: "Productivity Heatmap",
                desc: "Track your progress and daily productivity visually.",
              },
              {
                title: "Focus Analytics",
                desc: "Monitor completed sessions and study performance.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-[#111111] rounded-2xl p-7 border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] text-white flex items-center justify-center text-base font-semibold mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Workflow
          </p>

          <h2 className="text-4xl font-semibold mt-4 text-white tracking-tight">
            Simple Productivity Flow
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-4">
            {["Create Tasks", "Start Focus Session", "Track Productivity"].map(
              (step, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/[0.06] p-10 bg-[#111111] hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mx-auto rounded-full border border-white/10 bg-white/[0.04] text-white flex items-center justify-center text-xl font-semibold mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    {step}
                  </h3>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats"
        className="py-24 border-y border-white/[0.06] bg-black relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-semibold text-white tracking-tight">
            Build Consistency Every Day
          </h2>

          <p className="mt-6 text-neutral-400 max-w-2xl mx-auto text-lg">
            Stay disciplined with structured focus sessions and measurable
            productivity tracking.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-4">
            <div className="border border-white/[0.08] bg-white/[0.02] rounded-2xl p-10 hover:bg-white/[0.04] transition-colors duration-300">
              <h3 className="text-5xl font-semibold text-white tracking-tight tabular-nums">
                25m
              </h3>
              <p className="mt-4 text-neutral-400">Default Pomodoro Timer</p>
            </div>

            <div className="border border-white/[0.08] bg-white/[0.02] rounded-2xl p-10 hover:bg-white/[0.04] transition-colors duration-300">
              <h3 className="text-5xl font-semibold text-white tracking-tight">
                100%
              </h3>
              <p className="mt-4 text-neutral-400">Productivity Tracking</p>
            </div>

            <div className="border border-white/[0.08] bg-white/[0.02] rounded-2xl p-10 hover:bg-white/[0.04] transition-colors duration-300">
              <h3 className="text-5xl font-semibold text-white tracking-tight">
                24/7
              </h3>
              <p className="mt-4 text-neutral-400">Focus Anywhere Anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-white tracking-tight">
            Start Your Deep Work Journey Today
          </h2>

          <p className="mt-6 text-lg text-neutral-400">
            Manage tasks, focus deeply, and improve productivity with DoFocus.
          </p>

          <button
            className="mt-10 px-7 py-3.5 rounded-xl bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            onClick={() => navigate("/register")}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>© 2026 DoFocus. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
