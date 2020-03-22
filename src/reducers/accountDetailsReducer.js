// eslint-disable-next-line
import * as Types from '../typedef';

export const initialState = {
    isLoading: true,
    /**
     * @type {Types.TransactionItem[]}
     */
    transactions: [],
    /**
    * @type {Types.SortBy}
    */
    sortBy: "date",
    /**
     * @type {Types.SortOrder}
     */
    sortOrder: "desc",
    currentPage: 0,
    pageSize: 10
}

/**
 * @returns {initialState}
 * 
 * @param {initialState} state
 * @param {Object} action 
 * @param {Types.ActionType} action.type 
 * @param {any} action.payload
 */
export function accountDetailsReducer(state, action) {
    if (process.env.NODE_ENV === "development") {
        console.log({
            action
        })
    }
    const { type, payload } = action;
    switch (type) {
        case "INIT": {
            return {
                ...state,
                transactions: payload,
                isLoading: false
            }
        }

        case "TOGGLE_SORT_BY": {
            const nextSortBy = payload;
            const nextSortOrder = calculateNextSortOrder(state.sortBy, nextSortBy, state.sortOrder);
            return {
                ...state,
                currentPage: 0,
                sortBy: nextSortBy,
                sortOrder: nextSortOrder,
                transactions: sortTransactions(state.transactions, nextSortBy, nextSortOrder)
            }
        }

        case "SET_PAGE": {
            return {
                ...state,
                currentPage: payload
            }
        }

        default: {
            return state;
        }
    }
}

/**
 * @returns {Types.SortOrder}
 * @param {Types.SortBy} prevSortBy
 * @param {Types.SortBy} nextSortBy
 * @param {Types.SortOrder} prevSortOrder
 */
function calculateNextSortOrder(prevSortBy, nextSortBy, prevSortOrder) {
    /**
     * @type {Types.SortOrder}
     */
    let nextSortOrder = "desc";
    if (prevSortBy === nextSortBy) {
        nextSortOrder = (prevSortOrder === "asc") ? "desc" : "asc";
    } else {
        nextSortOrder = "desc";
    }
    return nextSortOrder;
}

/**
 * @returns {Types.TransactionItem[]}
 * 
 * @param {Types.TransactionItem[]} transactions 
 * @param {Types.SortBy} sortBy 
 * @param {Types.SortOrder} sortOrder 
 */
function sortTransactions(transactions, sortBy, sortOrder) {
    return [...transactions].sort((t1, t2) => {
        const diff = t1[sortBy] - t2[sortBy];
        if (sortOrder === "asc") {
            return diff;
        } else {
            return -1 * diff;
        }
    })
}