const tokenValidation = () => {
    const token = getToken();

    if (!token) {
        redirectToSpotify();
    } else {
        if (!validateExpireToken(token)) {
            
            redirectToSpotify();

        } 

        clearHashToken();
    }
}

const extractQueryString = search => {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

const getToken = () => {
    var search = window.location.hash.split("#")[1];

    if (search) {
        // primeiro acesso após autorização, token na url
        const auth = extractQueryString(search);

        localStorage.setItem(
            "authorization",
            JSON.stringify({
                access_token: auth.access_token,
                authorizationTime: new Date(),
                expires_in: auth.expires_in
            })
        );

        const authorization = localStorage.getItem("authorization");
        return JSON.parse(authorization);
    }
    else {
        const authorization = localStorage.getItem("authorization");
        return JSON.parse(authorization);
    }
}

const clearHashToken = () => {
    history.pushState(
        "initial",
        document.title,
        window.location.href.split("#")[0]
    );
};

const validateExpireToken = token => {
    const now = new Date();
    const expire = new Date(new Date(token.authorizationTime).setSeconds(token.expires_in));
    
    const valid = now <= expire;
    return valid;
};

const redirectToSpotify = () => {
    const url = process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL;
    const clientId = process.env.REACT_APP_CLIENT_ID;

    window.location.href = `${url}authorize?client_id=${clientId}&response_type=token&redirect_uri=${"http://localhost:8080"}`;
};

const setRecent = album => {
    var albuns = [], exist = [];
    var recent = JSON.parse(localStorage.getItem('recent'));

    if (recent !== null) {
        exist = recent.filter(item => item.id === album.id);
        albuns = recent;
    } 

    if (exist.length === 0) {
        albuns.push(
            {
                id: album.id,
                name: album.name,
                image: album.images.length !== 0 ? album.images[1].url : null,
                artist: album.artists[0].name,
                artistid: album.artists[0].id
            }
        );

        localStorage.setItem(
            "recent", JSON.stringify(albuns) 
        );
    }
}


export {
    extractQueryString, getToken, tokenValidation, setRecent
};