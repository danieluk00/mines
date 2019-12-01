const playAgainBtn = document.querySelector('.play-again')

let maxCols = 10;
let maxRows = 10;
let totalMines = 0;
let gameOver=false

const handleClick = (index, tds, event) => {

  if (tds[index].classList.contains('flagged') || tds[index].classList.contains('taken')) {
    return;
  }

  console.log("Gameover " + gameOver)
  if (gameOver == true) {
    return;
  }

  let mines = 0;

  if (tds[index].classList.contains('minehidden')) {
    animateCSS(tds[index],'tada')
    tds[index].classList.add('mine');
    animateCSS(document.getElementById('minesweeper'),'wobble')
    mineHit();
  } else {
    if (index - 1 >= 0 && tds[index - 1].classList.contains('minehidden') && index % maxCols != 0) {
      //Left
      mines += 1;
    }
    if (index + 1 <= (maxRows * maxCols) - 1 && tds[index + 1].classList.contains('minehidden') && index % maxCols != (maxCols - 1)) {
      //Right
      mines += 1;
    }
    if (index + maxCols <= (maxRows * maxCols) - 1 && tds[index + maxCols].classList.contains('minehidden')) {
      //Bottom
      mines += 1;
    }
    if (index - maxCols >= 0 && tds[index - maxCols].classList.contains('minehidden')) {
      //Top
      mines += 1;
    }

    if (index + maxCols + 1 <= (maxRows * maxCols) - 1 && tds[index + maxCols + 1].classList.contains('minehidden') && index % maxCols != (maxCols - 1)) {
      //Bottom right
      mines += 1;
    }
    if (index - (maxCols + 1) >= 0 && tds[index - (maxCols + 1) ].classList.contains('minehidden') && index % maxCols != 0 ) {
      //Top left
      mines += 1;
    }
    if (index + (maxCols - 1) <= (maxRows * maxCols) - 1 && tds[index + (maxCols - 1)].classList.contains('minehidden') && index % maxCols != 0) {
      //Bottom left
      mines += 1;
    }
    if (index - (maxCols - 1) >= 0 && tds[index - (maxCols - 1)].classList.contains('minehidden') && index % maxCols != (maxCols - 1)) {
      //Top right
      mines += 1;
    }

    tds[index].classList.add('taken');
    if (mines > 0) {
      tds[index].classList.add('mine-neighbour-' + mines);
      animateCSS(tds[index],'rubberBand')
    } else {
      tds[index].classList.add('opened');

      if (index - 1 >= 0 && index % maxCols != 0 && !tds[index - 1].classList.contains('opened')) {
        //Left
        handleClick(index-1, tds, event)
      }
      if (index + 1 <= (maxRows * maxCols) - 1 && index % maxCols != (maxCols - 1)  && !tds[index + 1].classList.contains('opened')) {
        //Right
        handleClick(index+1, tds, event)
      }
      if (index + maxCols <= (maxRows * maxCols) - 1  && !tds[index + maxCols].classList.contains('opened')) {
        //Bottom
        handleClick(index+maxCols, tds, event)
      }
      if (index - maxCols >= 0  && !tds[index - maxCols].classList.contains('opened')) {
        //Top
        handleClick(index-maxCols, tds, event)
      }
  
      if (index + maxCols + 1 <= (maxRows * maxCols) - 1 && index % maxCols != (maxCols - 1) && !tds[index+(maxCols +1)].classList.contains('opened')) {
        //Bottom right
        handleClick(index+(maxCols +1), tds, event)
      }
      if (index - (maxCols + 1) >= 0 && index % maxCols != 0  && !tds[index-(maxCols +1)].classList.contains('opened')) {
        //Top left
        handleClick(index-(maxCols +1), tds, event)
      }
      if (index + (maxCols - 1) <= (maxRows * maxCols) - 1 && index % maxCols != 0  && !tds[index+(maxCols -1)].classList.contains('opened')) {
        //Bottom left
        handleClick(index+(maxCols -1), tds, event)
      }
      if (index - (maxCols - 1) >= 0 && index % maxCols != (maxCols - 1)  && !tds[index-(maxCols -1)].classList.contains('opened')) {
        //Top right
        handleClick(index-(maxCols -1), tds, event)
      }
    }
  }
}

const flagClick = () => {

  if ((gameOver == true) || event.currentTarget.classList.contains('taken')) {
    return;
  }

  if (event.currentTarget.classList.contains('flagged')) {
    event.currentTarget.classList.remove('flagged');
    totalMines++;
  } else {
    event.currentTarget.classList.add('flagged');
    totalMines--;
  }
  document.querySelector('.caption').innerText = totalMines;
}

const generateHtml = () => {
  document.querySelector('#minesweeper').innerHTML = ``

  for (let rows=0; rows<maxRows; rows++) {

    document.querySelector('#minesweeper').innerHTML += `<tr>`
    let rowHtml = ``;
    for (let cols=0; cols<maxCols; cols++) {
      rowHtml += `<td class="unopened"></td>`
    }
    document.querySelector('#minesweeper').innerHTML += rowHtml;
    document.querySelector('#minesweeper').innerHTML += `</tr>`

  }
}

const generateGrid = () => {

  generateHtml();

  const tds = document.querySelectorAll('td');
  const tdsArray = Array.from(tds);

  tds.forEach((i) => {
    i.addEventListener('click', event => {
      const index = tdsArray.indexOf(i);
      handleClick(index, tds, event);
    });
    i.addEventListener('contextmenu', event => {
        event.preventDefault();
        flagClick();
    });
    console.log(mineDensity)
    if (Math.random() > mineDensity) {
      i.classList.add("minehidden");
      totalMines++;
    };
  });
  document.querySelector('.caption').innerText = totalMines;
};

const mineHit = () => {
  const tds = document.querySelectorAll('td');
  const tdsArray = Array.from(tds);

  gameOver = true;

  setTimeout(function() {
    animateCSS(playAgainBtn, 'fadeIn', 'show');
  },1000)


  tds.forEach((element) => {
    if (element.classList.contains('minehidden')) {
      element.classList.add('mine');
    }
  });
}