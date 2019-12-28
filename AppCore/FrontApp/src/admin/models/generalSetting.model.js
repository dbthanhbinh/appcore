var ItemAppModel = {
  model: function () {
    let modelFields = {
      webSlogan: {
        label: 'Web slogan',
        value: '',
        validators: []
      },
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
