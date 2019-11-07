var ItemModel = {
  getKey: function(){
    return 'Login-Model'
  },
  model: function () {
    let modelFields = {
      phone: {
        label: 'Phone',
        value: null,
        validators: []
      },
      password: {
        label: 'Password',
        value: null,
        validators: []
      }
    }
    return modelFields
  },
  validations: function(){}
}

module.exports = ItemModel
