import { deliveries } from "./3-extraRuns.js"
import fs from "fs"

function highestDismissal() {
    let bowler;
    let batsman;
    let count = 0;
    let obj = deliveries.reduce((first, second) => {
        if (first[second["bowler"]] == undefined) {
            first[second["bowler"]] = {};
        }
        if (first[second["bowler"]][second["batsman"]] == undefined) {
            first[second["bowler"]][second["batsman"]] = 0;
        }
        if (second["player_dismissed"].length != 0 && second["dismissal_kind"] != "run out") {
            first[second["bowler"]][second["batsman"]]++;
        }
        if (count < first[second["bowler"]][second["batsman"]]) {
            count = first[second["bowler"]][second["batsman"]];
            bowler = second["bowler"];
            batsman = second["batsman"];
        }
        return first;
    }, {});
    let result = {};
    result[bowler] = {};
    result[bowler][batsman] = count;
    return result;

}
let finalresult = highestDismissal();
fs.writeFileSync('../public/output/highestDismissal.json', JSON.stringify(finalresult, null, 1));
