// authentication helper; perform route (next()) if the user is logged in
const auth = (req, res, next) => {
    (!req.session.user_id) ? res.redirect('/login') : next();
}

module.exports = auth;