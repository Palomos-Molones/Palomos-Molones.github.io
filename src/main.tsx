import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const agents = [
  { name: "Merge Prophet", task: "rebasing moon dust", x: "8%", y: "18%", delay: "0s" },
  { name: "CI Goblet", task: "drinking failed builds", x: "74%", y: "12%", delay: "-3s" },
  { name: "Pixel Oracle", task: "shouting at gradients", x: "82%", y: "62%", delay: "-6s" },
  { name: "Winged Linter", task: "sorting chaos alphabetically", x: "18%", y: "76%", delay: "-9s" },
  { name: "Docs Mirage", task: "documenting tomorrow", x: "48%", y: "82%", delay: "-12s" },
];

const telemetry = [
  ["PRs in orbit", "47"],
  ["Hotfix velocity", "1.21GW"],
  ["Pigeon consensus", "unstable"],
  ["Deploy mood", "luminous"],
];

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">
      <section className="relative min-h-screen isolate flex items-center">
        <img
          src="/palomos-chaos.png"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.1),rgba(5,5,7,0.72)_48%,rgba(5,5,7,0.96)_100%)]" />
        <div className="scanlines absolute inset-0 -z-10 opacity-35" />

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(340px,0.72fr)] lg:items-center">
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="signal bg-lime-300 text-black">ORG ONLINE</span>
              <span className="signal border-cyan-300/50 bg-cyan-300/10 text-cyan-100">TEAM ROCKET</span>
              <span className="signal border-pink-300/50 bg-pink-300/10 text-pink-100">REACT 19</span>
            </div>

            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.86] tracking-normal sm:text-7xl lg:text-8xl">
              Palomos
              <span className="block text-lime-300">Molones</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-7 text-zinc-100 sm:text-xl">
              A GitHub-native lab for agents, humans, questionable automations, and pull requests with afterburners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="command command-primary" href="https://github.com/Palomos-Molones">
                Open GitHub
              </a>
              <a className="command" href="https://github.com/Palomos-Molones/Palomos-Molones.github.io">
                Website repo
              </a>
            </div>
          </div>

          <aside className="control-panel">
            <div className="panel-header">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-lime-300" />
              <span className="ml-auto font-mono text-xs text-zinc-400">/tmp/flightdeck</span>
            </div>
            <div className="grid gap-3">
              {telemetry.map(([label, value]) => (
                <div className="telemetry" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded border border-lime-300/30 bg-black/45 p-3 font-mono text-xs leading-6 text-lime-100">
              <p>$ gh issue comment --body "@WaylonSmithersJr improvise"</p>
              <p className="text-cyan-200">dispatch: accepted by Team Rocket policy</p>
              <p className="text-pink-200">status: probably spectacular</p>
            </div>
          </aside>
        </div>

        <div className="absolute inset-0 -z-0 pointer-events-none">
          {agents.map((agent) => (
            <div
              className="agent"
              key={agent.name}
              style={{ left: agent.x, top: agent.y, animationDelay: agent.delay }}
            >
              <span className="agent-dot" />
              <span className="agent-card">
                <strong>{agent.name}</strong>
                <small>{agent.task}</small>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
