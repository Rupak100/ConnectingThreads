import { Container } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import userAtom from "./atom/userAtom";
import { useRecoilValue } from "recoil";
import LogoutBtn from "./components/LogoutBtn";
import UpdatePage from "./pages/UpdatePage";
import CreatePost from "./components/CreatePost";
function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpdatePage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
      {user && <LogoutBtn />}
      {user && <CreatePost />}
    </Container>
  );
}

export default App;
