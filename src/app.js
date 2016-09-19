"use strict";

/* Classes */
const Game = require('./game');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);

// We have 9 pairs of possible cards that are about 212px square
var cards = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var board = [];

while(cards.length > 0) {
  var index = Math.floor(Math.random() * (cards.length - 1));
  board.push({card: cards[index], flip: false});
  cards.splice(index, 1);
}

board.forEach(function(item){
  console.log(item.card);
});

// TODO: Place the cards on the board in random order

canvas.onclick = function(event) {
  event.preventDefault();
  // TODO: determine which card was clicked on
  // TODO: determine what to do
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());


/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  ctx.fillStyle = "#ff7777";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // TODO: Render the board
  board.forEach(function(item, idx){
      if(item.flip){
        renderCard(ctx, item, idx);
      }else{
        renderBack(ctx, item, idx);
      }
  });
}

function renderBack(ctx, item, idx){
  var rect = getRect(idx);
  //console.log(rect);
  ctx.fillStyle = "blue";
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  //console.log(rect);
}

function getRect(idx){
  //console.log(idx);
  //6 wide 3 tall
  var width = Math.floor(canvas.width / 6);
  var height = Math.floor(canvas.height / 3);
  var x = idx - Math.floor(idx / 3);
  var y = Math.floor(idx / 3);
  return {
    xt: x,
    yt: y,
    x: x * width,
    y: y * height,
    width: width - 5,
    height: height -5
  }
}
