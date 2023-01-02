const models = require('@models');

exports.CREATE = (model, data) => models[model].create(data);

exports.BULKCREATE = (model, data) => models[model].bulkCreate(data);

exports.FINDALL = (model, where = null, attributes = null, include = null) => models[model].findAll({
  include,
  where,
  attributes,
});

exports.FINDONE = (model, where = null, attributes = null, include = null) => models[model].findOne({
  include,
  where,
  attributes,
});

exports.UPDATE = (model, data, where = null) => models[model].update(data, { where });

exports.DISABLE = (model, where = null) => models[model].update({ enable: false }, { where });

exports.ENABLE = (model, where = null) => models[model].update({ enable: true }, { where });

exports.DELETE = (model, where = null) => models[model].destroy({ where });
