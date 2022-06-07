import WFFRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const wffRequest = new WFFRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT
})

export default wffRequest
