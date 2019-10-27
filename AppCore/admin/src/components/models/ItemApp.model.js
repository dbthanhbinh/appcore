var ItemAppModel = {
  model: function () {
    let modelFields = {
      name: {
        value: null,
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      },
      content: {
        value: null
      },
      categoryid: {
        value: null,
        validators: [
            { compare: 'required', message: 'Require message' }
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
