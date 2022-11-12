const validateJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");
const validateFields = require("../middlewares/validate-fields");

module.exports = {
  ...validateJWT,
  ...validateRoles,
  ...validateFields,
};
