function admin(req, res, next) {
    if (!req.user.role == "ADMIN") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

function client(req, res, next) {
    if (!req.user.role == "CLIENT") return res.status(403).send({
        ok: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, client };