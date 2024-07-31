import { Link } from "react-router-dom";
import { messages } from "./Messages";

function getRandom404Message() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

const ErrorRoot = () => {
  const headline = getRandom404Message();
  return (
    <div>
      <h1>{headline}</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default ErrorRoot;
