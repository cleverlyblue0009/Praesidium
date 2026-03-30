import CategoryBadge from './CategoryBadge';

const FeedCard = ({ category, description, location, timestamp, verification }) => (
  <article className="feed-card card-glow">
    <CategoryBadge type={category} />
    <p className="feed-description">{description}</p>
    <div className="feed-meta">
      <span>{location}</span>
      <span>{timestamp}</span>
    </div>
    <div className="verification-count">
      <span>Verification</span>
      <strong>{verification}</strong>
    </div>
  </article>
);

export default FeedCard;
