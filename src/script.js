const API_KEY = "AIzaSyD4Bq24REDxaH3p82okx2Lh8EkKJSUGf6M"; // Replace with your API key
const VIDEO_ID = "aolI_Rz0ZqY"; // Replace with the video ID you want to fetch data for

async function fetchVideoData(videoId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.items.length === 0) {
      console.log("No video data found.");
      return;
    }

    const videoDetails = data.items[0];
    console.log("Video Data:", videoDetails);

    // Display video details
    displayVideoDetails(videoDetails);
  } catch (error) {
    console.error("Error fetching video data:", error);
  }
}

function displayVideoDetails(videoDetails) {
  const title = videoDetails.snippet.title;
  const description = videoDetails.snippet.description;
  const views = videoDetails.statistics.viewCount;

  document.getElementById("video-title").innerText = title;
  document.getElementById("video-description").innerText = description;
  document.getElementById("video-views").innerText = `Views: ${views}`;
}

// Fetch video data when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchVideoData(VIDEO_ID);
});
