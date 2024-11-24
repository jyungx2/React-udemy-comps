import { useContext } from "react";
import NavigationContext from "../context/navigation";

function Link({ to, children }) {
  const { navigate } = useContext(NavigationContext);

  const handleClick = (event) => {
    // 💡 Handling Control and Command Keys
    // console.log(event); // metaKey(mac) | ctrlKey(windows)
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    // programmatically navigate to some other route/path.
    navigate(to);
  };

  // Prop 추가: href = {to}
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
