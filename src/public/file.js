import fs from 'fs';
import csv from 'csv-parser'; 
// let value=[] 

function convertCsvtoJson(filepath,outputPath ){
    const arr=[];
    fs.createReadStream(filepath)
    .pipe(csv())
    .on('data', (value) => { 
        // console.log(value)
        arr.push(value); 
        // console.log(arr);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      fs.writeFileSync(outputPath, JSON.stringify(arr, null, 2), 'utf8');
    });   
    // console.log(arr);
    
    // fs.writeFile(outputPath, JSON.stringify(array, null, 2),'utf8')

}
convertCsvtoJson('../data/deliveries.csv' , '../data/deliveries.json')