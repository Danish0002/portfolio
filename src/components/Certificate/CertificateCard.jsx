// src/components/Certificate/CertificateCard.jsx
import React from 'react';
import './CertificateCard.css';

const CertificateCard = ({ title, issuer, date, certificateLink, image }) => {
  return (
    <div className="certificate-card">
      <img src={image} alt={title} className="certificate-image" />
      <div className="certificate-title">{title}</div>
      <div className="certificate-issuer">Issued by: {issuer}</div>
      <div className="certificate-date">Date: {date}</div>
      <a href={certificateLink} className="certificate-link" target="_blank" rel="noopener noreferrer">
        View Certificate
      </a>
    </div>
  );
};

export default CertificateCard;
