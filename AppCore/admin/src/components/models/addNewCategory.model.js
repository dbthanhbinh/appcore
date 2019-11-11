var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        value: null,
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      slug: {
        value: null,
        validators: []
      },
      parentId: {
        value: null,
        validators: []
      }
    }
    return modelFields
  },
  validations: function(){
    
  }
}

module.exports = ItemAppModel
