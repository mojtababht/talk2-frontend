const backend_base_url = 'http://127.0.0.1:8000/';
const refresh_url = backend_base_url + 'api/auth/refresh/'

export async function refreshTokens(refresh_token){
    let response = await fetch(refresh_url,
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'refresh': refresh_token}),
        })
    if (response.ok) {
        const data = await response.json()
        let access_token = data.access
        let refresh_token = data.refresh
        return {access_token: access_token, refresh_token: refresh_token}
    }
}
