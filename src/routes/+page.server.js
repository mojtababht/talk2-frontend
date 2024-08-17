import {redirect} from "@sveltejs/kit";

const backend_base_url = 'http://127.0.0.1:8000/';
const login_url = backend_base_url + 'api/auth/login/'
const user_info_url = backend_base_url + 'api/users/user_info/'
const refresh_url = backend_base_url + 'api/auth/refresh/'


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
        let response = await fetch(refresh_url,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'refresh': refresh_token}),
            })
        if (response.ok) {
            const response_data = await response.json()
            access_token = response_data.access
            refresh_token = response_data.refresh
            await cookies.set('access', access_token)
            await cookies.set('refresh', refresh_token)
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
            redirect(303, '/login')
        }
    }
    return {user_info: user_info, access_token:access_token};
}

