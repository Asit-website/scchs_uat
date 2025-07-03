
export default async function FetchGet(apiUrl) {
    let url = process.env.bc.api_url+apiUrl;
    let options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': process.env.bc.token
        }
    };
    const getData = await fetch(url, options);
    return getData;
}