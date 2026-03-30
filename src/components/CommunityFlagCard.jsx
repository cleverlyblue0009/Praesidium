const CommunityFlagCard = ({ location, risk }) => (
  <article className="community-card">
    <h4>{location}</h4>
    <p>{risk}</p>
  </article>
);

export default CommunityFlagCard;
