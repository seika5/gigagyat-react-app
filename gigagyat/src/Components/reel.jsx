import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const SERVER_URL = "http://74.179.81.73";

const Reel = () => {
    const [reel, setReel] = useState({});
    const [room, setRoom] = useState('');

    const updateVideoScreen = async (reel_id) => {
        const url = `${SERVER_URL}/api/data?url=${reel_id}`;
        console.log(url)

        try {
            const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
            const rJson = await response.json();
            const target = rJson["url"];
            const existingVideo = document.querySelector("video");
            existingVideo.src = target;
        } catch (error) {
            return;
        }
    }

    useEffect(() => {
        if (!room) return;

        const docRef = collection(db, "room");
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                if (doc.id === room) {
                    setReel(doc.data());
                }
            });
        });

        return () => {
            unsubscribe();
        };
    }, [room]);

    useEffect(() => {
        if (!reel.song) {
            return;
        }
        if (reel.song.length < 40) {
            return;
        }
        const reel_id = reel.song.substring(31, 42);
        updateVideoScreen(reel_id);
    }, [reel.song]);

    const changeRoom = (e) => {
        setRoom(e.target.value);
    };

    return (
        <section>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Enter Room ID" 
                    onChange={changeRoom} 
                    className="room-input"
                />
            </div>
            <video 
                src="" 
                playsInline 
                autoPlay 
                loop 
                className={`video ${reel.song ? 'has-border' : ''}`}
            ></video>
        </section>
    );
};

export default Reel;
