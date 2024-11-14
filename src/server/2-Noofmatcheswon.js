import fs from "fs"
import { matches } from "./1-matches-per-year.js"

function NoOfMatchesWonPerTeam() {

  let obj = {};
  matches.map((item) => {
    if (obj[item.team1] == undefined) {
      obj[item.team1] = {};
    }
    if (obj[item.team2] == undefined) {
      obj[item.team2] = {};
    }
    if (obj[item.team1][item.season] == undefined) {
      obj[item.team1][item.season] = 0;
    }
    if (obj[item.team2][item.season] == undefined) {
      obj[item.team2][item.season] = 0;
    }
    if (obj[item.winner] !== undefined) {
      obj[item.winner][item.season]++;
    }
  })
  return obj;
}
let finalobj = NoOfMatchesWonPerTeam();
fs.writeFileSync("../public/output/Noofmatcheswon.json", JSON.stringify(finalobj, null, 2));

