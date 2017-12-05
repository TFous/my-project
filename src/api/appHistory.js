const test = [{
  route: 'test1',
  name: '标签五',
  type: 'danger'
}]
export const app = {
  historys: JSON.parse(localStorage.getItem('historys')) || test,
  clearHistorys: function () {
    app.historys.length = 0
  },
  addHistory: function (history) {
    // console.log(app.historys)
    // console.log(history)
  }
}
