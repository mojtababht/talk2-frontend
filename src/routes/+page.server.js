import {redirect} from "@sveltejs/kit";

const backend_base_url = 'http://127.0.0.1:8000/';
const login_url = backend_base_url + 'api/auth/login/'
const user_info_url = backend_base_url + 'api/users/user_info/'
const refresh_url = backend_base_url + 'api/auth/refresh/'
const chats_url = backend_base_url + 'api/chats/'


/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    let user_info
    let access_token = await cookies.get('access');
    let refresh_token = await cookies.get('refresh');
    let response = await fetch(user_info_url,
        {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            }
        })
    if (response.ok) {
        user_info = await response.json()
    }
    else {
        let refresh_response = await fetch(refresh_url,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'refresh': refresh_token}),
            })
        if (refresh_response.ok) {
            const response_data = await refresh_response.json()
            access_token = response_data.access
            refresh_token = response_data.refresh
            await cookies.delete('access', {path: '/'});
            await cookies.delete('refresh', {path: '/'});
            await cookies.set('access', access_token, {path: '/'})
            await cookies.set('refresh', refresh_token, {path: '/'})
            let response = await fetch(user_info_url,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`,
                    }
                })
            if (response.ok) {
                user_info = await response.json()
            }
        }
        if (!user_info){
            await cookies.delete('access', {path: '/'});
            await cookies.delete('refresh', {path: '/'});
            redirect(303, '/login')
        }
    }
    return {user_info: user_info, access_token: access_token};
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

