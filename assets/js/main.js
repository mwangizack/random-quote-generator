const quoteText = document.querySelector(".quote");
let authorName = document.querySelector(".author .name");
let quoteButton = document.querySelector("button");
let soundButton = document.querySelector(".sound");
let copyButton = document.querySelector(".copy");
let twitterButton = document.querySelector(".twitter");

//random quote function
function randomQuote() {
  quoteButton.classList.add("loading");
  quoteButton.innerText = "Loading Quote...";

  //fetching random quotes from API and parsing it into JavaScript object
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteButton.innerText = "Next Quote";
      quoteButton.classList.remove("loading");
    });
}

quoteButton.addEventListener("click", randomQuote);

soundButton.addEventListener("click", () => {
  //the SpeechSynthesisUtterance is a web speech api that represents a speech request
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

copyButton.addEventListener("click", () => {
  //writeText() property writes the specified text string to the system clipboard
  navigator.clipboard.writeText(
    `"${quoteText.innerText}" by ${authorName.innerText}.`
  );
});

twitterButton.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank"); //opening a new twitter tab with passing quote in the url
});
