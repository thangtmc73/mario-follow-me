const ID = "chrome-mario-supper"

const SPRITE_WIDTH = 71;
const SPRITE_HEIGHT = 72;
const BORDER_WIDTH = 1;
const SPACING_WIDTH = 0;

function spritePositionToImagePosition(row, col) {
  return {
    x: (
      BORDER_WIDTH +
      col * (SPACING_WIDTH + SPRITE_WIDTH)
    ),
    y: (
      BORDER_WIDTH +
      row * (SPACING_WIDTH + SPRITE_HEIGHT)
    )
  }
}

const mario = document.createElement("canvas");
const context = mario
  .getContext('2d');

const spriteSheetURL = 'https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/mariowalking/result.png';
const image = new Image();
image.src = chrome.runtime.getURL("./mario.png");;

let row = 0;
let col = 0;
function animate() {
  // once we hit the end of a row,
  // move to the next
  if (col === 4) {
    col = 0;
  }

  // make an image position using the 
  // current row and colum
  let position = spritePositionToImagePosition(row, col);
  context.clearRect(
    0,
    0,
    mario.width,
    mario.height
  );
  context.drawImage(
    image,
    position.x,
    position.y,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    0,
    0,
    SPRITE_WIDTH,
    SPRITE_HEIGHT
  );
  col += 1;
}

let mousePosX = 0;
let wrapper = document.getElementById(ID);
if (wrapper === null) {
  wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = `${mousePosX}px`;
  wrapper.style.bottom = "0px";
  wrapper.style.width = "71px";
  wrapper.style.height = "72px";
  wrapper.style.overflow = "hidden";
  wrapper.style.zIndex = 9999;
  wrapper.id = ID;
}

wrapper.appendChild(mario);
// Use the same styling as the publish information in an article's header
window.addEventListener("mousemove", (event) => {
  mousePosX = event.clientX;
});
const numberPattern = /\d+/g;

image.onload = function () {
  setInterval(animate, 500);
};

setInterval(() => {
  const marioPosX = Number(wrapper.style.left.match(numberPattern)?.join('') || 0);
  if (Math.abs(mousePosX - marioPosX) < 10) {
    //setRunningClassName("standing");
    wrapper.style.left = `${marioPosX}px`;
    return;
  }
  if (mousePosX < marioPosX) {
    //setRunningClassName("running-left");
    mario.style.transform = 'scaleX(-1) translateX(75%)';
    wrapper.style.left = `${marioPosX - 10}px`;
    return;
  }
  if (mousePosX > marioPosX) {
    mario.style.transform = 'scaleX(1)';
    wrapper.style.left = `${marioPosX + 10}px`;
  }
}, 200);

document.body.appendChild(wrapper)
