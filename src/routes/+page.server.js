import {redirect} from "@sveltejs/kit";
import {refreshTokens} from "$lib";


const backend_base_url = 'http://127.0.0.1:8000/';
const user_info_url = backend_base_url + 'api/users/user_info/'
const chats_url = backend_base_url + 'api/chats/'




async function getUserInfoByAccess(access_token) {
    let response = await fetch(user_info_url,
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        })
    if (response.ok) {
        return await response.json()
    }
}


async function getUserInfo(cookies) {
    let access_token = await cookies.get('access');
    let refresh_token = await cookies.get('refresh');
    let user_info = await getUserInfoByAccess(access_token)
    if (!user_info) {
        let access_refresh = await refreshTokens(refresh_token)
        if(access_refresh){
            access_token = access_refresh.access_token
            refresh_token = access_refresh.refresh_token
            user_info = await getUserInfoByAccess(access_token)
        }
    }
    return {user_info: user_info, access_token: access_token, refresh_token: refresh_token}
}


/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    let {user_info, access_token, refresh_token} = await getUserInfo(cookies);
    await cookies.set('access', access_token, {path: '/'})
    await cookies.set('refresh', refresh_token, {path: '/'})
    if (!user_info){
            await cookies.delete('access', {path: '/'});
            await cookies.delete('refresh', {path: '/'});
            redirect(303, '/login')
        }
    return {user_info: user_info, access_token: access_token, refresh_token: refresh_token};
}

/** @type {import('./$types').Actions} */
export const actions = {
    addChat: async ({cookies, request}) => {
        let form = await request.formData()
        let data = {
            members: [form.get('username')],
        }
        const access_token = await cookies.get('access');
        const response = await fetch(chats_url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                body: JSON.stringify(data),
            })
        throw redirect(303, '/')
    }
};

