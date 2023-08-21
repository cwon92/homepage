import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import  List  from './components/List';
import Main from './components/Main';



function App() {
  return (

    <div className="App">

    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/list" element={<List />}/>
      
    </Routes>
      
    </div>
  );
}

export default App;
