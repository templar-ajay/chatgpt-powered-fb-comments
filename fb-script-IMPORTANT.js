let replaceText = "Good Morning";

function generateComment(topic) {
  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    body: {
      model: "text-davinci-003",
      prompt: "write facebook comment on " + topic,
      max_tokens: 7,
      temperature: 0,
    },
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (replaceText = data));
}

window.onkeydown = (event) => {
  console.log(event.key);
  const str = document.getSelection()?.anchorNode.data;
  if (str?.includes("*2")) {
    setTimeout(() => {
      console.log(str);
      document.getSelection().anchorNode.data = str.replace("*2", replaceText);
    }, 1000);
  }
};
