// script.js

async function shortenUrl() {
  const longUrl = document.getElementById('longUrl').value;
  const apiUrl = 'https://url-shortener-service.p.rapidapi.com/shorten';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '2a93d0c867mshc1f6107d9b9294ep109e6bjsn3d1e3267947b',
      'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
    },
    body: new URLSearchParams({
      url: longUrl
    })
  };

  try {
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error shortening URL:', errorData);

      // Handle error here
      handleInvalidUrl(errorData.error || 'Invalid URL');
      return;
    }

    const resultData = await response.json();
    const shortenedUrl = resultData.result_url;

    // Display the shortened URL
    displayShortenedUrl(shortenedUrl);
  } catch (error) {
    console.error('Error shortening URL:', error);

    // Handle error here
    handleInvalidUrl('An unexpected error occurred');
  }
}

function handleInvalidUrl(errorMessage) {
  // Add the 'shake' class to the card
  const card = document.querySelector('.card');
  card.classList.add('shake');

  // Display the error message
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.innerText = "Please Enter a Valid URL !";
  errorContainer.style.color = 'red';

  // Remove the 'shake' class and hide the error message after the animation completes
  setTimeout(() => {
    card.classList.remove('shake');
    errorContainer.innerText = '';
  }, 2000); // Adjust the time based on your animation duration
}

function displayShortenedUrl(shortenedUrl) {
  // Display the shortened URL in the container
  const shortenedUrlContainer = document.getElementById('shortenedUrlContainer');
  shortenedUrlContainer.innerHTML = `
    <div class="alert alert-secondary mt-3 float-in" role="alert">
      <div class="d-flex justify-content-between align-items-center">
        <span>${shortenedUrl}</span>
        <button class="btn btn-dark btn-sm" onclick="copyToClipboard('${shortenedUrl}')">
          <i class="far fa-copy"></i> Copy
        </button>
      </div>
    </div>
  `;
}

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // Optionally, you can provide user feedback (e.g., show a tooltip)
  const copyButton = document.querySelector('.btn-dark');
  copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
  setTimeout(() => {
    copyButton.innerHTML = '<i class="far fa-copy"></i> Copy';
  }, 2000); // Reset the button text after 2 seconds
}


document.getElementById('urlShortenerForm').addEventListener('reset', () => {
  removeShortenedUrlContainer();
});

