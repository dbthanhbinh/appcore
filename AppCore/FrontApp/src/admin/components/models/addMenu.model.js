var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Menu name',
        value: '',
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      slug: {
        label: 'Menu slug',
        value: '',
        validators: []
      },
      parentId: {
        value: '',
        validators: []
      }
    }
    return modelFields
  },
  validations: function(){
    
  }
}

module.exports = ItemAppModel
