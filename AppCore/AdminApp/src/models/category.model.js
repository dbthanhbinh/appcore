var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Category name',
        placeholder: 'Please enter name',
        value: '',
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      slug: {
        label: 'Slug',
        placeholder: 'Please enter slug',
        value: '',
        validators: []
      },
      content: {
        label: 'Content',
        placeholder: 'Please enter content',
        value: '',
        validators: []
      },
      parentId: {
        label: 'Select parent',
        placeholder: 'Please select parent',
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
