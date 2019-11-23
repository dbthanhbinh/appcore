var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        label: 'Post name',
        value: null,
        validators: [
            { compare: 'required', message: 'The name is not empty!' }
        ]
      },
      content: {
        label: 'Post content',
        value: null,
        validators: []
      },
      categoryId: {
        label: 'Select category',
        value: null,
        validators: [
          { compare: 'required', message: 'Please select category!' }
        ]
      },
      file: {
        value: null,
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
