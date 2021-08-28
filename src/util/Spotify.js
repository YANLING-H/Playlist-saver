let accessToken;
const client_id = 're';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if (accessToken){
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // url contains accessToken and expireIn time
        if (accessTokenMatch && expireInMatch){
            accessToken = accessTokenMatch[1];
            const expireIn = Number(expireInMatch);
            // clear the value of url to enable next assign of url
            window.setTimeout(() => accessToken = '', expireIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
        }
    }
}


export default Spotify;