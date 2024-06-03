import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
