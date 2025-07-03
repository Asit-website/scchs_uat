
export default async function FetchDelete(apiUrl, data) {
    let url = process.env.bc.api_url+apiUrl;
    let options = {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'X-Auth-Token': process.env.bc.token
        }
    };
    const deleteData = await fetch(url, options);
    return deleteData;
}