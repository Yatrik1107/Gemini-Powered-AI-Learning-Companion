// // import React, { useEffect, useState } from "react";
// // import "./shubham.css";

// // const Shubham = () => {
// //   const [player, setPlayer] = useState(null);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [transcriptionData, setTranscriptionData] = useState([]);
// //   const [transcriptionText, setTranscriptionText] = useState(
// //     "Loading transcription..."
// //   );
// //   const [noteInput, setNoteInput] = useState("");
// //   const [noteList, setNoteList] = useState([]);

// //   // Load YouTube IFrame API script
// //   useEffect(() => {
// //     const tag = document.createElement("script");
// //     tag.src = "https://www.youtube.com/iframe_api";
// //     document.body.appendChild(tag);

// //     // This function will be called by the YouTube API when it's ready
// //     window.onYouTubeIframeAPIReady = () => {
// //       const newPlayer = new window.YT.Player("youtube-player", {
// //         height: "486",
// //         width: "864",
// //         videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
// //         events: {
// //           onReady: onPlayerReady,
// //           onStateChange: onPlayerStateChange,
// //         },
// //       });
// //       setPlayer(newPlayer);
// //     };

// //     // Cleanup function
// //     return () => {
// //       if (player) {
// //         player.destroy();
// //       }
// //     };
// //   }, []);

// //   // Fetch transcription data when component mounts
// //   useEffect(() => {
// //     const fetchTranscription = async () => {
// //       try {
// //         const response = await fetch("transcription.json"); // Replace with your transcription data source
// //         const data = await response.json();
// //         console.log("Fetched Transcription Data:", data);
// //         setTranscriptionData(data);
// //       } catch (error) {
// //         console.error("Error fetching transcription data:", error);
// //         setTranscriptionData([]);
// //       }
// //     };

// //     fetchTranscription();
// //   }, []);

// //   // Update current time every second when player is ready
// //   useEffect(() => {
// //     let interval;
// //     if (player) {
// //       interval = setInterval(() => {
// //         if (player && player.getCurrentTime) {
// //           const time = player.getCurrentTime();
// //           setCurrentTime(time);
// //           console.log("Current Time:", time);
// //         }
// //       }, 1000);
// //     }
// //     return () => clearInterval(interval);
// //   }, [player]);

// //   // Update transcription whenever current time or transcription data changes
// //   useEffect(() => {
// //     updateTranscription(currentTime);
// //   }, [currentTime, transcriptionData]);

// //   // Player event handlers
// //   const onPlayerReady = (event) => {
// //     console.log("Player ready");
// //   };

// //   const onPlayerStateChange = (event) => {
// //     if (event.data === window.YT.PlayerState.PLAYING) {
// //       console.log("Video playing");
// //     }
// //   };

// //   // Update the transcription based on the current time
// //   const updateTranscription = (time) => {
// //     if (!transcriptionData.length) {
// //       setTranscriptionText("No transcription data available.");
// //       return;
// //     }

// //     console.log("Checking transcription for time:", time);

// //     const currentTranscription = transcriptionData.find(
// //       (t) => time >= t.time && time < t.time + 30
// //     );

// //     if (currentTranscription) {
// //       setTranscriptionText(currentTranscription.text);
// //     } else {
// //       setTranscriptionText("Transcription not available for this time.");
// //     }
// //   };

// //   // Handle saving notes
// //   const handleSaveNote = () => {
// //     if (noteInput) {
// //       const note = `${noteInput} (at ${Math.floor(currentTime)}s)`;
// //       setNoteList([...noteList, note]);
// //       setNoteInput("");
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <h1>YouTube Video with Transcription and Notes</h1>
// //       <div className="video-wrapper">
// //         {/* YouTube player will be injected here */}
// //         <div id="youtube-player"></div>
// //       </div>
// //       <div className="transcription-notes-wrapper">
// //         <div className="transcription">
// //           <h2>Transcription</h2>
// //           <p id="transcription-text">{transcriptionText}</p>
// //         </div>
// //         <div className="notes">
// //           <h2>Notes</h2>
// //           <textarea
// //             id="note-input"
// //             placeholder="Take your notes here..."
// //             value={noteInput}
// //             onChange={(e) => setNoteInput(e.target.value)}
// //           />
// //           <button id="save-note-btn" onClick={handleSaveNote}>
// //             Save Note
// //           </button>
// //           <ul id="note-list">
// //             {noteList.map((note, index) => (
// //               <li key={index}>{note}</li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Shubham;

// import React, { useEffect, useState } from "react";
// import "./shubham.css";

// const Shubham = () => {
//   const [player, setPlayer] = useState(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [transcriptionData, setTranscriptionData] = useState([]);
//   const [transcriptionText, setTranscriptionText] = useState(
//     "Loading transcription..."
//   );
//   const [noteInput, setNoteInput] = useState("");
//   const [noteList, setNoteList] = useState([]);
//   const [isPlayerReady, setIsPlayerReady] = useState(false);

//   // Load YouTube IFrame API script
//   useEffect(() => {
//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     document.body.appendChild(tag);

//     // This function will be called by the YouTube API when it's ready
//     window.onYouTubeIframeAPIReady = () => {
//       const newPlayer = new window.YT.Player("youtube-player", {
//         height: "486",
//         width: "864",
//         videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
//         events: {
//           onReady: onPlayerReady,
//           onStateChange: onPlayerStateChange,
//         },
//       });
//       setPlayer(newPlayer);
//     };

//     // Cleanup function
//     return () => {
//       if (player) {
//         player.destroy();
//       }
//     };
//   }, []);

//   // Fetch transcription data when component mounts
//   useEffect(() => {
//     const fetchTranscription = async () => {
//       try {
//         const response = await fetch("/path/to/transcription.json"); // Update the path accordingly
//         const data = await response.json();
//         console.log("Fetched Transcription Data:", data);
//         setTranscriptionData(data);
//       } catch (error) {
//         console.error("Error fetching transcription data:", error);
//         setTranscriptionData([]);
//       }
//     };

//     fetchTranscription();
//   }, []);

//   // Update current time every second when player is ready
//   useEffect(() => {
//     let interval;
//     if (player && isPlayerReady) {
//       interval = setInterval(() => {
//         if (player && player.getCurrentTime) {
//           const time = player.getCurrentTime();
//           setCurrentTime(time);
//           console.log("Current Time:", time);
//         }
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [player, isPlayerReady]);

//   // Update transcription whenever current time or transcription data changes
//   useEffect(() => {
//     if (transcriptionData.length > 0) {
//       updateTranscription(currentTime);
//     }
//   }, [currentTime, transcriptionData]);

//   // Player event handlers
//   const onPlayerReady = (event) => {
//     console.log("Player ready");
//     setIsPlayerReady(true);
//   };

//   const onPlayerStateChange = (event) => {
//     if (event.data === window.YT.PlayerState.PLAYING) {
//       console.log("Video playing");
//     }
//   };

//   // Update the transcription based on the current time
//   const updateTranscription = (time) => {
//     if (!transcriptionData.length) {
//       setTranscriptionText("No transcription data available.");
//       return;
//     }

//     console.log("Checking transcription for time:", time);

//     // Adjust time matching logic based on your transcription data
//     const currentTranscription = transcriptionData.find(
//       (t) => time >= t.startTime && time < t.endTime
//     );

//     if (currentTranscription) {
//       setTranscriptionText(currentTranscription.text);
//     } else {
//       setTranscriptionText("Transcription not available for this time.");
//     }
//   };

//   // Handle saving notes
//   const handleSaveNote = () => {
//     if (noteInput) {
//       const note = `${noteInput} (at ${Math.floor(currentTime)}s)`;
//       setNoteList([...noteList, note]);
//       setNoteInput("");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>YouTube Video with Transcription and Notes</h1>
//       <div className="video-wrapper">
//         {/* YouTube player will be injected here */}
//         <div id="youtube-player"></div>
//       </div>
//       <div className="transcription-notes-wrapper">
//         <div className="transcription">
//           <h2>Transcription</h2>
//           <p id="transcription-text">{transcriptionText}</p>
//         </div>
//         <div className="notes">
//           <h2>Notes</h2>
//           <textarea
//             id="note-input"
//             placeholder="Take your notes here..."
//             value={noteInput}
//             onChange={(e) => setNoteInput(e.target.value)}
//           />
//           <button id="save-note-btn" onClick={handleSaveNote}>
//             Save Note
//           </button>
//           <ul id="note-list">
//             {noteList.map((note, index) => (
//               <li key={index}>{note}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shubham;

import React, { useEffect, useState, useRef } from "react";
import "./shubham.css";

const Shubham = () => {
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [transcriptionData, setTranscriptionData] = useState([]);
  const [transcriptionText, setTranscriptionText] = useState(
    "Loading transcription..."
  );
  const [noteInput, setNoteInput] = useState("");
  const [noteList, setNoteList] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const timeUpdateInterval = useRef(null);

  // Load YouTube IFrame API script
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // This function will be called by the YouTube API when it's ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("youtube-player", {
        height: "486",
        width: "864",
        videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(newPlayer);
    };

    // Cleanup function
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  // Fetch transcription data when component mounts
  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const response = await fetch("./script.js"); // Update the path accordingly
        const data = await response.json();
        console.log("Fetched Transcription Data:", data);
        setTranscriptionData(data);
      } catch (error) {
        console.error("Error fetching transcription data:", error);
        setTranscriptionData([]);
      }
    };

    fetchTranscription();
  }, []);

  // Player event handlers
  const onPlayerReady = (event) => {
    console.log("Player ready");
    setIsPlayerReady(true);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log("Video playing");
      // Start updating currentTime
      if (!timeUpdateInterval.current) {
        timeUpdateInterval.current = setInterval(() => {
          if (player && player.getCurrentTime) {
            const time = player.getCurrentTime();
            setCurrentTime(time);
            console.log("Current Time:", time);
          }
        }, 500); // Update every 500ms for smoother transcription update
      }
    } else {
      // Video paused or stopped, clear the interval
      if (timeUpdateInterval.current) {
        clearInterval(timeUpdateInterval.current);
        timeUpdateInterval.current = null;
      }
    }
  };

  // Update transcription whenever current time changes
  useEffect(() => {
    if (transcriptionData.length > 0) {
      updateTranscription(currentTime);
    }
  }, [currentTime]);

  // Update the transcription based on the current time
  const updateTranscription = (time) => {
    if (!transcriptionData.length) {
      setTranscriptionText("No transcription data available.");
      return;
    }

    console.log("Checking transcription for time:", time);

    const currentTranscription = transcriptionData.find(
      (t) => time >= t.startTime && time < t.endTime
    );

    if (currentTranscription) {
      console.log("Found transcription:", currentTranscription.text);
      setTranscriptionText(currentTranscription.text);
    } else {
      console.log("No transcription found for this time.");
      setTranscriptionText("Transcription not available for this time.");
    }
  };

  // Handle saving notes
  const handleSaveNote = () => {
    if (noteInput) {
      const note = `${noteInput} (at ${Math.floor(currentTime)}s)`;
      setNoteList([...noteList, note]);
      setNoteInput("");
    }
  };

  return (
    <div className="container">
      <h1>YouTube Video with Transcription and Notes</h1>
      <div className="video-wrapper">
        {/* YouTube player will be injected here */}
        <div id="youtube-player"></div>
      </div>
      <div className="transcription-notes-wrapper">
        <div className="transcription">
          <h2>Transcription</h2>
          <p id="transcription-text">{transcriptionText}</p>
        </div>
        <div className="notes">
          <h2>Notes</h2>
          <textarea
            id="note-input"
            placeholder="Take your notes here..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
          <button id="save-note-btn" onClick={handleSaveNote}>
            Save Note
          </button>
          <ul id="note-list">
            {noteList.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shubham;
