const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellJoke(joke) {
    VoiceRSS.speech({
        key: '41ac6400db234c46b7c9d1bfc60ef37b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        // wait for response to be converted to json to set data value
        const data = await response.json();
        // Assign two part or one part joke
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        // Passing Joke to VoiceRSS API
        tellJoke(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('Fetch failed', error);
    }
    console.log(joke);
}

// Event Listeners
button.addEventListener('click', getJokes);
// ended returns whether playback of audio has ended or not
audioElement.addEventListener('ended', toggleButton);
