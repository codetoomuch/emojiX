const searchEmojiInput = document.querySelector(".searchEmoji");
const emojiContainer = document.querySelector(".emojiContainer");
const emojiList = document.querySelector(".emojiList");

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

const searchEmoji = (e) => {
  const searchQuery = e.target.value.toLowerCase();
  showEmojiList(searchQuery);
  if (searchQuery.length === 0) {
    emojiList.innerHTML = "";
  }
};

const showEmojiList = (searchQuery) => {
  emojiList.innerHTML = "";

  emojis
    .filter((emoji) => emoji.unicodeName.includes(searchQuery))
    .forEach((emoji) => {
      const div = document.createElement("div");
      const copyEmojiButton = document.createElement("input");

      // emoji button

      copyEmojiButton.type = "button";
      copyEmojiButton.value = emoji.character;
      copyEmojiButton.classList.add("copyEmojiButton");

      // emoji div

      div.classList.add("emoji");
      div.appendChild(copyEmojiButton);

      emojiList.appendChild(div);
    });

  const copyEmojiButton = document.querySelectorAll(".copyEmojiButton");

  copyEmojiButton.forEach((button) =>
    button.addEventListener("click", () => {
      const copyEmoji = button.value;
      // copyEmoji.select();
      //  copyEmoji.setSelectionRange(0, 99999);
      //  console.log(copyEmoji);
      copyEmoji.execCommand("copy");
    })
  );
};

searchEmojiInput.addEventListener("input", searchEmoji);
