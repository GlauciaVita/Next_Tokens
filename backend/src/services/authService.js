import jwt from 'jsonwebtoken';
import { getTokenFromHeaders } from '../utils/getTokenFromHeaders';

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
const ACCESSTOKEN_EXPIRATION = '3s';
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;
const REFRESHTOKEN_EXPIRATION = '7d';


export const authService = {
    async generateAccessToken(userId) {
        return jwt.sign(
            { roles: ['user'] },
            ACCESSTOKEN_SECRET,
            { subject: userId, expiresIn: ACCESSTOKEN_EXPIRATION }
        );
    },
    async validateAccessToken(accessToken) {
        return jwt.verify(accessToken, ACCESSTOKEN_SECRET);
    },
    async isAuthenticated(req) {
        const token = getTokenFromHeaders(req);
    
        try {
            await authService.validateAccessToken(token);
            return true;
        } catch (err) {   
            return false;
        }
    },
    async generateRefreshToken(userId) {
        return jwt.sign(
            {},
            REFRESHTOKEN_SECRET,
            { subject: userId, expiresIn: REFRESHTOKEN_EXPIRATION }
        );
    },
    async validateRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, REFRESHTOKEN_SECRET);
    },
    async decodeToken(token) {
        return jwt.decode(token);
    }
}
