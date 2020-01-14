var ItemAppModel = {
  model: function () {
    let modelFields = {
      homeLayout: {
        label: 'Home Layout',
        value: '',
        validators: []
      },
      pageLayout: {
        label: 'Page Layout',
        value: '',
        validators: []
      },
      postLayout: {
        label: 'Post Layout',
        value: '',
        validators: []
      },
      archiveLayout: {
        label: 'Archive Layout',
        value: '',
        validators: []
      }

    }
    return modelFields
  }
}

module.exports = ItemAppModel
