/**
 * Created by wisdom on 2017/3/21.
 */
const accessToken = JSON.parse(localStorage.getItem('STORAGE_IDENTITY')).access_token

const headers = new Headers({
  'Content-Type': 'application/json; odata.metadata=minimal',
  'Authorization': `Bearer ${accessToken}`
})

export const $api = {
  headers: headers,
  request: function (url:string, obj:Object = {}) {
    let initObj = (<any>Object).assign({
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }, obj)
    return new Request(url, initObj)
  }
}
