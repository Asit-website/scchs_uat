import { getSession } from 'next-auth/react'
export default async function RequireAuthentication(context, cb) {
    const session = await getSession(context);
    if(!session){
        return {
            redirect:{
                destination:"/",
                permanent:false
            },
            props :{}
        }
    }
    return cb(session);
}
