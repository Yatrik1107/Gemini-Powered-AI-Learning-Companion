document.getElementById('generate-notes').addEventListener('click', async () => {
    const url = document.getElementById('youtube-url').value;
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('transcription-result');

    loadingDiv.style.display = 'block'; // Show loading indicator
    resultDiv.innerText = ''; // Clear previous results

    try {
        const response = await fetch('/generate-notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.innerText = `Error: ${data.error}`;
        } else {
            resultDiv.innerText = `Transcription:\n${data.transcription}`;
        }
    } catch (error) {
        resultDiv.innerText = `Error: ${error.message}`;
    } finally {
        loadingDiv.style.display = 'none'; // Hide loading indicator
    }
});
