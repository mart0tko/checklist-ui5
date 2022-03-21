import {
  ShellBar,
  ThemeProvider
} from '@ui5/webcomponents-react';
import './App.css';
import Checklist from './Pages/Checklist';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ShellBar primaryTitle="Checklist" />
        <Routes>
          <Route path="/" element={<Checklist/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
