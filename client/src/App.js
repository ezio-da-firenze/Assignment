import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import Header from './Components/Header/Header.component';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;