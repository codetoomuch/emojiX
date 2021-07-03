const searchEmojiInput = document.querySelector(".searchEmoji");
const emojiContainer = document.querySelector(".emojiContainer");
const emojiList = document.querySelector(".emojiList");

searchEmojiInput.addEventListener("input", searchEmoji);

let emojis;

const statusCheck = () => {
  setInterval(() => {
    if (emojis === undefined) {
      console.log("wait");
    }
  }, 1000);
  clearInterval(() => {
    if (emojis !== undefined) {
      console.log("ready to fire");
    }
  });
};

statusCheck();

const getEmoji = async () => {
  const res = await fetch(
    "https://emoji-api.com/emojis?access_key=fc345eef934edab724d45751275dbfa0654aa322"
  );

  const data = await res.json();

  emojis = data;
};

getEmoji();

function searchEmoji(e) {
  e.preventDefault();

  const searchQuery = e.target.value.trim().toLowerCase();
  showEmojiList(searchQuery);
  if (searchQuery.length === 0) {
    emojiList.innerHTML = "";
  }
}

const showEmojiList = (searchQuery) => {
  emojiList.innerHTML = "";

  emojis
    .filter((emoji) => emoji.unicodeName.includes(searchQuery))
    .forEach((emoji) => {
      const li = document.createElement("input");

      // emoji button

      li.textContent = emoji.character;
      li.value = emoji.character;
      li.id = emoji.unicodeName;
      li.classList.add("copyEmojiButton");

      emojiList.appendChild(li);
    });

  const copyEmojiButton = document.querySelectorAll(".copyEmojiButton");

  copyEmojiButton.forEach((button) =>
    button.addEventListener("click", (e) => {
      console.log(e.target);
      copyButtonFunc(e.target);
    })
  );
};

const copyButtonFunc = (target) => {
  console.log(target);
  const copyEmoji = document.getElementById(`${target.id}`);
  console.log(copyEmoji);

  // make sure its an editable area before using select(), i.e input/textarea

  copyEmoji.select();

  // make sure to use document.execCommand('copy') as this function is only available with document
  // not with other individual document nodes

  document.execCommand("copy");
};
