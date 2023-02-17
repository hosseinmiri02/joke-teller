const audioElement = document.getElementById("audio");
const btn = document.getElementById("btn");

// Disable/Enable Button
const toggleButton = function () {
  btn.disabled = !btn.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = function (joke) {
  VoiceRSS.speech({
    key: "cb41d70fbdb54114abab9a824bfd7f56",
    src: `${joke}`,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Get Jokes form Joke API
const getJokes = async function () {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disabled Button
    toggleButton();
  } catch (err) {
    console.error(err);
  }
};

// Event Listeners
btn.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
