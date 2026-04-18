import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, Calendar, MapPin, GraduationCap, DollarSign, CheckCircle2 } from 'lucide-react';
import { scholarships } from '../data/scholarships';

export default function ScholarshipDetail() {
  const { id } = useParams();
  const scholarship = scholarships.find(s => s.id === id);

  if (!scholarship) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Beasiswa tidak ditemukan</h2>
        <Link to="/scholarships" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Kembali ke Daftar Beasiswa
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(scholarship.deadline).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <div className="container">
          <Link to="/scholarships" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Kembali
          </Link>
          
          <span className="card-tag">{scholarship.level}</span>
          <h1 style={{ fontSize: '3rem', marginTop: '1rem', marginBottom: '1rem' }}>{scholarship.title}</h1>
          <div className="card-provider" style={{ fontSize: '1.25rem' }}>
            <Building size={20} />
            {scholarship.provider}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content container">
        <div className="detail-grid">
          
          {/* Main Content */}
          <div className="main-info">
            <div className="content-section">
              <h2><GraduationCap size={24} /> Deskripsi</h2>
              <p>{scholarship.description}</p>
            </div>

            <div className="content-section">
              <h2><CheckCircle2 size={24} /> Persyaratan</h2>
              <ul>
                {scholarship.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="content-section">
              <h2><DollarSign size={24} /> Keuntungan Beasiswa</h2>
              <ul>
                {scholarship.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="info-card">
              <h3 style={{ fontSize: '1.5rem' }}>Informasi Penting</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--accent-cyan-light)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tenggat Waktu</div>
                    <div style={{ fontWeight: 600 }}>{formattedDate}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--accent-cyan-light)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Nilai Beasiswa</div>
                    <div style={{ fontWeight: 600 }}>{scholarship.value}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--accent-cyan-light)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Lokasi / Jenis</div>
                    <div style={{ fontWeight: 600 }}>{scholarship.type}</div>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1rem' }} onClick={() => alert('Fitur Pendaftaran akan segera hadir!')}>
                Daftar Sekarang
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                *Akan diarahkan ke website resmi penyelenggara
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
