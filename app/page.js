'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const createRoom = () => {
    setIsCreating(true);
    const code = generateRoomCode();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('syncroom-role', 'host');
    }
    router.push(`/room/${code}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    const code = roomCode.trim().toUpperCase();
    if (code.length < 4) return;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('syncroom-role', 'guest');
    }
    router.push(`/room/${code}`);
  };

  return (
    <main className="landing">
      <div className="hero">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">♪</span>
          <h1>
            Sync<span className="gradient-text">Room</span>
          </h1>
        </div>
        <p className="tagline">Listen together, from anywhere in the world.</p>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <div className="card-icon">🎧</div>
            <h2>Create a Room</h2>
            <p>Start a new listening session and invite your friends to join.</p>
            <button
              id="create-room-btn"
              className="btn btn-primary"
              onClick={createRoom}
              disabled={isCreating}
            >
              {isCreating ? '✨ Creating…' : '🚀 Create Room'}
            </button>
          </div>

          <div className="card-divider">
            <span>OR</span>
          </div>

          <div className="card">
            <div className="card-icon">🔗</div>
            <h2>Join a Room</h2>
            <p>Enter a room code shared by your friend to join their session.</p>
            <form onSubmit={joinRoom}>
              <input
                id="room-code-input"
                type="text"
                className="input"
                placeholder="ENTER CODE"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                autoComplete="off"
                spellCheck={false}
              />
              <button
                id="join-room-btn"
                type="submit"
                className="btn btn-secondary"
                disabled={roomCode.trim().length < 4}
              >
                🎵 Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="features">
          <div className="feature">
            <span>⚡</span>
            <p>Real-time sync</p>
          </div>
          <div className="feature">
            <span>🌍</span>
            <p>Cross-device</p>
          </div>
          <div className="feature">
            <span>🔒</span>
            <p>P2P encrypted</p>
          </div>
          <div className="feature">
            <span>☁️</span>
            <p>No install needed</p>
          </div>
        </div>
      </div>
    </main>
  );
}
