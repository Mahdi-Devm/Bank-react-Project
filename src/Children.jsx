import "./children.css";
function Children({ changepoints, handlePoints }) {
  return (
    <div className="children-box">
      <ul className="children-list">
        {[
          "Give your mom a hug.",
          "Say 'I love you' to her.",
          "Help her with house chores.",
          "Listen to her stories attentively.",
        ].map((text, index) => (
          <li key={index}>
            <input
              onClick={handlePoints}
              type="checkbox"
              id={`checkbox-${index}`}
              value={changepoints}
            />
            <label htmlFor={`checkbox-${index}`}>{text}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Children;
