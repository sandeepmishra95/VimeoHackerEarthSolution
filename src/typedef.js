/**
 * @typedef {Object} TransactionItem
 * @property {Number} transactionId
 * @property {Number} accountNumber
 * @property {Date} date
 * @property {String} dateText
 * @property {Date} valueDate
 * @property {String} valueDateText
 * @property {String} details
 * @property {Number|null} debit
 * @property {String} debitText
 * @property {Number|null} credit
 * @property {String} creditText
 * @property {Number|null} balance
 * @property {String} balanceText
 */

/**
 * @typedef {"date"|"valueDate"|"balance"} SortBy
 */

/**
* @typedef {"asc"|"desc"} SortOrder
*/

/**
 * @typedef {"INIT"|"TOGGLE_SORT_BY"|"SET_PAGE"} ActionType
 */
export default {};