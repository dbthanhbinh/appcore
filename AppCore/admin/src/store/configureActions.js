import RestConnection from '../apis/rest'
class ConfigActions{
  constructor(){
    this.RestConfig = new RestConnection()
  }

  getListItems(payload, cb) {
    return this.RestConfig.get(payload, cb)
  }

  getFilterItemsBy(payload, cb) {
    return this.RestConfig.post(payload, cb)
  }

  deleteItem(payload, cb) {
    return this.RestConfig.delete(payload, cb)
  }

  addItem(payload, cb) {
    return this.RestConfig.post(payload, cb)
  }

  addItemWithForm(payload, cb) {
    return this.RestConfig.postForm(payload, cb)
  }

  updateItem(payload, cb) {
    return this.RestConfig.post(payload, cb)
  }

  detailItem(payload, cb) {
    return this.RestConfig.get(payload, cb)
  }

  detailItemWithEdit(payload, cb) {
    return this.RestConfig.get(payload, cb)
  }

}

export default ConfigActions