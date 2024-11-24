import Button from "../components/Button";
import { GoBell } from "react-icons/go";

function ButtonPage() {
  const handleClick = () => {};

  return (
    <div>
      <div>
        <Button success rounded outline onClick={handleClick}>
          <GoBell />
          Click me!!
        </Button>
      </div>
      <div>
        <Button danger outline>
          Hi there!
        </Button>
      </div>
      <div>
        <Button warning outline>
          Bye guys~
        </Button>
      </div>
      <div>
        <Button secondary outline>
          So hungry
        </Button>
      </div>
      <div>
        <Button primary rounded>
          HEHE
        </Button>
      </div>
    </div>
  );
}

export default ButtonPage;
