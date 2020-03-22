const API_ENDPOINT = "http://starlord.hackerearth.com/bankAccount";

/**
 * @returns {Number|null}
 * @param {String} amtString 
 */
function parseAmount(amtString) {
    const parsed = parseFloat(amtString.replace(/,/ig, ""));
    if (isNaN(parsed)) {
        return null;
    } else {
        return parsed;
    }
}

/**
 * @returns {import('../typedef').TransactionItem[]}
 * @param {*} data 
 */
function accountDataAdapter(data) {
    return data.map((item, index) => {
        return {
            transactionId: index,
            accountNumber: item["Account No"],
            date: new Date(item["Date"]),
            dateText: item["Date"],
            valueDateText: item['Value Date'],
            valueDate: new Date(item['Value Date']),
            details: item["Transaction Details"],
            debit: parseAmount(item["Withdrawal AMT"]),
            debitText: item["Withdrawal AMT"],
            credit: parseAmount(item["Deposit AMT"]),
            creditText: item["Deposit AMT"],
            balance: parseAmount(item["Balance AMT"]),
            balanceText: item["Balance AMT"],
        }
    });
}

export async function fetchAccountDetails() {
    const response = await fetch(API_ENDPOINT);
    if (response.status === 200) {
        const jsonResponse = await response.json();
        return accountDataAdapter(jsonResponse);
    } else {
        throw new Error("SERVICE_ERROR");
    }
}