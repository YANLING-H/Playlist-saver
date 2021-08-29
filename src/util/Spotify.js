import SearchBar from "../Components/SearchBar/SearchBar";

let accessToken;
const client_id = '102e2128bdbe418899697a1025a9cabb';
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
    },
    search(term){
        const accessToken = Spotify.getAccessToken(); 
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: 
            {Autorization: `Bearer ${accessToken}`}
            }   
        ).then(
            response => {
                return response.json();
            }
        ).then (
            jsonResponse => {
                if (!jsonResponse.tracks){
                    return [];
                }
                return jsonResponse.tracks.items.map(track => {
                    return {
                    id: track.id,
                    name: track.name,
                    artist: track.artist[0].name,
                    album: track.album.name,
                    uri: track.uri
                }})
            }
        )
    }


}


export default Spotify;