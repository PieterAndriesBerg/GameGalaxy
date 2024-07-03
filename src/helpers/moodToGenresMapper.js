export const moodToGenreMap = {
  sad: [7, 14, 3],
  happy: [83, 1],
  stressed: [7, 14, 40],
  bored: [4, 5, 3],
  excited: [4, 15, 10],
  relaxed: [14, 40, 11],
  scared: [4, 51],
  competitive: [2, 15, 6],
};

/*
 * The ids are as follows:
 * 4: Action
 * 51: Indie
 * 3: Adventure
 * 5: RPG
 * 10: Strategy
 * 14: Simulation
 * 15: Sports
 * 7: Puzzle
 * 2: Shooter
 * 1: Racing
 * 83: Platformer
 * 6: Fighting
 * 40: Casual
 * 11: Arcade
 *
 *
 * */

export const getGenreFromMood = (mood) => {
  return moodToGenreMap[mood];
};
