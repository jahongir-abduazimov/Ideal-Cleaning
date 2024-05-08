import request from '../config'
import { Request } from '@/src/types/interface/services'
const services: Request = {
    get_services: (params) => request.get('/service/all', {params}),
    post_services: (payload) => request.post('/service', payload),
    delete_services: (id) => request.delete(`/service?id=${id}`),
}
export default services;