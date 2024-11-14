import fs from "fs"
let data = fs.readFileSync('../data/matches.json');
export let matches = JSON.parse(data);


//1. 
function TotalMatchesPeryear() {
  let obj = {};
  matches.map((item) => {
    if (obj[item.season] === undefined) {
      obj[item.season] = 1;
    }
    else {
      obj[item.season]++;
    }
    return item.season
  });
  return obj;
}
let finalobj = TotalMatchesPeryear();
fs.writeFileSync("../public/output/totalMatchPerYear.json", JSON.stringify(finalobj, null, 2));
