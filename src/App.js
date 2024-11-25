// import Link from "./components/Link";
import Sidebar from "./components/Sidebar";
import Route from "./components/Route";
import AccordionPage from "./pages/AccordionPage";
import DropdownPage from "./pages/DropdownPage";
import ButtonPage from "./pages/ButtonPage";
import ModalPage from "./pages/ModalPage";
// import Link from "./components/Link";

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div className="col-spans-5">
        <Route path="/accordion">
          <AccordionPage />
        </Route>

        <Route path="/">
          <DropdownPage />
        </Route>

        {/* Route의 path = Link의 to 속성과 같아야 알맞게 이동함 */}
        {/* Link - navigate함수: to prop값을 currentPath 상태값으로 설정하는 역할 */}
        {/* Route - path prop값과 currentPath값을 context로부터 빼내와 이 둘이 같으면, children을 리턴하여 화면을 리렌더링 */}
        <Route path="/buttons">
          <ButtonPage />
        </Route>

        <Route path="/modal">
          <ModalPage />
        </Route>
      </div>
    </div>
  );
}

export default App;
