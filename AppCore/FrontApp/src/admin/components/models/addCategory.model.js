var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Category name',
        value: null,
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      slug: {
        label: 'Category slug',
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
