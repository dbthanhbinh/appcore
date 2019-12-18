var ItemAppModel = {
  model: function () {
    let modelFields = {
      seoTitle: {
        label: 'Seo title',
        value: '',
        validators: []
      },
      seoKeys: {
        label: 'Seo key words',
        value: '',
        validators: []
      },
      seoDescription: {
        label: 'Seo description',
        value: '',
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
