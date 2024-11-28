import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';

const Reel = () => {
    const [reel, setReel] = useState({});
    const [room, setRoom] = useState('');

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
        // Only load and process the script when `reel.song` changes
        if (reel.song) {
            // Remove the existing script if it exists
            const existingScript = document.querySelector('#instagram-embed-script');
            if (existingScript) {
                existingScript.parentNode.removeChild(existingScript);
            }


            const existingIframe= document.querySelector("iframe");
            if (existingIframe) {
                existingIframe.parentNode.removeChild(existingIframe);
            }

            const blockquote = document.createElement('blockquote');
            blockquote.className = 'instagram-media';
            blockquote.setAttribute('data-instgrm-captioned', '');
            blockquote.setAttribute('data-instgrm-permalink', reel.song);
            blockquote.setAttribute('data-instgrm-version', '14');

            // Append the new blockquote to the appropriate container
            document.body.appendChild(blockquote);

            // Create and add the new script
            const script = document.createElement('script');
            script.id = 'instagram-embed-script';
            script.src = 'https://www.instagram.com/embed.js';
            script.async = true;
            script.onload = () => {
                window.instgrm.Embeds.process(); // Reprocess embeds after the script loads
            };
            document.body.appendChild(script);
        }
    }, [reel.song]);

    const changeRoom = (e) => {
        setRoom(e.target.value);
    };
    //key={reel.song}
    return (
        <section>
            <div>
                <input type="text" placeholder="Room ID" onChange={changeRoom} />
            </div>
        </section>
    );
};

export default Reel;
