import fs from "fs"
import { matches } from './1-matches-per-year.js'
import { deliveries } from './3-extraRuns.js'

function economicBowler() {

    let ids = matches.reduce((first, second) => {
        if (second.season == "2015") {
            first[second.id] = 1;
        }
        return first;
    }, {});

    let details = deliveries.reduce((first, second) => {
        if (ids[second["match_id"]] == 1) {
            if (first[second.bowler] === undefined) {
                first[second.bowler] = {};
                first[second.bowler]["total_runs"] = Number(second["wide_runs"]) + Number(second["noball_runs"]) + Number(second["batsman_runs"]);
                first[second.bowler]["total_balls"] = 0;
                if (second["wide_runs"] == '0' && second["noball_runs"] == '0' && second["penalty_runs"] == '0') {
                    first[second.bowler]["total_balls"]++;
                }
            }
            else {
                first[second.bowler]["total_runs"] += Number(second["wide_runs"]) + Number(second["noball_runs"]) + Number(second["batsman_runs"]);
                if (second["wide_runs"] == '0' && second["noball_runs"] == '0' && second["penalty_runs"] == '0') {
                    first[second.bowler]["total_balls"]++;
                }
            }
        }
        return first;
    }, {});
    let result = {};
    for (let i in details) {
        result[i] = (details[i]["total_runs"]) / (details[i]["total_balls"] / 6);
    }
    let finalarr = Object.entries(result);
    finalarr.sort((a, b) => a[1] - b[1])
    return finalarr;
}

let result = economicBowler();
fs.writeFileSync('../public/output/Economic-bowlers.json', JSON.stringify(result, null, 2));