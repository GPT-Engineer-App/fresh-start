import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import UserData from "./pages/UserData.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/user-data" element={<UserData />} />
      </Routes>
    </Router>
  );
}

export default App;
