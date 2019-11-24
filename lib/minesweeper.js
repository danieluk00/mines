// // Of course you can remove this (annoying) line ;)

const maxCols = 10;
const maxRows = 10;


const handleClick = (index, tds, event) => {

  let mines = 0;

console.log(index)
console.log(index%maxCols)

  if (event.currentTarget.classList.contains('minehidden')) {
    event.currentTarget.classList.add('mine');
    mineHit();
  } else {
    if (index - 1 >= 0 && tds[index - 1].classList.contains('minehidden') && index % maxCols != 0) {
      mines += 1;
    }
    if (index + 1 <= (maxRows * maxCols) - 1 && tds[index + 1].classList.contains('minehidden') && index % maxCols != (maxCols - 1)) {
      mines += 1;
    }
    if (index + maxCols <= (maxRows * maxCols) - 1 && tds[index + maxCols].classList.contains('minehidden')) {
      mines += 1;
    }
    if (index - maxCols >= 0 && tds[index - maxCols].classList.contains('minehidden')) {
      mines += 1;
    }

    if (index + maxCols + 1 <= (maxRows * maxCols) - 1 && tds[index + maxCols + 1].classList.contains('minehidden') && index % maxCols != (maxCols - 1)) {
      mines += 1;
    }
    if (index - (maxCols + 1) >= 0 && tds[index - (maxCols + 1) ].classList.contains('minehidden') && index % maxCols != 0 ) {
      mines += 1;
    }
    if (index + (maxCols - 1) <= (maxRows * maxCols) - 1 && tds[index + (maxCols - 1)].classList.contains('minehidden') && index % maxCols != 0) {
      mines += 1;
    }
    if (index - (maxCols - 1) >= 0 && tds[index - (maxCols - 1)].classList.contains('minehidden') && index % maxCols != (maxCols - 1)) {
      mines += 1;
    }

    if (mines > 0) {
      event.currentTarget.classList.add('mine-neighbour-' + mines);
    } else {
      event.currentTarget.classList.add('opened');
    }
  }
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
        event.currentTarget.classList.add('flagged');
        event.preventDefault();
    });
    if (Math.random() > 0.8) {
      i.classList.add("minehidden");
    };
  });
};

const mineHit = () => {
  const tds = document.querySelectorAll('td');
  const tdsArray = Array.from(tds);

  tds.forEach((element) => {
    if (element.classList.contains('minehidden')) {
      element.classList.add('mine');
    }
  });
}