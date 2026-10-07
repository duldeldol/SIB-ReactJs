import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Keanu Reeves',
    role: 'Founder & Lead Developer',
    institution: 'Senior Software Architect',
    avatar: '/team/keanu.jpg',
    bio: 'Memimpin perancangan sistem dan pengembangan frontend aplikasi BookStore menggunakan React JS.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 2,
    name: 'Cillian Murphy',
    role: 'Head of Book Curation',
    institution: 'Literary & Editorial Lead',
    avatar: '/team/cillian.jpg',
    bio: 'Menyeleksi ribuan judul buku best-seller dan sastra bermutu tinggi agar relevan untuk setiap pembaca.',
    socials: {
      github: '#',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 3,
    name: 'Ryan Gosling',
    role: 'Lead UI/UX Designer',
    institution: 'Creative Design Specialist',
    avatar: '/team/ryan.jpg',
    bio: 'Merancang antarmuka BookStore yang minimalis, modern, dan nyaman untuk pengalaman eksplorasi buku.',
    socials: {
      github: '#',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 4,
    name: 'Zendaya',
    role: 'Head of Community & PR',
    institution: 'Public Relations & Marketing',
    avatar: '/team/zendaya.jpg',
    bio: 'Membangun relasi erat dengan komunitas pembaca serta menyebarkan semangat literasi ke generasi muda.',
    socials: {
      github: '#',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

function Team() {
  return (
    <div className="py-5 bg-white" id="team-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold text-dark">Orang-Orang di Balik BookStore</h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '650px' }}>
            Kami berdedikasi untuk mendekatkan pembaca dengan karya literasi terbaik melalui inovasi web dan kurasi terpercaya.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="row g-4 justify-content-center">
          {teamMembers.map((member) => (
            <div className="col-12 col-sm-6 col-lg-3" key={member.id}>
              <div className="card h-100 text-center border-0 shadow-sm rounded-4 p-3 book-card">
                <div className="mx-auto mt-3 mb-3 position-relative" style={{ width: '130px', height: '130px' }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="rounded-circle img-fluid w-100 h-100 border border-3 border-primary shadow-sm"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body p-2 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-dark mb-1">{member.name}</h5>
                    <p className="text-primary small fw-semibold mb-1">{member.role}</p>
                    <span className="badge bg-light text-secondary mb-3 border">{member.institution}</span>
                    <p className="card-text text-muted small">{member.bio}</p>
                  </div>

                  {/* Social Media Links */}
                  <div className="d-flex justify-content-center gap-2 mt-3 pt-3 border-top">
                    <a href={member.socials.github} className="social-icon" title="GitHub" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href={member.socials.linkedin} className="social-icon" title="LinkedIn" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href={member.socials.instagram} className="social-icon" title="Instagram" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
