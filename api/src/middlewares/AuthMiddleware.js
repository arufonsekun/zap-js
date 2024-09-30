import passport from "passport";

const authenticate = () => {
    passport.authenticate('jwt', { session: false });
}

export default authenticate;