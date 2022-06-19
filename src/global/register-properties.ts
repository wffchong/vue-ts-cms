import { App } from 'vue'
import { formatUtcString } from '@/utils/time-format'

export default function registerProperties(app: App) {
    app.config.globalProperties.$filters = {
        format(value: string) {
            return formatUtcString(value)
        }
    }
}
