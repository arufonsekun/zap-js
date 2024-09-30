import passport from "passport";
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from "../models/User.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret',
}

passport.use(new Strategy(
    options,
    async (jwtPayload, done) => {
        try {
            const user = await User.find({ uuid: jwtPayload.uuid });
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }
));

export default passport;
