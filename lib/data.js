import got from 'got';

// get filepath to data directory
const dataURL = 'https://dev-pierceconwi.pantheonsite.io/wp-json/twentytwentyone-child/v1/mod13/';


// return all ids for all json objects in array
export async function getAllIds() {
    let jsonString;
    try {
        // next line uses got synchronously to retrieve JSON from wp site via HTTPS
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }
    // convert string from file into json array object
     const jsonObj = JSON.parse(jsonString.body);
     // use map method on array to extract ONLY the id properties into a new array of object values
     return jsonObj.map(item => {
        return {
            params: {
                id: item.ID.toString()
            }
        }
     });
}


// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
    let jsonString;
    try {
        // next line uses got synchronously to retrieve JSON from wp site via HTTPS
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }
    const jsonObj = JSON.parse(jsonString.body);
    jsonObj.sort(function (a, b) {
        return a.post_title.localeCompare(b.post_title);
    });
    return jsonObj.map(item => {
        return {
            id: item.ID.toString(),
            name: item.post_title
        }
    });
}


// async function to get the relevant data for one person
// used by getStaticProps() function located in [id].js
export async function getData(idRequested) {
    let jsonString;
    try {
        // next line uses got synchronously to retrieve JSON from wp site via HTTPS
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }
    // convert string from file into json array object
    const jsonObj = JSON.parse(jsonString.body);
    // return object with id value that exactly matches idRequested value
    const objMatch = jsonObj.filter( obj => {
        return obj.ID.toString() === idRequested;
        }
    );
    // extract object value in filtered array, if any
        let objReturned;
        if  (objMatch.length > 0) {
        // 0 = 0 position in new array of ids that match idRequested (aka first match)
            objReturned = objMatch[0];
            console.log(objReturned);
        } else {
            objReturned = {};
        }
        return objReturned;
}