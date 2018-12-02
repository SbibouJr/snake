import Ground from '../class/Ground';
import Wall from '../class/Wall';

const DIFFICULTY = {
  EASY: 'easy',
  NORMAL: 'normal',
  HARD: 'hard',
};

const groundsList = [];

const wallsList = {
  easy: [],
  normal: [],
  hard: [],
};

/*
 *
 * Initializes the ground
 *
*/
for (let i = 0; i < 40; i += 1) {
  for (let j = 0; j < 24; j += 1) {
    groundsList.push(new Ground(i * 32, j * 32));
  }
}

/*
 *
 * Initializes walls according to difficulty
 *
*/
for (let i = 0; i < 40; i += 1) {
  for (let j = 0; j < 24; j += 1) {
    if (i === 0 || i === 39) {
      wallsList.normal.push(new Wall(i * 32, j * 32));
    } else if (j === 0 || j === 23) {
      wallsList.normal.push(new Wall(i * 32, j * 32));
    }
  }
}
for (let i = 0; i < 40; i += 1) {
  for (let j = 0; j < 24; j += 1) {
    if (i === 0 || i === 39) {
      wallsList.hard.push(new Wall(i * 32, j * 32));
    } else {
      if (j === 0 || j === 23) {
        wallsList.hard.push(new Wall(i * 32, j * 32));
      } else if (i === 4 || i === 35) {
        if (j > 3 && j < 10) {
          wallsList.hard.push(new Wall(i * 32, j * 32));
        } else if (j > 13 && j < 20) {
          wallsList.hard.push(new Wall(i * 32, j * 32));
        }
      } else if ((i > 4 && i < 11) || (i > 28 && i < 35)) {
        if (j === 4 || j === 19) {
          wallsList.hard.push(new Wall(i * 32, j * 32));
        }
      }
      if (i === 9 || i === 30) {
        if (j > 8 && j < 15) {
          wallsList.hard.push(new Wall(i * 32, j * 32));
        }
      }
      if (j === 8 || j === 15) {
        if (i > 12 && i < 18) {
          wallsList.hard.push(new Wall(i * 32, j * 32));
        }
        if (i > 21 && i < 27) {
          wallsList.hard.push(new Wall(i * 32, j * 32));
        }
      }
    }
  }
}


export {
  DIFFICULTY,
  groundsList,
  wallsList,
};
