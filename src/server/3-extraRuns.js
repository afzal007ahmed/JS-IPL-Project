import fs from "fs"
import { matches } from "./1-matches-per-year.js";
let delivery = fs.readFileSync('../data/deliveries.json');
export let deliveries = JSON.parse(delivery);
function extraRuns() {
    let ids = matches.reduce((first, second) => {
        if (second.season === "2016") {
            first[second.id] = 1;
        }
        return first;
    }, {})
    let result = deliveries.reduce((first, second) => {
        if (ids[second["match_id"]] == 1) {
            if (first[second["bowling_team"]] == undefined) {
                first[second["bowling_team"]] = Number(second["extra_runs"]);
            }
            else {
                first[second["bowling_team"]] += Number(second["extra_runs"]);
            }
        }
        return first;
    }, {})
    return result;
}
let finalresult = extraRuns();
fs.writeFileSync('../public/output/ExtraRuns.json', JSON.stringify(finalresult, null, 2));