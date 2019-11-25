var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Tag name',
        value: null,
        validators: [
            { compare: 'required', message: 'The name is not empty!' }
        ]
      },
      slug: {
        label: 'Tag slug',
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
