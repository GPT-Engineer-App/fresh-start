import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import UserData from "./pages/UserData.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/user-data" element={<UserData />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      {session ? (
        <Button onClick={logout} colorScheme="teal" mt={2}>Logout</Button>
      ) : (
        <Button as="a" href="/" colorScheme="teal" mt={2}>Login</Button>
      )}
    </Router>
  );
}

export default App;
