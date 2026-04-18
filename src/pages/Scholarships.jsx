import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ScholarshipCard from '../components/ScholarshipCard';
import { scholarships } from '../data/scholarships';

export default function Scholarships() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [filterLevel, setFilterLevel] = useState('All');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);

  useEffect(() => {
    // Update local state when URL changes
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    // Filter logic
    let result = scholarships;
    
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(lowercasedSearch) ||
        s.provider.toLowerCase().includes(lowercasedSearch) ||
        s.description.toLowerCase().includes(lowercasedSearch) ||
        s.type.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (filterLevel !== 'All') {
      result = result.filter(s => s.level.includes(filterLevel));
    }

    setFilteredScholarships(result);
  }, [searchTerm, filterLevel]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ q: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Eksplorasi <span className="text-gradient">Beasiswa</span></h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Temukan beasiswa yang sesuai dengan profil dan impian akademis Anda.
      </p>

      {/* Controls */}
      <div className="flex" style={{ gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <form onSubmit={handleSearchSubmit} className="search-container" style={{ margin: 0, flexGrow: 1, maxWidth: 'none' }}>
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Cari nama beasiswa, instansi, atau negara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: '1rem', color: 'var(--text-secondary)' }}>
            <Filter size={18} />
          </div>
          <select 
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            style={{
              appearance: 'none',
              padding: '1rem 3rem 1rem 3rem',
              borderRadius: '999px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="All">Semua Jenjang</option>
            <option value="S1">S1 (Sarjana)</option>
            <option value="S2">S2 (Magister)</option>
            <option value="S3">S3 (Doktoral)</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filteredScholarships.length > 0 ? (
        <>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Menampilkan {filteredScholarships.length} beasiswa
          </p>
          <div className="card-grid">
            {filteredScholarships.map(scholarship => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tidak ada beasiswa ditemukan</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Coba gunakan kata kunci lain atau ubah filter jenjang.</p>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '1.5rem' }}
            onClick={() => {
              setSearchTerm('');
              setFilterLevel('All');
              setSearchParams({});
            }}
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
