
export default async function FetchPut(apiUrl, data) {
    let url = process.env.bc.api_url+apiUrl;
    let options = {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': process.env.bc.token
        },
        body: data
    };
    const postData = await fetch(url, options);
    return postData;
}