import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const SERVER_URL = "http://127.0.0.1:5000"

const Reel = () => {
    const [reel, setReel] = useState({});
    const [room, setRoom] = useState('');

    const updateVideoScreen = async (reel_id) => {
        const url = `${SERVER_URL}/api/data?url=${reel_id}`;
        try {
            const response = await fetch(url);
    
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
            return
        }
        if (reel.song.length < 40) {
            return
        }
        const reel_id = reel.song.substring(31, 42);
        updateVideoScreen(reel_id);
    }, [reel.song]);

    const changeRoom = (e) => {
        setRoom(e.target.value);
    };
    return (
        <section>
            <div>
                <input type="text" placeholder="Room ID" onChange={changeRoom} />
            </div>
            <video src="" playsInline autoPlay loop className="video"></video>
        </section>
    );
};

export default Reel;
