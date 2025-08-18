import React, { useState, useRef, useEffect } from 'react';

const MediaPlayer = ({ isVisible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleProgressClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    if (audioRef.current) {
      audioRef.current.currentTime = percent * audioRef.current.duration;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="media-player">
      <button className="close-button" onClick={onClose}>×</button>
      
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
      `}</style>
    </div>
  );
};

export default MediaPlayer; 