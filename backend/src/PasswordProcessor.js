const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const sign = util.promisify(jwt.sign);
class PasswordProcessor {
  constructor(saltRounds, secret) {
    this.saltRounds = saltRounds;
    this.secret = secret;
  }

  /**
   *
   * @param {String!} password
   * @returns {Promise<String>!} hashedPassword
   */
  hash(password) {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   *
   * @param {String!} raw
   * @param {String!} hashed
   * @returns {Promise<bool>!} equal
   */
  compare(raw, hashed) {
    return bcrypt.compare(raw, hashed);
  }

  /**
   *
   * @param {String!} student_id
   * @returns {Promise<String>} new_token
   */
  issueToken(student_id) {
    return sign({ id: student_id }, this.secret, { expiresIn: '3h' });
  }

  /**
   *
   * @param {String!} token
   * @returns {bool} validity
   */
  //check if jwt is valid
  //if expired or id doesn't equal to the id in payload return false
  isValid(token){
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }
  /**
   * @param {String!} token
   * @returns {String} username
   */
  decode(token){
    return jwt.decode(token);
  }
}

module.exports = PasswordProcessor;
