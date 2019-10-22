var ItemAppModel = {
  model: function () {
    let modelFields = {
      cat: {
        value: null,
        validators: [
            { compare: 'required', message: 'Require message' }
        ]
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
