const backend_base_url = 'http://127.0.0.1:8000/';
const login_url = backend_base_url + 'api/auth/login/'

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const access_token = await cookies.get('access');
    const refresh_token = await cookies.get('refresh');
    return {access: access_token};
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({cookies, request}) => {
        let form = await request.formData()
        let data = {}
        form.forEach((value, key) => data[key] = value)
        let response = await fetch(login_url,
            {method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }})
        if (response.ok) {
            let response_data = await response.json()
            cookies.set('access', response_data.access, {path: '/'})
            cookies.set('refresh', response_data.refresh, {path: '/'})
        }
    }
};