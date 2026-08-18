import React, { useState } from 'react';
import {
  RiCodeSSlashLine,
  RiEyeLine,
  RiDownloadLine,
  RiFileCopyLine,
  RiFullscreenLine,
  RiCloseLine,
  RiTerminalBoxLine,
  RiFileTextLine,
  RiImageLine,
  RiLayoutGridLine,
  RiCheckLine,
  RiRefreshLine,
  RiExpandUpDownLine,
  RiShareLine,
  RiEdit2Line,
} from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi2';

/* ── Demo artifact content ────────────────────────────────────── */
const DEMO_CODE = `import asyncio
import uvloop
from typing import AsyncIterator

asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())

class DataPipeline:
    """High-throughput async data processor."""

    def __init__(self, concurrency: int = 64):
        self.concurrency = concurrency
        self._semaphore = asyncio.Semaphore(concurrency)

    async def process_batch(
        self,
        items: list[dict],
    ) -> AsyncIterator[dict]:
        """Process items concurrently with backpressure."""
        async def _process(item: dict) -> dict:
            async with self._semaphore:
                await asyncio.sleep(0)  # yield to event loop
                return {"id": item["id"], "status": "processed"}

        tasks = [asyncio.create_task(_process(i)) for i in items]
        for result in asyncio.as_completed(tasks):
            yield await result

    async def run(self, data: list[dict]) -> list[dict]:
        results = []
        async for item in self.process_batch(data):
            results.append(item)
        return results


async def main():
    pipeline = DataPipeline(concurrency=128)
    data = [{"id": i, "value": i * 2} for i in range(1000)]
    results = await pipeline.run(data)
    print(f"Processed {len(results)} items")

if __name__ == "__main__":
    asyncio.run(main())
`;

const DEMO_PREVIEW = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      background: #080a0e; color: #e8eaf0; 
      font-family: Inter, sans-serif; 
      display: flex; align-items: center; justify-content: center;
      height: 100vh; margin: 0;
    }
    .card {
      background: #111520; border: 1px solid rgba(212,160,23,0.2);
      border-radius: 14px; padding: 32px; max-width: 400px; text-align: center;
    }
    h1 { color: #f0bc2a; font-size: 24px; margin-bottom: 8px; }
    p  { color: #6b7280; font-size: 14px; line-height: 1.6; }
    .badge {
      display: inline-block; background: rgba(212,160,23,0.12);
      color: #d4a017; border: 1px solid rgba(212,160,23,0.25);
      padding: 3px 12px; border-radius: 999px; font-size: 12px;
      margin-bottom: 16px; letter-spacing: 0.06em; text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">Preview</div>
    <h1>BlackEagle AI</h1>
    <p>This is a rendered preview of the artifact output. Your components will appear here.</p>
  </div>
</body>
</html>`;

/* ── Syntax token coloring ────────────────────────────────────── */
function tokenize(code) {
  const lines = code.split('\n');
  return lines.map((line, li) => {
    const tokens = [];
    let rest = line;

    // Simple greedy tokenizer
    while (rest.length > 0) {
      // Comment
      if (rest.startsWith('#')) {
        tokens.push({ type: 'cm', text: rest });
        rest = '';
        continue;
      }
      // String double
      const dStr = rest.match(/^("(?:[^"\\]|\\.)*")/);
      if (dStr) { tokens.push({ type: 'str', text: dStr[1] }); rest = rest.slice(dStr[1].length); continue; }
      // String single
      const sStr = rest.match(/^('(?:[^'\\]|\\.)*')/);
      if (sStr) { tokens.push({ type: 'str', text: sStr[1] }); rest = rest.slice(sStr[1].length); continue; }
      // Keywords
      const kw = rest.match(/^(import|from|class|def|async|await|return|if|else|elif|for|while|in|not|and|or|None|True|False|self|yield|with|as|raise|try|except|finally|pass|lambda|is)\b/);
      if (kw) { tokens.push({ type: 'kw', text: kw[1] }); rest = rest.slice(kw[1].length); continue; }
      // Decorator
      const dec = rest.match(/^(@\w+)/);
      if (dec) { tokens.push({ type: 'dec', text: dec[1] }); rest = rest.slice(dec[1].length); continue; }
      // Number
      const num = rest.match(/^(\d+(\.\d+)?)/);
      if (num) { tokens.push({ type: 'num', text: num[1] }); rest = rest.slice(num[1].length); continue; }
      // Function call
      const fn = rest.match(/^([a-zA-Z_]\w*(?=\s*\())/);
      if (fn) { tokens.push({ type: 'fn', text: fn[1] }); rest = rest.slice(fn[1].length); continue; }
      // Default — eat one char
      tokens.push({ type: 'plain', text: rest[0] });
      rest = rest.slice(1);
    }

    return { line: li + 1, tokens };
  });
}

const tokenColor = {
  kw:    '#f0bc2a',
  str:   '#7ec8e3',
  fn:    '#79c0ff',
  cm:    '#4b5563',
  num:   '#f8c555',
  dec:   '#c084fc',
  plain: '#c9d1d9',
};

function CodeBlock({ code }) {
  const lines = tokenize(code);
  return (
    <div style={{ overflowX: 'auto', overflowY: 'auto', flex: 1 }}>
      <table style={{ borderCollapse: 'collapse', minWidth: '100%' }}>
        <tbody>
          {lines.map(({ line, tokens }) => (
            <tr key={line} style={{ transition: 'background 80ms' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,160,23,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{
                userSelect: 'none', textAlign: 'right', paddingRight: '16px',
                paddingLeft: '16px', width: '40px', minWidth: '40px',
                fontSize: '12px', color: '#374151', fontFamily: 'monospace',
                borderRight: '1px solid rgba(212,160,23,0.08)',
                verticalAlign: 'top', paddingTop: '1px', paddingBottom: '1px',
              }}>
                {line}
              </td>
              <td style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '1px', paddingBottom: '1px' }}>
                <span className="be-code" style={{ whiteSpace: 'pre' }}>
                  {tokens.map((tok, i) => (
                    <span key={i} style={{ color: tokenColor[tok.type] }}>{tok.text}</span>
                  ))}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── File tabs ────────────────────────────────────────────────── */
const FILES = [
  { id: 'pipeline', name: 'pipeline.py', icon: <RiCodeSSlashLine size={13} />, type: 'code' },
  { id: 'preview',  name: 'Preview',     icon: <RiEyeLine size={13} />,        type: 'preview' },
  { id: 'output',   name: 'Output',      icon: <RiTerminalBoxLine size={13} />, type: 'terminal' },
];

const TERMINAL_OUTPUT = `✓  uvloop installed (4.2x faster than asyncio default)
✓  DataPipeline initialized with concurrency=128

[00:00.000] Processing batch of 1000 items...
[00:00.031] Processed items: 128/1000
[00:00.063] Processed items: 256/1000
[00:00.094] Processed items: 512/1000
[00:00.141] Processed items: 768/1000
[00:00.187] Processed items: 1000/1000

✓  Completed in 187ms
✓  Throughput: ~5,347 items/sec
`;

function Artifact() {
  const [activeFile, setActiveFile] = useState('pipeline');
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(DEMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const currentFile = FILES.find(f => f.id === activeFile);

  if (collapsed) {
    return (
      <div style={{
        width: '48px', flexShrink: 0,
        height: '100%',
        background: 'var(--be-surface)',
        borderLeft: '1px solid var(--be-border)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: '16px', gap: '12px',
      }}>
        <button
          onClick={() => setCollapsed(false)}
          className="be-btn-ghost"
          title="Expand Artifact"
          style={{ padding: '8px', borderRadius: '8px', border: 'none', color: 'var(--be-gold)' }}
        >
          <RiLayoutGridLine size={16} />
        </button>
        <div style={{ writingMode: 'vertical-rl', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--be-text-muted)', transform: 'rotate(180deg)', marginTop: '8px' }}>
          Artifact
        </div>
      </div>
    );
  }

  return (
    <aside style={{
      width: '440px',
      flexShrink: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--be-surface)',
      borderLeft: '1px solid var(--be-border)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '160px', height: '160px',
        background: 'radial-gradient(circle at 100% 0%, rgba(212,160,23,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Header */}
      <div style={{
        padding: '0 16px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--be-border)',
        flexShrink: 0,
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '7px',
            background: 'rgba(212,160,23,0.12)', border: '1px solid var(--be-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <HiOutlineSparkles size={14} color="var(--be-gold)" />
          </div>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--be-text)' }}>Artifact</div>
            <div style={{ fontSize: '10.5px', color: 'var(--be-text-muted)' }}>Generated output</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button title="Regenerate" className="be-btn-ghost" style={{ padding: '6px 8px', borderRadius: '7px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <RiRefreshLine size={14} />
          </button>
          <button title="Share" className="be-btn-ghost" style={{ padding: '6px 8px', borderRadius: '7px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <RiShareLine size={14} />
          </button>
          <button title="Fullscreen" className="be-btn-ghost" style={{ padding: '6px 8px', borderRadius: '7px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <RiFullscreenLine size={14} />
          </button>
          <button
            onClick={() => setCollapsed(true)}
            title="Collapse"
            className="be-btn-ghost"
            style={{ padding: '6px 8px', borderRadius: '7px', border: 'none', display: 'flex', alignItems: 'center' }}
          >
            <RiExpandUpDownLine size={14} style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </div>

      {/* File meta bar */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--be-border)',
        flexShrink: 0,
        background: 'var(--be-surface-2)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--be-gold)', display: 'flex', alignItems: 'center' }}>
              {currentFile.icon}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--be-text)' }}>
              {currentFile.name}
            </span>
            <span style={{
              fontSize: '10px', padding: '1px 7px', borderRadius: '4px',
              background: 'rgba(34,197,94,0.1)', color: '#22c55e',
              border: '1px solid rgba(34,197,94,0.2)', fontWeight: 600, letterSpacing: '0.06em',
            }}>
              Python
            </span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={copyCode} className="be-btn-ghost" title="Copy" style={{
              padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              {copied ? <RiCheckLine size={12} color="#22c55e" /> : <RiFileCopyLine size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="be-btn-ghost" title="Download" style={{ padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <RiDownloadLine size={13} />
            </button>
            <button className="be-btn-ghost" title="Edit" style={{ padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
              <RiEdit2Line size={13} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {FILES.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFile(f.id)}
              className={`artifact-tab ${activeFile === f.id ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              {f.icon}
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {activeFile === 'pipeline' && (
          <div style={{ flex: 1, overflowY: 'auto', background: '#0d1018' }}>
            <CodeBlock code={DEMO_CODE} />
          </div>
        )}

        {activeFile === 'preview' && (
          <iframe
            srcDoc={DEMO_PREVIEW}
            style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
            title="Artifact Preview"
            sandbox="allow-scripts"
          />
        )}

        {activeFile === 'terminal' && (
          <div style={{
            flex: 1, overflowY: 'auto', background: '#06080c',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '11px', color: 'var(--be-text-muted)', marginLeft: '4px', letterSpacing: '0.06em' }}>
                Terminal Output
              </span>
            </div>
            <pre style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: '12px',
              lineHeight: 1.8,
              color: '#c9d1d9',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
              {TERMINAL_OUTPUT.split('\n').map((line, i) => {
                const color = line.startsWith('✓') ? '#22c55e'
                  : line.startsWith('[') ? 'var(--be-gold)'
                  : line.startsWith('✗') ? '#ef4444'
                  : '#c9d1d9';
                return <div key={i} style={{ color }}>{line}</div>;
              })}
            </pre>
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid var(--be-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        background: 'var(--be-surface-2)',
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'Lines', value: '54' },
            { label: 'Tokens', value: '1,240' },
            { label: 'Lang', value: 'Python' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', gap: '5px', alignItems: 'baseline' }}>
              <span style={{ fontSize: '11px', color: 'var(--be-text-muted)' }}>{label}</span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--be-gold-bright)' }}>{value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--be-text-muted)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          Ready
        </div>
      </div>
    </aside>
  );
}

export default Artifact;
