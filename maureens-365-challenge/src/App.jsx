
import { useEffect, useState } from "react";

// Curated list of trending/popular songs (can expand to 365)
const SONGS = [
  { title: "Blinding Lights", artist: "The Weeknd", albumArt: "https://i.scdn.co/image/ab67616d0000b2731e4b0b2e2c7a1f8f5d3c2a7a", preview: "https://p.scdn.co/mp3-preview/0e19b1..."},
  { title: "Halo", artist: "Beyoncé", albumArt: "https://i.scdn.co/image/ab67616d0000b2735a8c9e0f6f5e2e9d7d2a9f8f", preview: null },
  { title: "As It Was", artist: "Harry Styles", albumArt: "https://i.scdn.co/image/ab67616d0000b273c2d5f6b9a1e8b2c5e7a4f6d7", preview: null },
  { title: "Essence", artist: "Wizkid ft Tems", albumArt: "https://i.scdn.co/image/ab67616d0000b273e3d2a9f6c5b2d8a1f4c7b5d9", preview: null },
  { title: "Levitating", artist: "Dua Lipa", albumArt: "https://i.scdn.co/image/ab67616d0000b273b2f1c6a5d3e7b8f1c4d2a9e3", preview: null },
  { title: "Anti-Hero", artist: "Taylor Swift", albumArt: "https://i.scdn.co/image/ab67616d0000b273d4c3e5a1b7f2d9c6e1a4b8c5", preview: null },
  { title: "Flowers", artist: "Miley Cyrus", albumArt: "https://i.scdn.co/image/ab67616d0000b273a7d5c2b1f4e6c3a5b2d8f1a9", preview: null },
  { title: "Calm Down", artist: "Rema & Selena Gomez", albumArt: "https://i.scdn.co/image/ab67616d0000b273f3e1a9d2c5b7e6f1a4c2d8b5", preview: null },
  { title: "Cupid", artist: "Fifty Fifty", albumArt: "https://i.scdn.co/image/ab67616d0000b273c9d5a2f1e3b7d6a4c2e1b9f", preview: null },
  { title: "Die For You", artist: "The Weeknd", albumArt: "https://i.scdn.co/image/ab67616d0000b273b5c2a8d1e7f6a3c4b9d1e5f", preview: null },
];

const START_DATE = new Date("2026-01-01");

function getDayIndex() {
  const today = new Date();
  const diff = today - START_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [song, setSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const day = getDayIndex();

  useEffect(() => {
    // Pick "random" song deterministically for the day
    const index = day % SONGS.length;
    setSong(SONGS[index]);
  }, [day]);

  const togglePreview = () => {
    if (!song.preview) return;
    const audio = new Audio(song.preview);
    if (!playing) {
      audio.play();
      setPlaying(true);
      audio.onended = () => setPlaying(false);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (!song) return <div style={{color: "white"}}>Loading...</div>;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #ec4899, #000)",
      color: "white",
      padding: "1rem"
    }}>
      <div style={{
        background: "rgba(0,0,0,0.7)",
        padding: "2rem",
        borderRadius: "16px",
        textAlign: "center",
        maxWidth: "320px",
        width: "100%",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
      }}>
        <h1 style={{ color: "#f472b6", fontSize: "2rem", marginBottom: "0.5rem" }}>
          Maureen's 365 Day Challenge
        </h1>
        <p style={{ opacity: 0.8 }}>Day {day + 1} of 365</p>

        <img src={song.albumArt} alt={song.title} style={{ width: "100%", borderRadius: "8px", margin: "1rem 0" }} />

        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{song.title}</h2>
        <p style={{ color: "#f9a8d4", marginBottom: "1rem" }}>{song.artist}</p>

        {song.preview && (
          <button
            onClick={togglePreview}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              background: "#f472b6",
              color: "white",
              cursor: "pointer"
            }}
          >
            {playing ? "Pause Preview" : "Play Preview"}
          </button>
        )}
      </div>
    </div>
  );
} 
