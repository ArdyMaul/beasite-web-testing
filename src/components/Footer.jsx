import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 0',
      marginTop: 'auto',
      backgroundColor: 'var(--bg-secondary)'
    }}>
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <p style={{ color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} BeaSIte. Platform Pencarian Beasiswa Terbaik.
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Dibuat dengan <Heart size={16} color="#06b6d4" /> untuk mahasiswa Indonesia
        </p>
      </div>
    </footer>
  );
}
