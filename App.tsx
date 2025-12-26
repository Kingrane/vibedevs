import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search, Terminal, Hash, Code, Layers, Box, Cpu,
  Activity, Shield, Zap, Globe, Smartphone, Monitor, Command,
  ChevronRight, Disc, AlertCircle, Copy, Check, Maximize2, X, Minimize2
} from 'lucide-react';
import { CategoryType, Prompt } from './types';
import { ALL_PROMPTS, CATEGORIES_LIST } from './data';

// --- SHADER COMPONENT (WebGL) ---
const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false });
    if (!gl) return;

    // Vertex Shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Fragment Shader (Fluid Gradient)
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;

      vec3 col_cream = vec3(0.996, 0.871, 0.561);
      vec3 col_peach = vec3(0.996, 0.663, 0.576);
      vec3 col_grape = vec3(0.451, 0.400, 0.741);
      vec3 col_depth = vec3(0.004, 0.204, 0.227);

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        float t = uTime * 0.2;

        float x = uv.x;
        float y = uv.y;
        
        float v1 = sin(x * 5.0 + t);
        float v2 = cos(y * 4.0 - t * 0.5);
        float v3 = sin((x + y) * 3.0 + t * 0.8);
        
        float pattern = v1 + v2 + v3;
        
        vec3 color = mix(col_depth, col_grape, smoothstep(-2.0, 1.0, pattern));
        color = mix(color, col_peach, smoothstep(0.0, 2.0, pattern * sin(t)));
        color = mix(color, col_cream, smoothstep(1.5, 3.0, pattern));
        
        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        color += noise * 0.05;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const initShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const shaderProgram = gl.createProgram();
    const vs = initShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = initShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!shaderProgram || !vs || !fs) return;

    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    const uTime = gl.getUniformLocation(shaderProgram, 'uTime');
    const uResolution = gl.getUniformLocation(shaderProgram, 'uResolution');

    const startTime = Date.now();

    const render = () => {
      if (!canvas || !gl) return;
      const displayWidth  = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.useProgram(shaderProgram);
      gl.enableVertexAttribArray(vertexPosition);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTime, (Date.now() - startTime) / 1000);
      gl.uniform2f(uResolution, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      gl.deleteProgram(shaderProgram);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

// --- UPDATED ASCII ART ---
const ASCII_LOGO = `
██╗   ██╗██╗██████╗ ███████╗██████╗ ███████╗██╗   ██╗███████╗
██║   ██║██║██╔══██╗██╔════╝██╔══██╗██╔════╝██║   ██║██╔════╝
██║   ██║██║██████╔╝█████╗  ██║  ██║█████╗  ██║   ██║███████╗
╚██╗ ██╔╝██║██╔══██╗██╔══╝  ██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║
 ╚████╔╝ ██║██████╔╝███████╗██████╔╝███████╗ ╚████╔╝ ███████║
  ╚═══╝  ╚═╝╚═════╝ ╚══════╝╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝
`;

const TerminalText: React.FC<{ text: string, delay?: number, speed?: number }> = ({ text, delay = 0, speed = 30 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    let interval: number;
    const timeout = setTimeout(() => {
      interval = window.setInterval(() => {
        setDisplayed(text.slice(0, index + 1));
        index++;
        if (index >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed]);

  return <span>{displayed}</span>;
};

// --- ICONS ---
const CategoryIcon: React.FC<{ category: string, className?: string }> = ({ category, className = "w-4 h-4" }) => {
  switch (category) {
    case CategoryType.WebDesign: return <Monitor className={className} />;
    case CategoryType.WebProgramming: return <Globe className={className} />;
    case CategoryType.Shaders: return <Disc className={className} />;
    case CategoryType.Python: return <Terminal className={className} />;
    case CategoryType.JavaScript: return <Code className={className} />;
    case CategoryType.MachineLearning: return <Cpu className={className} />;
    case CategoryType.GameDev: return <Zap className={className} />;
    case CategoryType.DataScience: return <Activity className={className} />;
    case CategoryType.MobileApps: return <Smartphone className={className} />;
    case CategoryType.Cybersecurity: return <Shield className={className} />;
    case CategoryType.DevOps: return <Layers className={className} />;
    case CategoryType.AITools: return <Box className={className} />;
    default: return <Hash className={className} />;
  }
};

// --- BOOT SEQUENCE ---
const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const bootLines = [
      "INITIALIZING KERNEL...",
      "LOADING SHADER MODULES [OK]",
      "MOUNTING FILE SYSTEM...",
      "CONNECTING TO VIBE_NET...",
      "ESTABLISHING SECURE UPLINK...",
      "LOADING USER PROFILE...",
      "SYSTEM READY."
    ];

    let delay = 0;
    const timeouts: number[] = [];

    bootLines.forEach((line, index) => {
      const t = window.setTimeout(() => {
        if (mountedRef.current) {
          setLines(prev => [...prev, line]);
          if (index === bootLines.length - 1) {
            const completeT = window.setTimeout(() => {
              if (mountedRef.current) onComplete();
            }, 800);
            timeouts.push(completeT);
          }
        }
      }, delay);
      timeouts.push(t);
      delay += Math.random() * 300 + 100;
    });

    return () => {
      mountedRef.current = false;
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
      <div className="fixed inset-0 bg-sys-depth text-sys-cream font-mono z-[100] p-10 flex flex-col justify-end pb-20">
        {lines.map((line, i) => (
            <div key={i} className="text-sm md:text-lg mb-1">
              <span className="text-sys-grape mr-2">root@vibehub:~#</span>
              {line}
            </div>
        ))}
        <div className="animate-cursor-blink w-3 h-5 bg-sys-peach mt-2"></div>
      </div>
  );
};

// --- PROMPT MODAL (POPUP) ---
const PromptModal: React.FC<{ prompt: Prompt, onClose: () => void }> = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sys-black/80 backdrop-blur-md animate-fade-in">
        <div className="w-full max-w-4xl h-[85vh] bg-sys-depth border border-sys-grape shadow-2xl flex flex-col relative overflow-hidden rounded-lg">

          {/* Modal Header (Terminal Bar) */}
          <div className="h-10 bg-sys-black/60 border-b border-sys-grape/40 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"></button>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 font-mono text-xs text-sys-cream/60">vim {prompt.id}.sh</span>
            </div>
            <button onClick={onClose} className="text-sys-grape hover:text-sys-cream transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <CategoryIcon category={prompt.category} className="text-sys-peach w-5 h-5" />
                <span className="font-mono text-sm text-sys-peach uppercase tracking-widest">{prompt.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{prompt.title}</h2>
              <p className="text-sys-cream/70 font-mono leading-relaxed">{prompt.description}</p>

              {/* Tags */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {prompt.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-[10px] font-mono border border-sys-grape/40 rounded text-sys-cream/60 bg-sys-grape/10">
                      #{tag}
                    </span>
                ))}
              </div>
            </div>

            {/* Code Block */}
            <div className="relative group">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={handleCopy}
                    className="bg-sys-peach text-sys-depth font-bold px-4 py-1.5 text-xs font-mono rounded hover:bg-white transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <div className="bg-sys-black/80 border border-sys-grape/30 rounded p-6 overflow-x-auto min-h-[300px]">
                <pre className="font-mono text-sm text-sys-cream/90 leading-6 whitespace-pre-wrap">{prompt.code}</pre>
              </div>
            </div>
          </div>

          {/* Vim Status Bar */}
          <div className="h-6 bg-sys-grape/20 text-sys-cream/60 text-[10px] font-mono flex items-center px-4 justify-between select-none">
            <span>NORMAL MODE</span>
            <span>Ln 1, Col 1</span>
          </div>

        </div>
      </div>
  );
};


// --- PROMPT COMPONENT ---
const TerminalPromptCard: React.FC<{ prompt: Prompt, onOpen: (p: Prompt) => void }> = ({ prompt, onOpen }) => {
  return (
      <div
          onClick={() => onOpen(prompt)}
          className="group relative border border-sys-grape/30 bg-sys-depth/80 hover:bg-sys-depth hover:border-sys-cream/50 transition-all duration-200 flex flex-col overflow-hidden cursor-pointer h-full"
      >
        {/* Header Bar */}
        <div className="bg-sys-black/40 border-b border-sys-grape/30 p-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sys-peach/50 group-hover:bg-sys-peach"></div>
            <span className="font-mono text-xs text-sys-cream/70 uppercase tracking-widest">{prompt.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize2 className="w-3 h-3 text-sys-grape group-hover:text-sys-cream" />
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col relative">
          <h3 className="text-lg md:text-xl font-bold font-sans text-white mb-2 group-hover:text-sys-cream transition-colors line-clamp-2">
            {prompt.title}
          </h3>
          <p className="text-sm font-mono text-sys-cream/60 mb-4 leading-relaxed line-clamp-2">
            {prompt.description}
          </p>

          {/* Code Preview Area (Truncated) */}
          <div className="relative mt-auto">
            <div className="bg-sys-black/60 border-l-2 border-sys-grape/50 p-3 font-mono text-xs text-sys-cream/80 overflow-hidden h-28 relative mt-2 group-hover:border-sys-peach transition-colors">
              {/* Gradient Fade for overflow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sys-black/90 pointer-events-none flex items-end justify-center pb-2">
               <span className="text-[10px] text-sys-grape uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 [CLICK TO EXPAND]
               </span>
              </div>
              <pre className="whitespace-pre-wrap font-mono opacity-70">{prompt.code.slice(0, 300)}...</pre>
            </div>
          </div>
        </div>
      </div>
  );
};

// --- MAIN APP ---
const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);

  // Filter logic
  const filteredPrompts = useMemo(() => {
    return ALL_PROMPTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
      <div className="min-h-screen relative font-sans text-sys-cream selection:bg-sys-peach selection:text-sys-depth">
        {/* Global Effects */}
        <ShaderBackground />
        <div className="bg-noise"></div>
        <div className="scanlines"></div>

        {activePrompt && (
            <PromptModal prompt={activePrompt} onClose={() => setActivePrompt(null)} />
        )}

        {/* Top System Bar */}
        <nav className="sticky top-0 z-40 border-b border-sys-grape/40 term-panel h-14 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setSelectedCategory('All')}>
              <Terminal className="w-5 h-5 text-sys-peach" />
              <span className="font-mono font-bold tracking-tighter text-lg text-white group-hover:text-sys-cream transition-colors">
               VIBE<span className="text-sys-grape">CODERS</span>_HUB
             </span>
            </div>
            <div className="hidden md:flex items-center px-2 py-0.5 bg-sys-peach/10 border border-sys-peach/30 rounded text-[10px] font-mono text-sys-peach tracking-widest animate-pulse">
              SYSTEM ONLINE
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sys-grape">{'>'}</span>
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="grep prompt..."
                  className="bg-sys-black/50 border border-sys-grape/30 text-sm font-mono py-1.5 pl-8 pr-4 w-48 md:w-64 focus:outline-none focus:border-sys-peach focus:w-72 transition-all placeholder-sys-cream/30 text-sys-cream"
              />
            </div>

            <a href="#" className="hidden md:block font-mono text-xs text-sys-grape hover:text-sys-cream transition-colors hover:underline decoration-sys-peach underline-offset-4">
              [MANUAL]
            </a>
          </div>
        </nav>

        <div className="flex flex-col md:flex-row min-h-[calc(100vh-56px)]">

          {/* Sidebar / Directory Tree */}
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-sys-grape/30 bg-sys-black/20 backdrop-blur-sm p-4 overflow-y-auto h-auto md:h-[calc(100vh-56px)] md:sticky md:top-14 custom-scrollbar">
            <div className="font-mono text-xs text-sys-grape mb-4 uppercase tracking-widest pl-2">// DIRECTORY</div>

            <div className="space-y-1">
              <button
                  onClick={() => setSelectedCategory('All')}
                  className={`
                 w-full text-left px-3 py-2 font-mono text-sm flex items-center gap-3 transition-all
                 ${selectedCategory === 'All'
                      ? 'bg-sys-peach/20 text-sys-peach border-r-2 border-sys-peach'
                      : 'text-sys-cream/60 hover:text-sys-cream hover:bg-sys-cream/5'
                  }
               `}
              >
                <Command className="w-4 h-4" />
                <span>./all_files</span>
              </button>

              {CATEGORIES_LIST.map(cat => (
                  <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`
                  w-full text-left px-3 py-2 font-mono text-sm flex items-center gap-3 transition-all group
                  ${selectedCategory === cat
                          ? 'bg-sys-grape/20 text-sys-cream border-r-2 border-sys-grape'
                          : 'text-sys-cream/60 hover:text-sys-cream hover:bg-sys-cream/5'
                      }
                `}
                  >
                 <span className={`${selectedCategory === cat ? 'text-sys-cream' : 'text-sys-grape group-hover:text-sys-peach'}`}>
                   <CategoryIcon category={cat} />
                 </span>
                    <span className="truncate">{cat.toLowerCase().replace(/\s/g, '_')}</span>
                  </button>
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">

            {/* Hero / Header in Main Area */}
            <header className="mb-12">
              {selectedCategory === 'All' && (
                  <div className="hidden md:block text-[6px] md:text-[8px] lg:text-[10px] leading-[8px] lg:leading-[11px] font-mono text-sys-grape mb-8 whitespace-pre opacity-80 select-none overflow-x-hidden">
                    {ASCII_LOGO}
                  </div>
              )}

              <div className="flex items-end gap-4 border-b border-sys-grape/30 pb-4">
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  <TerminalText text={selectedCategory === 'All' ? 'ROOT_ACCESS' : selectedCategory.toUpperCase()} />
                </h1>
                <span className="font-mono text-sys-peach text-sm mb-1 animate-pulse">
                {selectedCategory === 'All' ? ' // FULL_ACCESS_GRANTED' : ' // SUB_DIRECTORY_MOUNTED'}
              </span>
              </div>
              <div className="mt-2 font-mono text-xs text-sys-cream/50">
                Files found: {filteredPrompts.length} objects
              </div>
            </header>

            {/* Grid */}
            {filteredPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                  {filteredPrompts.map(prompt => (
                      <TerminalPromptCard
                          key={prompt.id}
                          prompt={prompt}
                          onOpen={setActivePrompt}
                      />
                  ))}
                </div>
            ) : (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-sys-grape/30 rounded bg-sys-black/20">
                  <AlertCircle className="w-12 h-12 text-sys-grape mb-4" />
                  <h2 className="text-xl font-mono text-sys-cream mb-2">ERROR 404: NULL_POINTER</h2>
                  <p className="font-mono text-sys-cream/50 text-sm">Query returned no results. Check syntax.</p>
                </div>
            )}

          </main>
        </div>

      </div>
  );
};

export default App;
