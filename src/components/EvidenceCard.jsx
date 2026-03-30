import { useState } from 'react';

const EvidenceCard = ({ file, uploaded, hash }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.warn('Clipboard unavailable', error);
    }
  };

  return (
    <article className="evidence-card">
      <div className="evidence-head">
        <h4>{file}</h4>
        <span className="verified-badge">Verified</span>
      </div>
      <p className="evidence-meta">{uploaded}</p>
      <code>{hash}</code>
      <button type="button" className="copy-button" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy hash'}
      </button>
    </article>
  );
};

export default EvidenceCard;
