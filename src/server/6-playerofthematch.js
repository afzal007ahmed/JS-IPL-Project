import { matches } from "./1-matches-per-year.js"
import fs from "fs"

function playerofthematch() {
    let obj = {};
    obj = matches.reduce((first, second) => {
        if (first[second["player_of_match"]] == undefined) {
            first[second["player_of_match"]] = 1;
        }
        else {
            first[second["player_of_match"]]++;
        }
        return first;
    }, {})
    let arr = Object.entries(obj);
    arr.sort((a, b) => {
        return b[1] - a[1];
    })
    return arr;

}
let finalarr = playerofthematch();
fs.writeFileSync('../public/output/playerofthematch.json', JSON.stringify(finalarr.slice(0, 1), null, 1));