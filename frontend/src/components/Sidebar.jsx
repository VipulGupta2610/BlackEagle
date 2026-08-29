import React, { useState } from 'react';
import {
  RiRobot2Line,
  RiAddCircleLine,
  RiHistoryLine,
  RiSettings4Line,
  RiSearchLine,
  RiMessage3Line,
  RiDeleteBinLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiDatabase2Line,
  RiBookmarkLine,
  RiQuestionLine,
  RiUser3Line,
} from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../features/getConversations.js';
import { useDispatch } from 'react-redux';
import { addConversation, setConversation, setSelectedConversation } from '../redux/conversationSlice.js';
import { createConversation } from '../features/createConversation.js';

// We'll dynamically render conversations instead of using hardcoded CHATS

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch()
  const {imageError , setImageError} = useState()
  const {conversations , selectedConversation}=useSelector(state=>state.conversation)
  const [search, setSearch] = useState('');
  const { userData } = useSelector(state => state.user);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const diffInHours = (new Date() - date) / (1000 * 60 * 60);
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const filtered = (conversations || []).filter(c =>
    (c.title || c.ttile || 'New chat').toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const getConv = async () => {
      const data = await getConversations()
      dispatch(setConversation(data))
    }
    getConv()
  }, [userData?._id]);

  const handleCreateConversation=async()=>{
    const data  = await createConversation()
    dispatch(addConversation(data))
  }

  return (
    <aside
      style={{
        width: collapsed ? '68px' : '260px',
        transition: 'width 240ms cubic-bezier(0.4,0,0.2,1)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--be-surface)',
        borderRight: '1px solid var(--be-border)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle top-left corner glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '120px', height: '120px',
        background: 'radial-gradient(circle at 0% 0%, rgba(212,160,23,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        padding: collapsed ? '16px 12px' : '16px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid var(--be-border)',
        minHeight: '64px',
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
              background: 'linear-gradient(135deg, #d4a017, #f0bc2a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(212,160,23,0.4)',
            }}>
              <RiRobot2Line size={17} color="#080a0e" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="font-brand" style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '0.04em', color: '#f0bc2a', lineHeight: 1 }}>
                BlackEagle
              </div>
              <div style={{ fontSize: '10px', color: 'var(--be-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Intelligence
              </div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #d4a017, #f0bc2a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(212,160,23,0.4)',
          }}>
            <RiRobot2Line size={17} color="#080a0e" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="be-btn-ghost"
          style={{ padding: '6px', borderRadius: '7px', fontSize: '15px', border: 'none', flexShrink: 0 }}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <RiMenuUnfoldLine size={15} /> : <RiMenuFoldLine size={15} />}
        </button>
      </div>

      {/* New Chat */}
      <div style={{ padding: collapsed ? '12px 10px' : '12px', borderBottom: '1px solid var(--be-border)' }}>
        <button
          className="be-btn-gold"
          onClick={handleCreateConversation}
          style={{
            width: '100%',
            padding: collapsed ? '9px' : '9px 14px',
            borderRadius: '9px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '8px',
          }}
        >
          <RiAddCircleLine size={16} />
          {!collapsed && <span>New conversation</span>}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div style={{ padding: '10px 12px' }}>
          <div style={{ position: 'relative' }}>
            <RiSearchLine
              size={13}
              style={{
                position: 'absolute', left: '10px', top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--be-text-muted)',
              }}
            />
            <input
              className="be-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search chats…"
              style={{
                width: '100%', padding: '7px 10px 7px 30px',
                borderRadius: '8px', fontSize: '12.5px',
              }}
            />
          </div>
        </div>
      )}

      {/* Chat list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '8px' : '4px 8px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {!collapsed && (
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--be-text-muted)', padding: '6px 6px 4px', marginBottom: '2px' }}>
            Recent
          </div>
        )}

        {filtered.map(chat => {
          const isActive = selectedConversation?._id === chat._id;
          const displayTitle = chat.title || chat.ttile || 'New chat';
          return collapsed ? (
            <button
              key={chat._id}
              title={displayTitle}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              style={{ padding: '9px', justifyContent: 'center', width: '100%' }}
              onClick={() => dispatch(setSelectedConversation(chat))}
            >
              <RiMessage3Line size={16} />
            </button>
          ) : (
            <div
              key={chat._id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px', padding: '8px 12px', cursor: 'pointer' }}
              onClick={() => dispatch(setSelectedConversation(chat))}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                <span
                  className="sidebar-dot"
                  style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                    background: isActive ? 'var(--be-gold-bright)' : 'var(--be-text-muted)',
                    transition: 'all 150ms',
                  }}
                />
                <span style={{ fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {displayTitle}
                </span>
                <button
                  className="be-btn-ghost"
                  style={{ padding: '2px 4px', border: 'none', borderRadius: '4px', fontSize: '11px', opacity: 0, transition: 'opacity 150ms', flexShrink: 0 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                >
                  <RiDeleteBinLine size={12} />
                </button>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--be-text-muted)', paddingLeft: '14px' }}>{formatTime(chat.updatedAt || chat.createdAt)}</span>
            </div>
          )
        })}
      </div>

      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid var(--be-border)', padding: collapsed ? '10px 8px' : '10px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {[
          { icon: <RiHistoryLine size={16} />, label: 'History' },
          { icon: <RiBookmarkLine size={16} />, label: 'Saved' },
          { icon: <RiDatabase2Line size={16} />, label: 'Memory' },
          { icon: <RiQuestionLine size={16} />, label: 'Help' },
          { icon: <RiSettings4Line size={16} />, label: 'Settings' },
        ].map(({ icon, label }) => (
          <button
            key={label}
            title={label}
            className="sidebar-item"
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          >
            {icon}
            {!collapsed && <span style={{ fontSize: '13px' }}>{label}</span>}
          </button>
        ))}

        {/* User */}
        <div className="be-divider" style={{ margin: '6px 0' }} />
        <div
          className="sidebar-item"
          style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
          title={userData?.name || 'Profile'}
        >
          {userData?.picture ? (
            <img
              src={userData.picture}
              alt="avatar"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1.5px solid var(--be-gold-dim)', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--be-gold-dim), var(--be-gold))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <RiUser3Line size={13} color="#080a0e" />
            </div>
          )}
          {!collapsed && (
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '12.5px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userData?.name || 'Guest'}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--be-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userData?.email || 'Not signed in'}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
