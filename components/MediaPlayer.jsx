import React, { useState, useRef, useEffect } from 'react';

const MediaPlayer = ({ isVisible = true, onClose, showCloseButton = true, demoMode = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const track = {
    title: "Everything You Want",
    artist: "Vertical Horizon",
    src: "/mp3/VH-ESW.mp3"
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setError(null);
            })
            .catch(err => {
              console.error('Playback error:', err);
              setError('Error playing audio. Please check the file format and path.');
              setIsPlaying(false);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      // Repeat current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      // For 'off' and 'all' modes, stop playing (in a real app, 'all' would go to next track)
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleProgressClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleRepeatMode = () => {
    setRepeatMode(prev => {
      switch (prev) {
        case 'off': return 'one';
        case 'one': return 'all';
        case 'all': return 'off';
        default: return 'off';
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div className={`media-player ${demoMode ? 'demo-mode' : ''}`}>
      {showCloseButton && <button className="close-button" onClick={onClose}>×</button>}
      
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
        onError={(e) => {
          console.error('Audio error:', e);
          setError('Error loading audio file. Please check the file path and format.');
          setIsPlaying(false);
        }}
      />

      <div className="track-info">
        <span className="track-title">{track.title}</span>
        <span className="track-artist">{track.artist}</span>
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="progress-bar" onClick={handleProgressClick}>
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <div className="controls">
        {/* Show advanced controls only in demo mode */}
        {demoMode && (
          <>
            {/* Repeat Button */}
            <button
              onClick={toggleRepeatMode}
              className={`control-button repeat-button ${repeatMode !== 'off' ? 'active' : ''}`}
              title={`Repeat: ${repeatMode === 'off' ? 'Off' : repeatMode === 'one' ? 'One' : 'All'}`}
            >
              {repeatMode === 'one' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="m21 5h-9a4 4 0 0 0-4 4v6"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="m3 19h9a4 4 0 0 0 4-4v-6"></path>
                  <text x="12" y="14" fontSize="8" textAnchor="middle" fill="currentColor">1</text>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="m21 5h-9a4 4 0 0 0-4 4v6"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="m3 19h9a4 4 0 0 0 4-4v-6"></path>
                </svg>
              )}
            </button>
          </>
        )}

        {/* Play/Pause Button - always visible */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="control-button play-button"
          disabled={!!error}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>

        {/* Volume Control - only in demo mode */}
        {demoMode && (
          <div className="volume-control">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="volume-icon">
              {volume === 0 ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </>
              ) : volume < 0.5 ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="m15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="m19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </>
              )}
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .media-player {
          position: absolute;
					bottom: -100%;
          right: 1rem;
          width: 300px;
          background: var(--magazine-bg);
          border: 1px solid var(--magazine-text);
          padding: 1rem;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }

        .media-player.demo-mode {
          position: relative;
          bottom: auto;
          right: auto;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(20px);
          padding: 1.5rem;
        }

        .media-player.demo-mode .track-info {
          padding-right: 0;
          margin-bottom: 1.5rem;
        }

        .media-player.demo-mode .track-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #2d3748;
        }

        .media-player.demo-mode .track-artist {
          font-size: 0.9rem;
          color: #718096;
        }

        .media-player.demo-mode .progress-bar {
          height: 6px;
          border-radius: 3px;
          margin-bottom: 1.5rem;
          background: rgba(0, 0, 0, 0.1);
        }

        .media-player.demo-mode .progress {
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
        }

        .media-player.demo-mode .play-button {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .media-player.demo-mode .play-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .media-player.demo-mode .controls {
          margin-top: 0.5rem;
        }

        .media-player.demo-mode .repeat-button.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.15);
        }

        .media-player.demo-mode .volume-slider {
          background: rgba(0, 0, 0, 0.1);
        }

        .media-player.demo-mode .volume-slider::-webkit-slider-thumb {
          background: #667eea;
        }

        .media-player.demo-mode .volume-slider::-moz-range-thumb {
          background: #667eea;
        }

        .media-player.demo-mode .volume-icon {
          color: #718096;
        }

        .close-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--magazine-text);
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-button:hover {
          transform: scale(1.1);
        }

        .track-info {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
          padding-right: 1.5rem;
        }

        .track-title {
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .track-artist {
          font-size: 0.8rem;
          color: var(--magazine-muted);
        }

        .error-message {
          font-size: 0.8rem;
          color: #e53e3e;
          margin-top: 0.5rem;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--magazine-border);
          margin-bottom: 1rem;
          cursor: pointer;
          position: relative;
        }

        .progress {
          height: 100%;
          background: var(--magazine-text);
          transition: width 0.1s linear;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .control-button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--magazine-text);
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .control-button:hover:not(:disabled) {
          background: var(--magazine-hover);
        }

        .play-button {
          width: 40px;
          height: 40px;
          background: var(--magazine-text);
          color: var(--magazine-bg);
        }

        .play-button:hover:not(:disabled) {
          background: var(--magazine-text);
          transform: scale(1.05);
        }

        .repeat-button {
          width: 32px;
          height: 32px;
        }

        .repeat-button.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .repeat-button:hover:not(:disabled) {
          background: var(--magazine-hover);
        }

        .repeat-button.active:hover:not(:disabled) {
          background: rgba(102, 126, 234, 0.2);
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 80px;
        }

        .volume-icon {
          flex-shrink: 0;
        }

        .volume-slider {
          flex: 1;
          height: 4px;
          border-radius: 2px;
          background: var(--magazine-border);
          outline: none;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--magazine-text);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .volume-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--magazine-text);
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .volume-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }

        .volume-slider::-webkit-slider-track {
          height: 4px;
          border-radius: 2px;
          background: var(--magazine-border);
        }

        .volume-slider::-moz-range-track {
          height: 4px;
          border-radius: 2px;
          background: var(--magazine-border);
          border: none;
        }


      `}</style>
    </div>
  );
};

export default MediaPlayer; 