import './App.css';
import Reel from "./Components/reel.jsx";

function App() {
    document.title = "Jamster";
    return (
        <div className="App">
            <a href="https://github.com/seika5/gigagyat">Browser Extension</a>
            <Reel></Reel>
        </div>
    );
}

export default App;
