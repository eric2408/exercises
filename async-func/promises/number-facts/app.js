let favNum = 6;
let baseURL = 'http://numbersapi.com';

axios.get(`${baseURL}/${favNum}?json`)
    .then(data => {console.log(data)});

const favNums = [1,3,9]
axios.get(`${baseURL}/${favNums}?json`)
    .then(data => console.log(data));

Promise.all(
    Array.from({ length: 4 }, () => {
        return axios.get(`${baseURL}/${favNum}?json`);
        })
    ).then(facts => {
        facts.forEach(data => $("body").append(`<p>${data.data.text}</p>`));
    });
