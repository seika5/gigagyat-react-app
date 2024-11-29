import React, { useEffect } from "react";
import './App.css';
import Reel from "./Components/reel.jsx";

function App() {
    useEffect(() => {
        const canvas = document.getElementById("backgroundCanvas");
        const ctx = canvas.getContext("2d");
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const dots = Array.from({ length: 100 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
        }));

        function animate() {
            ctx.clearRect(0, 0, width, height);
            dots.forEach((dot) => {
                dot.x += dot.speedX;
                dot.y += dot.speedY;

                if (dot.x < 0 || dot.x > width) dot.speedX *= -1;
                if (dot.y < 0 || dot.y > height) dot.speedY *= -1;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();
            });
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener("resize", () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });

        return () => {
            window.removeEventListener("resize", () => {});
        };
    }, []);

    document.title = "gigagyat";

    return (
        <div className="App">
            <canvas id="backgroundCanvas"></canvas>
            <header className="header">
                <div className="button-group">
                    <button
                        className="custom-button"
                        onClick={() => window.open("https://github.com/seika5/gigagyat", "_blank")}
                    >
                        Browser Extension
                    </button>
                    <button
                        className="custom-button"
                        onClick={() => window.open("https://github.com/Teddygat0r/gigagyat", "_blank")}
                    >
                        API
                    </button>
                </div>
            </header>
            <main className="main">
                <Reel />
            </main>
        </div>
    );
}

export default App;
