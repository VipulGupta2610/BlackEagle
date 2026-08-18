import React, { useState, useRef, useEffect } from 'react';
import {
  RiSendPlaneFill,
  RiAttachment2,
  RiMicLine,
  RiStopCircleLine,
  RiRobot2Line,
  RiUser3Line,
  RiFileCopyLine,
  RiThumbUpLine,
  RiThumbDownLine,
  RiRefreshLine,
  RiLightbulbLine,
  RiCodeSSlashLine,
  RiSearchEyeLine,
  RiShieldCheckLine,
} from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { useSelector } from 'react-redux';

const SUGGESTIONS = [
  { icon: <RiLightbulbLine size={16} />, text: 'Explain quantum entanglement in simple terms' },
  { icon: <RiCodeSSlashLine size={16} />, text: 'Write a Python async web scraper' },
  { icon: <RiSearchEyeLine size={16} />, text: 'Analyze this system architecture' },
  { icon: <RiShieldCheckLine size={16} />, text: 'Review my code for security issues' },
];

const DEMO_MESSAGES = [
  {
    id: 1, role: 'user',
    content: 'Can you help me optimize a Python async event loop for high-throughput data processing?',
    time: '10:24 AM',
  },
  {
    id: 2, role: 'ai',
    content: `Absolutely. For high-throughput async data processing in Python, here are the key strategies:\n\n**1. Use \`asyncio.gather\` for concurrent tasks**\nBatch your coroutines and run them concurrently instead of sequentially.\n\n**2. Optimize with \`uvloop\`**\nDrop-in replacement for asyncio's event loop — up to 4x faster.\n\n**3. Use connection pooling**\nFor I/O-bound work (DB, HTTP), always pool connections to avoid overhead.\n\nWant me to show you a complete implementation example?`,
    time: '10:24 AM',
  },
];

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} className="typing-bar" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  );
}

function Message({ msg, index }) {
  const isUser = msg.role === 'user';
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderContent = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--be-gold-bright)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} style={{
            background: 'rgba(212,160,23,0.1)', color: 'var(--be-gold-bright)',
            padding: '1px 6px', borderRadius: '4px', fontSize: '12.5px',
            fontFamily: 'monospace', border: '1px solid rgba(212,160,23,0.2)',
          }}>{part.slice(1, -1)}</code>
        );
      }
      return part.split('\n').map((line, j, arr) => (
        <React.Fragment key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <div
      className="fade-up"
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: '12px',
        alignItems: 'flex-start',
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Avatar */}
      <div style={{
        width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser
          ? 'linear-gradient(135deg, rgba(212,160,23,0.2), rgba(212,160,23,0.1))'
          : 'linear-gradient(135deg, #1a1f2e, #111520)',
        border: isUser
          ? '1.5px solid rgba(212,160,23,0.3)'
          : '1.5px solid var(--be-border)',
        boxShadow: isUser ? '0 0 10px rgba(212,160,23,0.15)' : 'none',
      }}>
        {isUser
          ? <RiUser3Line size={16} color="var(--be-gold)" />
          : <RiRobot2Line size={16} color="var(--be-gold-bright)" />
        }
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div
          className={isUser ? 'bubble-user' : 'bubble-ai'}
          style={{ padding: '12px 16px', lineHeight: 1.65, fontSize: '14px', color: 'var(--be-text)' }}
        >
          {renderContent(msg.content)}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '4px',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          paddingInline: '2px',
        }}>
          <span style={{ fontSize: '10.5px', color: 'var(--be-text-muted)', alignSelf: 'center', marginRight: '4px' }}>
            {msg.time}
          </span>
          {!isUser && (
            <>
              <button onClick={copy} title="Copy" className="be-btn-ghost" style={{ padding: '4px 7px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RiFileCopyLine size={12} />
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button title="Good" className="be-btn-ghost" style={{ padding: '4px 7px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                <RiThumbUpLine size={12} />
              </button>
              <button title="Bad" className="be-btn-ghost" style={{ padding: '4px 7px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                <RiThumbDownLine size={12} />
              </button>
              <button title="Regenerate" className="be-btn-ghost" style={{ padding: '4px 7px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                <RiRefreshLine size={12} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ChatArea() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const { userData } = useSelector(state => state.user);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), role: 'user', content: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = {
        id: Date.now() + 1, role: 'ai',
        content: `I understand your query about "${text.slice(0, 60)}${text.length > 60 ? '...' : ''}". Let me analyze this and provide a comprehensive response.\n\nAs **BlackEagle AI**, I'm processing your request with advanced reasoning to give you the most accurate and actionable insights possible.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1800);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showEmpty = messages.length === 0;

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--be-black)',
    }}>
      {/* Header */}
      <div style={{
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--be-border)',
        background: 'var(--be-surface)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HiOutlineSparkles size={16} color="var(--be-gold)" />
            <span className="font-brand" style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--be-text)' }}>
              Python async event loop
            </span>
          </div>
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '999px',
            background: 'rgba(212,160,23,0.12)', color: 'var(--be-gold)',
            border: '1px solid var(--be-border)', letterSpacing: '0.06em',
            textTransform: 'uppercase', fontWeight: 600,
          }}>
            Active
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '12px', color: 'var(--be-text-muted)',
          }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#22c55e', boxShadow: '0 0 6px #22c55e',
            }} />
            Model: <span style={{ color: 'var(--be-gold-bright)', fontWeight: 500 }}>Eagle-Pro</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="eagle-bg"
        style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}
      >
        {showEmpty ? (
          <div className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', paddingBottom: '80px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 16px',
                background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))',
                border: '1.5px solid var(--be-border-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(212,160,23,0.1)',
              }}>
                <RiRobot2Line size={28} color="var(--be-gold-bright)" />
              </div>
              <h2 className="font-brand be-shimmer" style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '8px' }}>
                BlackEagle AI
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--be-text-muted)', maxWidth: '360px', lineHeight: 1.6 }}>
                Precision intelligence, ready for deployment. How can I assist your mission today?
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%', maxWidth: '520px' }}>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s.text); textareaRef.current?.focus(); }}
                  className="be-btn-ghost"
                  style={{
                    padding: '12px 14px', borderRadius: '10px', textAlign: 'left',
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    fontSize: '13px', lineHeight: 1.4, color: 'var(--be-text-dim)',
                  }}
                >
                  <span style={{ color: 'var(--be-gold)', marginTop: '1px', flexShrink: 0 }}>{s.icon}</span>
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => <Message key={msg.id} msg={msg} index={i} />)
        )}

        {isTyping && (
          <div className="fade-up" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, #1a1f2e, #111520)',
              border: '1.5px solid var(--be-border)',
            }}>
              <RiRobot2Line size={16} color="var(--be-gold-bright)" />
            </div>
            <div className="bubble-ai" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--be-border)',
        background: 'var(--be-surface)',
        flexShrink: 0,
      }}>
        <div style={{
          border: '1px solid var(--be-border)',
          borderRadius: '14px',
          background: 'var(--be-surface-2)',
          transition: 'border-color 150ms, box-shadow 150ms',
          overflow: 'hidden',
        }}
          onFocus={() => {}}
        >
          <textarea
            ref={textareaRef}
            className="be-input"
            value={input}
            onChange={e => { setInput(e.target.value); autoResize(); }}
            onKeyDown={handleKey}
            placeholder="Message BlackEagle AI…"
            rows={1}
            style={{
              width: '100%',
              resize: 'none',
              border: 'none',
              background: 'transparent',
              padding: '14px 16px 8px',
              fontSize: '14px',
              lineHeight: 1.6,
              boxShadow: 'none',
              outline: 'none',
              display: 'block',
              minHeight: '52px',
            }}
          />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px 10px',
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button title="Attach file" className="be-btn-ghost" style={{ padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                <RiAttachment2 size={16} />
              </button>
              <button title="Voice input" className="be-btn-ghost" style={{ padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                <RiMicLine size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--be-text-muted)' }}>
                {input.length > 0 ? `${input.length} chars` : 'Shift+Enter for newline'}
              </span>
              <button
                onClick={isTyping ? () => setIsTyping(false) : sendMessage}
                className="be-btn-gold"
                style={{
                  padding: '8px 16px',
                  borderRadius: '9px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: (!input.trim() && !isTyping) ? 0.5 : 1,
                }}
              >
                {isTyping ? <><RiStopCircleLine size={14} /> Stop</> : <><RiSendPlaneFill size={14} /> Send</>}
              </button>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--be-text-muted)', textAlign: 'center', marginTop: '8px' }}>
          BlackEagle AI · Eagle-Pro model · Responses may be inaccurate
        </p>
      </div>
    </main>
  );
}

export default ChatArea;
