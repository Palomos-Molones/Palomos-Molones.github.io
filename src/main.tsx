import { CSSProperties, StrictMode, useEffect, useRef, useState } from "react";
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

type AudioContextWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type CursorTrail = {
  id: number;
  x: number;
  y: number;
  born: number;
  kind: "crumb" | "feather" | "pigeon";
  driftX: number;
  driftY: number;
  angle: number;
  scale: number;
};

const trailKinds: CursorTrail["kind"][] = ["crumb", "feather", "pigeon", "crumb", "feather"];

function playPrruPrru(audioContextRef: React.MutableRefObject<AudioContext | null>) {
  const AudioContextConstructor = window.AudioContext || (window as AudioContextWindow).webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  const context = audioContextRef.current ?? new AudioContextConstructor();
  audioContextRef.current = context;

  if (context.state === "suspended") {
    void context.resume();
  }

  const now = context.currentTime;
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.12, now + 0.025);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
  master.connect(context.destination);

  [0, 0.23].forEach((offset) => {
    const oscillator = context.createOscillator();
    const wobble = context.createOscillator();
    const wobbleGain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(190, now + offset);
    oscillator.frequency.exponentialRampToValueAtTime(132, now + offset + 0.18);

    wobble.type = "sine";
    wobble.frequency.setValueAtTime(28, now + offset);
    wobbleGain.gain.setValueAtTime(18, now + offset);
    wobble.connect(wobbleGain);
    wobbleGain.connect(oscillator.frequency);

    oscillator.connect(master);
    wobble.start(now + offset);
    oscillator.start(now + offset);
    wobble.stop(now + offset + 0.2);
    oscillator.stop(now + offset + 0.2);
  });
}

function PigeonCursor() {
  const [trail, setTrail] = useState<CursorTrail[]>([]);
  const idRef = useRef(0);
  const lastMoveRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) {
        setTrail([]);
      }
    };

    syncReducedMotion();
    motionQuery.addEventListener("change", syncReducedMotion);

    const cleanup = window.setInterval(() => {
      const cutoff = Date.now() - 950;
      setTrail((currentTrail) => currentTrail.filter((particle) => particle.born > cutoff));
    }, 200);

    return () => {
      motionQuery.removeEventListener("change", syncReducedMotion);
      window.clearInterval(cleanup);
      void audioContextRef.current?.close();
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotionRef.current) {
      return;
    }

    const now = Date.now();
    if (now - lastMoveRef.current < 36) {
      return;
    }

    lastMoveRef.current = now;
    const id = idRef.current++;
    const kind = trailKinds[id % trailKinds.length];

    setTrail((currentTrail) => [
      ...currentTrail.slice(-32),
      {
        id,
        kind,
        x: event.clientX,
        y: event.clientY,
        born: now,
        driftX: Math.round((Math.random() * 44 - 22) * 10) / 10,
        driftY: Math.round((Math.random() * -38 - 10) * 10) / 10,
        angle: Math.round(Math.random() * 80 - 40),
        scale: Math.round((0.82 + Math.random() * 0.46) * 100) / 100,
      },
    ]);
  }

  function handleClick() {
    playPrruPrru(audioContextRef);
  }

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#050507] text-white"
      onClickCapture={handleClick}
      onPointerMove={handlePointerMove}
    >
      <div className="pigeon-trail" aria-hidden="true">
        {trail.map((particle) => (
          <span
            className={`trail-particle trail-${particle.kind}`}
            key={particle.id}
            style={
              {
                left: particle.x,
                top: particle.y,
                "--drift-x": `${particle.driftX}px`,
                "--drift-y": `${particle.driftY}px`,
                "--angle": `${particle.angle}deg`,
                "--scale": particle.scale,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <App />
    </main>
  );
}

function App() {
  return (
    <>
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
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PigeonCursor />
  </StrictMode>,
);
