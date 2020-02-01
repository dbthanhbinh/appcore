var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Post name',
        value: '',
        validators: [
            { compare: 'required', message: 'The name is not empty!' }
        ]
      },
      content: {
        label: 'Post content',
        value: '',
        validators: []
      },
      categoryId: {
        label: 'Select category',
        value: '',
        validators: [
          { compare: 'required', message: 'Please select category!' }
        ]
      },
      tagList: {
        label: 'Select tags',
        value: '',
        validators: []
      },
      file: {
        value: '',
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
