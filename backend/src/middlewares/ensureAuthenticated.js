export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); 
    }else{
        console.log('redirect')
        res.redirect('/'); 
    }
}