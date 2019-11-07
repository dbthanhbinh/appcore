var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        value: null,
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      }
    }
    return modelFields
  },
  validations: function(){
    
  }
}

module.exports = ItemAppModel
