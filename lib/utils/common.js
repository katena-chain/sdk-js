/**
 * Copyright (c) 2018, TransChain.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

const moment = require('moment/moment')
const { sprintf } = require('./string')
const urlJoin = require('url-join')
const queryString = require('querystring')

const PAGE_PARAM = 'page'
const PER_PAGE_PARAM = 'per_page'
const DEFAULT_PER_PAGE_PARAM = 10

/**
 * concatenates a company bcid and a uuid into a fully qualified id.
 * @param companyBcId {string}
 * @param uuid {string}
 * @returns {string}
 */
function concatFqId(companyBcId, uuid) {
  return sprintf('%s-%s', companyBcId, uuid)
}

/**
 * returns a well formatted custom moment time.
 * @returns {string}
 */
function getCurrentTime() {
  return moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]')
}

/**
 * returns the query params object to request a pagination.
 * @param page {int}
 * @param perPage {int}
 * @returns {Object}
 */
function getPaginationQueryParams(page, perPage) {
  return {
    [PAGE_PARAM]: page,
    [PER_PAGE_PARAM]: perPage,
  }
}

/**
 * joins the base path and paths array and adds the query values to return a new url.
 * @param basePath {string}
 * @param paths {string[]}
 * @param queryParams {Object}
 * @returns {string}
 */
function getUri(basePath, paths, queryParams) {
  let uri = urlJoin(basePath, ...paths)
  if (queryParams) {
    const qs = queryString.stringify(queryParams)
    uri += '?' + qs
  }
  return uri
}

module.exports = {
  concatFqId,
  getCurrentTime,
  getPaginationQueryParams,
  getUri,
  DEFAULT_PER_PAGE_PARAM,
}