let favNum = 6;
let baseURL = 'http://numbersapi.com';

async function one(){
    let res = await axios.get(`${baseURL}/${favNum}?json`);
    console.log(res);
}

one();


async function two(){
    const favNums = [1,3,9]
    let res = await axios.get(`${baseURL}/${favNums}?json`);
    console.log(res);
}

two();

async function three(){
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => {
            return axios.get(`${baseURL}/${favNum}?json`);
            })
        );
        facts.forEach(data => $("body").append(`<p>${data.data.text}</p>`));

}

three();
