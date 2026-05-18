import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="w-full border-b border-gray-200 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">DoFocus</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="hover:text-blue-600 transition-colors"
            >
              Workflow
            </a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">
              Productivity
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition-all cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="px-5 py-2 rounded-xl bg-black text-white hover:scale-105 transition-all shadow-md cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-7 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="inline-block px-4 py-2 rounded-full bg-gray-100 text-sm font-medium mb-6">
            Productivity + Pomodoro Focus System
          </p>

          <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Focus Better.
            <br />
            Complete More.
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            DoFocus helps students and professionals manage tasks, track
            productivity, and stay focused using a clean Pomodoro-based
            workflow.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="px-6 py-3 rounded-2xl bg-black text-white font-medium shadow-lg hover:scale-105 transition-all"
              onClick={() => navigate("/register")}
            >
              Start Focusing
            </button>

            <button className="px-6 py-3 rounded-2xl border border-gray-300 font-medium hover:bg-gray-100 transition-all">
              <a href="#features">Learn More</a>
            </button>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm text-gray-500">
            <div>
              <h3 className="text-2xl font-bold text-black">10K+</h3>
              <p>Focus Sessions</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black">5K+</h3>
              <p>Tasks Completed</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black">99%</h3>
              <p>User Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Hero UI */}
        <div className="relative">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Today's Tasks</h3>
              <span className="text-sm text-green-600 font-semibold">
                Focused
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold">Study DBMS</p>
                  <p className="text-sm text-gray-500">25 min focus session</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-black text-white text-sm">
                  Focus
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold">React Revision</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <span className="text-green-600 font-semibold">✓</span>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold">System Design</p>
                  <p className="text-sm text-gray-500">45 min focus session</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-black text-white text-sm">
                  Focus
                </button>
              </div>
            </div>

            {/* Timer Card */}
            <div className="mt-8 rounded-3xl bg-black text-white p-8 text-center shadow-xl">
              <p className="text-gray-400 text-sm uppercase tracking-wide">
                Current Focus Session
              </p>

              <h2 className="text-6xl font-extrabold mt-4">24:59</h2>

              <div className="mt-6 flex justify-center gap-4">
                <button className="px-5 py-2 rounded-xl bg-white text-black font-medium">
                  Pause
                </button>

                <button className="px-5 py-2 rounded-xl border border-gray-600 hover:bg-gray-800 transition-all">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Features
            </p>
            <h2 className="text-4xl font-bold mt-4">
              Everything You Need To Stay Focused
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-bold mb-6">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Workflow
          </p>

          <h2 className="text-4xl font-bold mt-4">Simple Productivity Flow</h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {["Create Tasks", "Start Focus Session", "Track Productivity"].map(
              (step, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-200 p-10 bg-white shadow-sm"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-6">
                    {index + 1}
                  </div>

                  <h3 className="text-2xl font-bold">{step}</h3>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-black text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">Build Consistency Every Day</h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            Stay disciplined with structured focus sessions and measurable
            productivity tracking.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="border border-gray-800 rounded-3xl p-10">
              <h3 className="text-5xl font-extrabold">25m</h3>
              <p className="mt-4 text-gray-400">Default Pomodoro Timer</p>
            </div>

            <div className="border border-gray-800 rounded-3xl p-10">
              <h3 className="text-5xl font-extrabold">100%</h3>
              <p className="mt-4 text-gray-400">Productivity Tracking</p>
            </div>

            <div className="border border-gray-800 rounded-3xl p-10">
              <h3 className="text-5xl font-extrabold">24/7</h3>
              <p className="mt-4 text-gray-400">Focus Anywhere Anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold leading-tight">
            Start Your Deep Work Journey Today
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Manage tasks, focus deeply, and improve productivity with DoFocus.
          </p>

          <button
            className="mt-10 px-8 py-4 rounded-2xl bg-black text-white font-semibold text-lg hover:scale-105 transition-all shadow-lg cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 DoFocus. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
