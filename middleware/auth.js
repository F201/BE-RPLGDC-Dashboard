var jwt = require('jsonwebtoken');


const auth = (req, res, next) =>  {
    // const bearerHeader = req.headers['authorization']

    // if (typeof bearerHeader !== 'undefined') {
    //     const bearer = bearerHeader.split(' ')
    //     const bearerToken = bearer[1]
    //     req.token = bearerToken
    //     next()
    // } else {
    //     res.sendStatus(403);
    // }
    console.log(req['originalUrl'])
    const currentPath = req['originalUrl'];
    const currentMethod = req.method
    const bearToken = req.headers['authorization']
    // console.log('heheheheuheuheuheuheuheu', bearerHeader)
    const allowRoute = [
        // {route: '/recruitment/', method: "GET"},
        // {route: '/registerAdmin', method: "POST"},
        {route: '/recruitment', method: "POST"},
        {route: '/recruitment/checkstatus', method: "GET", withId: true},
        {route: '/recruitment/lulus2', method: "GET"},
        {route: '/tools', method: "GET", withId: true},
        {route: '/socials', method: "GET", withId: true},
        {route: '/auth', method: "POST"},
        {route: '/auth/details', method:"POST"},
        {route: '/activities', method: "GET", withId: true},
        {route: '/detail_activities', method: "GET", withId: true},
        {route: '/detail_products', method: "GET", withId: true},
        {route: '/products', method: "GET", withId: true},
        {route: '/pivot_product_tools', method: "GET", withId: true},
        {route: '/pivot_division_tools', method: "GET", withId: true},
        {route: '/pivot_division_activities', method: "GET", withId: true},
        {route: '/organizations', method: "GET", withId: true},
        {route: '/member_achievement', method: "GET", withId: true},
        {route: '/detail_divisions', method: "GET", withId: true},
        {route: '/divisions', method: "GET", withId: true},
        {route: '/detail_achievement', method: "GET", withId: true},
        {route: '/achievements', method: "GET", withId: true},
        {route: '/news', method: 'GET', withId: true},
        {route: '/score', method: 'GET', withId: true},
        {route: '/score', method: 'POST'}
    ]
    // console.log(('/auth' === currentPath && 'POST' === currentMethod))
    if (allowRoute.some(item => {return ((item.route === currentPath && item.method === currentMethod) || (item.method === currentMethod && item.withId && !isNaN(currentPath.replace(item.route + '/', ''))))})) {
        next()
    } else {
        if (bearToken) {
            // console.log(bearToken.replace('Bearer ', ''))
            jwt.verify(bearToken.replace('Bearer ', ''), process.env.JWT_AUTH_CODE, (err, decoded) => {
                if(err) {
                    return res.json({
                        msg: "jwt expired",
                        status: "error"
                    })
                } else {
                    // token is valid
                    // next() means that the request will be passed to route
                    next()
                }
            })
            // next()
        } else {
            // console.log('ERROR', req)
            res.json({
                status: "error",
                msg: "still not logged in"
            })
            // res.json({data: req['_parsedOriginalUrl'].pathname});
        }
    }
    
}

module.exports = auth