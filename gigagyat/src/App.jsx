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

        const image = new Image();
        image.src = "bunn.png";  // Replace this with the actual path to your image file

        // Wait for the image to load before starting the animation
        image.onload = () => {
            const images = Array.from({ length: 100 }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
            }));

            function animate() {
                ctx.clearRect(0, 0, width, height);
                images.forEach((img) => {
                    img.x += img.speedX;
                    img.y += img.speedY;

                    if (img.x < 0 || img.x > width) img.speedX *= -1;
                    if (img.y < 0 || img.y > height) img.speedY *= -1;

                    ctx.drawImage(image, img.x, img.y, 50, 50); // Adjust size of the image (50x50) as needed
                });
                requestAnimationFrame(animate);
            }

            animate();
        };

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
                </div>
            </header>
            <img 
                src="gra.jpg" 
                alt="Logo" 
                className="top-left-logo"
            />
            <main className="main">
                <Reel />
            </main>
        </div>
    );
}

export default App;
