import express from 'express'
import authCtrl from './../controllers/authController'

const router = express.Router()

router.route('/api/v1/auth/signin')
  .post(authCtrl.signIn)
router.route('/api/v1/auth/signout')
  .get(authCtrl.signOut)

export default router