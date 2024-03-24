import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserOperations from 'App/Controllers/Repositories/Operations/MasterData/UserOperations'
import User from 'App/Models/MasterData/Users/User'
import { UserValidatorStore, UserValidatorUpdate, AvatarValidator, PasswordValidator } from 'App/Validators/UserValidator'
import { UnlinkFile, UploadFile, errMsg } from 'App/helper'

export default class UsersController {
    private operation: any;
    constructor() {
        this.operation = new UserOperations();
    }

    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('UserPolicy').authorize('viewList')
            const fetch = await this.operation.UserList(request.all())
            return response.send({ status: true, data: fetch, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('UserPolicy').authorize('create')
            const payload = await request.validate(UserValidatorStore)
            payload['tgl_join'] = request.input('tgl_join') ? request.input('tgl_join') : null
            payload['work_location_master'] = request.input('work_location_master')
            await this.operation.UserStore(payload)
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            const err = errMsg(error)
            return response.status(err!.status).send({ status: false, data: error, msg: err!.msg })
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            const user = await this.operation.UserShow(request.param('id'))
            await bouncer.with('UserPolicy').authorize('view', user)
            return response.send({ status: true, data: user, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(request.param('id'))
            await bouncer.with('UserPolicy').authorize('update', user)
            const payload = await request.validate(UserValidatorUpdate)
            if (request.file('avatar') != null) {
                const payimg = await request.validate(AvatarValidator)
                UnlinkFile(user.avatar, 'uploads/avatar-users')
                UploadFile(payimg.avatar, payload.nik, 'uploads/avatar-users')
                payload['avatar'] = `${payload.nik}.${payimg.avatar.extname}`
            }
            if (request.input('password') != null) {
                const paypass = await request.validate(PasswordValidator)
                payload['password'] = paypass
            }
            payload['id'] = request.param('id')
            payload['work_location_master'] = request.input('work_location_master')
            payload['tgl_join'] = request.input('tgl_join') ? request.input('tgl_join') : null
            await this.operation.UserUpdate(request.param('id'), payload)
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send({ status: false, data: error, msg: 'error' })
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            const q = await this.operation.find(request.param('id'))
            await bouncer.with('UserPolicy').authorize('view', q)
            const user = await this.operation.UserDelete(request.param('id'))
            return response.send({ status: true, data: user, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send({ status: false, data: error.messages, msg: 'error' })
        }
    }

    public async attr_form({ response }: HttpContextContract) {
        try {
            const data = await this.operation.attr()
            return response.send({
                status: true, data: data, msg: 'success'
            })
        } catch (error) {
            return response.status(error.status).send({ status: false, data: error, msg: 'error' })
        }
    }
    public async user_approval({ response, auth }: HttpContextContract) {
        try {
            const cariuSER = await this.operation.UserApproval(auth)
            return response.send({ status: true, data: cariuSER, auth: auth.user, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send({ status: false, data: error, msg: 'error' })
        }
    }
}
