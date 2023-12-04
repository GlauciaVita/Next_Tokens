import nookies from "nookies";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
    save(accessToken, ctx = null) {
        globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
        // globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
        nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
            maxAge: ONE_HOUR,
            path: "/",
        });
    },
    get(ctx = null) {
        const cookies = nookies.get(ctx);
        return cookies[ACCESS_TOKEN_KEY] || "sem token ";
        // return globalThis?.sessionStorage?.getItem(ACCESS_TOKEN_KEY);
        // return localStorage.getItem(ACCESS_TOKEN_KEY);

    },
    delete() {
        globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
        // globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY);
        nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    }
}