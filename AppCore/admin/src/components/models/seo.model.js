var ItemAppModel = {
  model: function () {
    let modelFields = {
      seoTitle: {
        label: 'Seo title',
        value: null,
        validators: []
      },
      seoKeys: {
        label: 'Seo key words',
        value: null,
        validators: []
      },
      seoDescription: {
        label: 'Seo description',
        value: null,
        validators: []
      }
    }
    return modelFields
  }
}

module.exports = ItemAppModel
