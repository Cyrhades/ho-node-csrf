exports.token = (req, res, next) => {
    if (typeof req.session == 'undefined') { console.warn(`Please install express-session and add in middleware`); }
    req.session.csrf = require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
    // On envoie à la vue le nouveau token csrf
    res.locals.csrf = req.session.csrf;
    return next();
};
 
exports.verify = (req, res, next) => {    
    if (typeof req.session == 'undefined') { console.warn(`Please install express-session and add in middleware`); }
    // si il n'y a pas la clé csrf ou qu'elle ne correspond pas
    if (!('csrf' in req.body && req.body.csrf === req.session.csrf && req.body.csrf !== '')) {
        return res.status(403).send("Cross-site request forgery détecté!");
    }
    res.locals.csrf = req.session.csrf; // pour les form avec erreur on doit renvoyer le token
 
    return next();
};
