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
      categoryid: {
        label: 'Select category',
        value: null,
        validators: [
          { compare: 'required', message: 'Please select category!' }
        ]
      },
      file: {
        value: null,
        validators: []
      },
      seo_title: {
        label: 'Seo title',
        value: null,
        validators: []
      },
      seo_keys: {
        label: 'Seo key words',
        value: null,
        validators: []
      },
      seo_description: {
        label: 'Seo description',
        value: null,
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
