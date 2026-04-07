const {Router}=require('express')
const authController=require("../controller/auth.controller")
const authMiddleware=require('../middleware/auth.middleware')
const authRouter=Router()

/** 
    *@route POST /api/auth/register
    *@description: Register User
    *@access:Public
 */

authRouter.post("/register",authController.registerUserController)

/** 
    *@route POST /api/auth/login
    *@description: Login User
    *@access:Public
 */

authRouter.post("/login",authController.loginUserController)

/** 
    *@route GET /api/auth/logout
    *@description: clear the cookie and logout the user 
    *@access:Public
 */
authRouter.get("/logout",authController.logoutUserController)


/**
 * @router GET /api/auth/get-me
 * @description Get the details of the logged in user
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)



module.exports=authRouter