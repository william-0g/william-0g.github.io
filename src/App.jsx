import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Copy, Sparkles } from "lucide-react";

const promptText =
  "Install the skill from {https://github.com/william-0g/0g-poly-skill}. Then, start polymarket-fast-market skill and notify me of any trading activity or changes in open positions and PnL for every 15 minutes.";

function App() {
  const [selectedMode, setSelectedMode] = useState("Human");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy prompt text.", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-[-4rem] h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute bottom-[-5rem] right-[-4rem] h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-fuchsia-100/30 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <nav className="flex items-start justify-start">
          <a
            href="https://0g.ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-purple-200 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to 0G.ai
          </a>
        </nav>

        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center py-12 text-center sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/80 px-4 py-2 text-sm text-purple-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Let your OpenClaw make money autonomously.
          </div>

          <h1 className="mt-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            AI Trading Agent for Polymarket Fast Markets
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
            Deploy autonomous AI trading agents by copying the skill prompt below.
          </p>

          <div className="mt-10 inline-flex rounded-full border border-white/80 bg-white/90 p-1 shadow-md ring-1 ring-purple-100/80 backdrop-blur">
            {["Agent", "Human"].map((mode) => {
              const isActive = selectedMode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedMode(mode)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-white text-gray-500 hover:text-purple-600"
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>

          {selectedMode === "Human" ? (
            <div className="mt-10 w-full rounded-[28px] border border-white/70 bg-white/70 p-4 shadow-md backdrop-blur-sm sm:p-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-left text-sm font-medium text-gray-500">
                  Provide this prompt to your agent:
                </p>

                <div className="mt-4 rounded-xl border border-gray-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <code className="block flex-1 whitespace-pre-wrap break-words pr-0 text-left font-mono text-sm leading-7 text-slate-700 sm:pr-6">
                      {promptText}
                    </code>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-10 w-full max-w-2xl rounded-[28px] border border-white/70 bg-white/75 p-8 shadow-md backdrop-blur-sm">
              <div className="rounded-2xl border border-dashed border-purple-100 bg-gradient-to-br from-white to-purple-50/60 p-8 shadow-sm">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-purple-400">
                  Agent Mode
                </p>
                <p className="mt-4 text-lg font-semibold text-slate-800">
                  Switch back to Human to reveal the installation prompt.
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  This view stays intentionally minimal so the prompt remains the primary action.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
