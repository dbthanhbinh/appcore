var ItemAppModel = {
  model: function () {
    let modelFields = {
      googleAnalyticCode: {
        label: 'Google analytic code',
        value: '',
        validators: []
      },
      copyrightText: {
        label: 'Copyright text',
        value: '',
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
