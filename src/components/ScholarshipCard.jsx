import { Calendar, Building, GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ScholarshipCard({ scholarship }) {
  // Format date nicely
  const formattedDate = new Date(scholarship.deadline).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="card">
      <span className="card-tag">{scholarship.level}</span>
      <h3 className="card-title">{scholarship.title}</h3>
      <div className="card-provider">
        <Building size={16} />
        {scholarship.provider}
      </div>
      
      <div className="card-details">
        <div className="card-detail-item">
          <Calendar size={16} className="card-detail-icon" />
          <span>Tenggat Waktu: <strong className="text-cyan">{formattedDate}</strong></span>
        </div>
        <div className="card-detail-item">
          <GraduationCap size={16} className="card-detail-icon" />
          <span>Nilai Beasiswa: {scholarship.value}</span>
        </div>
        <div className="card-detail-item">
          <MapPin size={16} className="card-detail-icon" />
          <span>Jenis: {scholarship.type}</span>
        </div>
      </div>

      <Link to={`/scholarship/${scholarship.id}`} className="btn btn-outline" style={{ marginTop: 'auto', width: '100%' }}>
        Detail Beasiswa <ArrowRight size={18} />
      </Link>
    </div>
  );
}
