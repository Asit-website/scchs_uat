export default async function GlobalHeaderFooter(context, cb) {
    try {
        const contentFetch = await fetch(process.env.server.api+"homepage");
        const contentDetial = await contentFetch.json();
        const data = {
            header: {
                settings:contentDetial?.header,
                navigation:contentDetial?.navigation
            },
            footer:contentDetial?.footer
        }
        return data;
    } catch (error) {
        const data = { header: false, footer:false }
        return data;
    }
}
