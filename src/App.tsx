import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import EcosystemBuilder from './pages/EcosystemBuilder';
import ArticleGrid from './pages/ArticleGrid';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="builder" element={<EcosystemBuilder />} />
        <Route path="intelligence" element={<ArticleGrid />} />
        {/* We will add Dashboard, Services, Blog routes here later */}
      </Route>
    </Routes>
  );
}

export default App;
