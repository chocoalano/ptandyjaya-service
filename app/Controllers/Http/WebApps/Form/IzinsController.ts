import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IzinOperations from 'App/Controllers/Repositories/Operations/Tools/IzinOperations'
import FormIzin from 'App/Models/Form/FormIzin'
import Ws from 'App/Services/Ws'
import IzinValidator, { FileValidator } from 'App/Validators/IzinValidator'
import { UnlinkFile, UploadFile, uniqueString } from 'App/helper'


export default class IzinsController {
    private operation: any;
    constructor() {
        this.operation = new IzinOperations();
    }
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('IzinPolicy').authorize('viewList')
            const q = await this.operation.index(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async report({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('IzinPolicy').authorize('viewList')
            const q = await this.operation.report(request.all())
            return response.send({ status: true, data: q, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async exportreport({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.with('IzinPolicy').authorize('viewList')
            const q = await this.operation.exportreport(request.all())
            return response.send(q)
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('IzinPolicy').authorize('create')
            const payload = await request.validate(IzinValidator)
            if (request.file('file') != null) {
                const payimg = await request.validate(FileValidator)
                let unique = uniqueString(5)
                UploadFile(payimg.file, `${payload.permit_req}-${unique}`, `uploads/${payload.permit_req}`)
                payload['file'] = `${payload.permit_req}-${unique}.${payimg.file.extname}`
            }
            await this.operation.store(payload)
            Ws.io.emit('notif-info:pengajuan-izin', { payload })
            return response.send({ status: true, data: payload, msg: 'success' })
        } catch (error) {
            return response.status(error.status).send(error)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.with('IzinPolicy').authorize('view')
            const q = await this.operation.find(request.param('id'));
            return response.send({ status: true, data: q, msg: 'success' })
        } catch(error) {
        return response.status(error.status).send(error)
    }
}

    public async update({ bouncer, request, response }: HttpContextContract) {
    try {
        await bouncer.with('IzinPolicy').authorize('update')
        const payload = await request.validate(IzinValidator)
        if (request.file('file') != null) {
            const payimg = await request.validate(FileValidator)
            const q = await this.operation.find(request.param('id'));
            UnlinkFile(q.file, `uploads/${q.permit_req}`)
            let unique = uniqueString(5)
            UploadFile(payimg.file, `${payload.permit_req}-${unique}`, `uploads/${payload.permit_req}`)
            payload['file'] = `${payload.permit_req}-${unique}.${payimg.file.extname}`
        }
        await this.operation.update(request.param('id'), payload)
        return response.send({ status: true, data: payload, msg: 'success' })
    } catch (error) {
        return response.status(error.status).send(error)
    }
}

    public async destroy({ bouncer, request, response }: HttpContextContract) {
    try {
        await bouncer.with('IzinPolicy').authorize('delete')
        const q = await this.operation.find(request.param('id'))
        UnlinkFile(q.file, `uploads/${q.permit_req}`)
        await this.operation.delete(q.id)
        return response.send({ status: true, data: {}, msg: 'success' })
    } catch (error) {
        return response.status(error.status).send(error)
    }
}

    public async approval({ bouncer, request, response, auth }: HttpContextContract) {
    try {
        await bouncer.with('IzinPolicy').authorize('viewList')
        const q = await FormIzin.findOrFail(request.param('id'))
        if (auth.user?.id === q.user_id_approval) {
            q.status_approval = request.input('status_approval')
            await q.save()
            Ws.io.emit('notif-info:approval-izin', { q })
            return response.send({ status: true, data: {}, msg: 'success' })
        }
        return response.send({ status: false, data: { msg: 'approval not valid!' }, msg: 'error' })
    } catch (error) {
        return response.status(error.status).send(error)
    }
}
}
