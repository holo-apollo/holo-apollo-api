export function getQueryParams(qs = document.location.search) {
    qs = qs.split('+').join(' ');

    const params = {};
    let tokens;
    const re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}