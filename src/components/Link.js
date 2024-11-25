// import { useContext } from "react";
// import NavigationContext from "../context/navigation";
import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

function Link({ to, children, className, activeClassName }) {
  // const { navigate } = useContext(NavigationContext);
  const { navigate, currentPath } = useNavigation();
  const classes = classNames(
    "text-blue-500",
    className,
    currentPath === to && activeClassName
  );

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
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
