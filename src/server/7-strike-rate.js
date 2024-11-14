import { matches } from "./1-matches-per-year.js"
import { deliveries } from './3-extraRuns.js'
import fs from "fs"

function strikeRate() {
    let obj = matches.reduce((first, second) => {
        if (first[second["season"]] == undefined) {
            first[second["season"]] = {};
        }
        first[second["season"]][second.id] = 1;
        return first;
    }, {});
    let newobj = deliveries.reduce((first, second) => {
        for (let key in obj) {
            if (obj[key][second["match_id"]] == 1) {
                if (first[key] == undefined) {
                    first[key] = {};
                }
                if (first[key][second["batsman"]] == undefined) {
                    first[key][second["batsman"]] = {};
                    first[key][second["batsman"]]["total"] = Number(second["batsman_runs"]);
                    first[key][second["batsman"]]["balls"] = 0;
                }
                else {
                    first[key][second["batsman"]]["total"] += Number(second["batsman_runs"]);
                }
                if (second["wide_runs"] == '0' && second["noball_runs"] == '0' && second["penalty_runs"] == '0') {
                    first[key][second["batsman"]]["balls"]++;
                }
            }
        }
        return first;
    }, {});
    for (let key in newobj) {
        for (let key2 in newobj[key]) {
            let strikeratevalue = (newobj[key][key2].total) / (newobj[key][key2].balls);
            strikeratevalue *= 100;
            newobj[key][key2] = undefined;
            newobj[key][key2] = strikeratevalue;
        }
    }
    return newobj;
}
let result = strikeRate();
fs.writeFileSync('../public/output/strike-rate.json', JSON.stringify(result, null, 1));
