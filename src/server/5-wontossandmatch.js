import { matches } from "./1-matches-per-year.js"
import fs from "fs"

function wonTossAndMatch() {
  let result = matches.reduce((first, second) => {
    if (first[second.team1] == undefined) {
      first[second.team1] = 0;
    }
    if (first[second.team2] == undefined) {
      first[second.team2] = 0;
    }
    if (second["toss_winner"] == second["winner"]) {
      first[second.winner]++;
    }
    return first;
  }, {})
  return result;
}
let finalresult = wonTossAndMatch();
fs.writeFileSync('../public/output/wontossandmatches.json', JSON.stringify(finalresult, null, 1));
