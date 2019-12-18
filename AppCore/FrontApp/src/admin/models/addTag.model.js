var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Tag name',
        value: '',
        validators: [
            { compare: 'required', message: 'The name is not empty!' }
        ]
      },
      slug: {
        label: 'Tag slug',
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
