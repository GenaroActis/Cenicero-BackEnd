export const logoutUserController = async (req, res, next) =>{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else{
                res.redirect('/');
            };
        });
    } catch (error) {
        next(error)
    };
};
