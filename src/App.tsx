import "./App.css";
import { NavBar, Footer, Content } from "./components";

function App() {
  return (
    <div className="App">
      {NavBar()}
      {Content()}
      {Footer()}
    </div>
  );
}

export default App;
