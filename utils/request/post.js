
export default async function FetchPost(apiUrl, data) {
    let url = process.env.bc.api_url+apiUrl;
    let options = {
        method: 'POST',
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