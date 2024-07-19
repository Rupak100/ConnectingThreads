import { Container, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import userAtom from "./atom/userAtom";
import { useRecoilValue } from "recoil";

import UpdatePage from "./pages/UpdatePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import Settings from "./pages/Settings";
function App() {
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  return (
    <Box position={"relative"} w="full">
      <Container
        maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
      >
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
          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
