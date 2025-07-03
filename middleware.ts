import { NextRequest, NextResponse } from 'next/server';


export const config = { matcher: ["/account-test/:path"] }

export default async function middleware(req: NextRequest, res:NextResponse) {
    //user page access if login successfull start
    //if(req.url.includes('account')){
        // const access_token = req.cookies.get("access_token")?.value;
        // const verfyUsers = await fetch(`${process.env.server.api}user-profile`, { 
        //     method: 'GET', 
        //     headers: new Headers({
        //         'Authorization': 'Bearer '+access_token, 
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     })
        // });
        // const verfyUser = await verfyUsers.json();
        // if(verfyUser?.error == "Unauthenticated."){
        //     return NextResponse.redirect(process.env.NEXTAUTH_URL)
        // }
    //}
    //user page access if login successfull end
    return NextResponse.next();
}


