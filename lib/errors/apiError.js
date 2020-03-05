/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const { sprintf } = require('../utils/string')

/**
 * ApiError allows to wrap API errors.
 */
class ApiError extends Error {

  /**
   * ApiError constructor.
   * @param code {int}
   * @param message {string}
   */
  constructor(code, message) {
    const fullMessage = sprintf(`api error:
  Code: %s
  Message: %s`, code.toString(), message)
    super()
    this.name = this.constructor.name
    this.message = fullMessage
  }

  /**
   * toString overrides the default string format of an error.
   * @returns {string}
   */
  toString() {
    return this.message
  }

  /**
   * fromJSON accepts a json representation of an ApiError and returns a new instance.
   * @param json {string}
   * @returns {ApiError}
   */
  static fromJSON(json) {
    const jsonObject = JSON.parse(json)
    return new ApiError(jsonObject.code, jsonObject.message)
  }
}

module.exports = {
  ApiError,
}