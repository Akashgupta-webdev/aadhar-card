import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Homepage from './component/Homepage';
import Aadharpage from './component/Aadharpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aadhar" element={<Aadharpage />} />
      </Routes>
    </Router>
  )
}

export default App
