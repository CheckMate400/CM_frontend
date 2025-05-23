import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import NewProject from './pages/NewProject';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
          </>
        } />
        <Route path="/new" element={<NewProject />} />
      </Routes>
    </>
  );
}

export default App;
