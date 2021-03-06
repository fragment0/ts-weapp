import { Config, http } from '../3rd/http.wx/index'
import md5 from './md5'
import config from '../config'

http.defaults.baseURL = config.api

const ekey = config.ekey

const dekey = String.fromCharCode.apply(
  undefined,
  ekey
    .split('')
    .map((i: string) => i.charCodeAt(0))
    .map((i: number, index: number) => i - index),
)

type ReqOpt = {
  full?: boolean;
}

export default function(options: Config): ReturnType<typeof http.request> {
  const data: any = options.data

  if (options.method && options.method.toLowerCase() !== 'get' && data) {
    try {
      const app: any = getApp()
      if (app && app.midiState && app.midiState.token && !data.token) {
        data.token = app.midiState.token
      }
    } catch (e) {
      // nothing
    }
    // rk --> random key
    data.rk = `${Date.now()}${Math.floor(Math.random() * 10000)}`
    const str = Object.keys(data)
      .sort()
      .map(k => {
        let value = data[k]
        if (typeof value === 'object') {
          value = JSON.stringify(value)
        }
        return `${k}=${value}`
      })
      .concat(dekey)
      .join('&')
    // sk --> secret key
    data.sk = md5(str)
  }

  return http.request({
    ...options,
    data,
  })
}
