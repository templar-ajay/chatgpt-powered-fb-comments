const textArea = document.querySelector("textarea");
let replaceText = "Good Morning";
let topic;
textArea.oninput = async () => {
  if (textArea.value.includes("*2")) {
    const str = textArea.value;
    await generateComment(topic);
    textArea.value = str.replace("*2", replaceText);
  }
};
async function generateComment(topic) {
  await fetch("http://localhost:3000/" + topic)
    .then((x) => x.json())
    .then((data) => (replaceText = data.data))
    .catch((err) => console.log(err));
}
