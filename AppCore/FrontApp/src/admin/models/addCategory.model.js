var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Category name',
        value: '',
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      slug: {
        label: 'Category slug',
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
