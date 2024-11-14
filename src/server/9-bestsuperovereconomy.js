import fs from "fs"
import { deliveries } from "./3-extraRuns.js"

function bestSuperOverEconomy() {

  let obj = deliveries.reduce((first, second) => {
    if (second["is_super_over"] === "1") {
      if (first[second["bowler"]] == undefined) {
        first[second["bowler"]] = {};
        first[second["bowler"]]["balls"] = 0;
        first[second["bowler"]]["total"] = Number(second["total_runs"]);
      }
      else {
        first[second["bowler"]]["total"] += Number(second["total_runs"]);
      }
      if (second["wide_runs"] == 0 && second["noball_runs"] == 0 && second["penalty_runs"] == 0) {
        first[second["bowler"]]["balls"]++;
      }
    }

    return first;
  }, {});

  for (let i in obj) {
    let economy = (obj[i].total) / (obj[i].balls);
    obj[i] = undefined;
    obj[i] = economy;
  }
  let finalarr = Object.entries(obj);
  finalarr.sort((a, b) => a[1] - b[1]);
  return finalarr;
}

let result = bestSuperOverEconomy();
fs.writeFileSync('../public/output/besteconomysuperover.json', JSON.stringify(result.slice(0, 1), null, 1));