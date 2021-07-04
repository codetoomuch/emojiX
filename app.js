const searchEmojiInput = document.querySelector(".searchEmoji");
const emojiContainer = document.querySelector(".emojiContainer");
const emojiList = document.querySelector(".emojiList");
const loading = document.querySelector(".loading");

searchEmojiInput.addEventListener("input", searchEmoji);

let emojis;

const getEmoji = async () => {
  const res = await fetch(
    "https://emoji-api.com/emojis?access_key=fc345eef934edab724d45751275dbfa0654aa322"
  );

  const data = await res.json();

  emojis = data;
};

getEmoji();

const statusCheck = () => {
  const intervalID = setInterval(() => {
    if (emojis === undefined) {
      loading.classList.add("active");
    } else {
      loading.classList.remove("active");
      loading.remove();

      emojis.forEach((emoji) => {
        emojiListFunc(emoji);
      });

      clearInterval(intervalID);
    }
  }, 1000);
};

statusCheck();

function searchEmoji(e) {
  e.preventDefault();

  const searchQuery = e.target.value.trim().toLowerCase();
  showEmojiList(searchQuery);
}

const showEmojiList = (searchQuery) => {
  emojiList.innerHTML = "";

  emojis
    .filter((emoji) => emoji.slug.includes(searchQuery))
    .forEach((emoji) => {
      emojiListFunc(emoji);
    });

  const copyEmojiButton = document.querySelectorAll(".copyEmoji");

  copyEmojiButton.forEach((button) =>
    button.addEventListener("click", (e) => {
      copyButtonFunc(e.target.id);
    })
  );
};

const emojiListFunc = (emoji) => {
  const input = document.createElement("input");

  input.textContent = emoji.character;
  input.value = emoji.character;
  input.id = emoji.unicodeName;
  input.classList.add("copyEmoji");

  emojiList.appendChild(input);
};

const copyButtonFunc = (target) => {
  const copyEmoji = document.getElementById(`${target}`);

  // make sure its an editable area before using select(), i.e input/textarea

  copyEmoji.select();

  // make sure to use document.execCommand('copy') as this function is only available with document
  // not with other individual document nodes

  document.execCommand("copy");
};
