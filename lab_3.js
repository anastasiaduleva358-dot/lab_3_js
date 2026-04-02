/**
 * Лабораторная работа 3
 * Основы работы с массивами, функциями и объектами в JavaScript
 */


// 1 Массив транзакций


/**
 * @typedef {Object} Transaction
 * @property {number} transaction_id - уникальный ID
 * @property {string} transaction_date - дата (YYYY-MM-DD)
 * @property {number} transaction_amount - сумма
 * @property {string} transaction_type - 'debit' | 'credit'
 * @property {string} transaction_description - описание
 * @property {string} merchant_name - магазин
 * @property {string} card_type - тип карты
 */

/** @type {Transaction[]} */

const transactions = [
  
 {
      transaction_id: "6",
      transaction_date: "2019-01-06",
      transaction_amount: 60.0,
      transaction_type: "debit",
      transaction_description: "Gasoline refill",
      merchant_name: "GasStationXYZ",
      card_type: "MasterCard",
    },
    {
      transaction_id: "7",
      transaction_date: "2019-01-07",
      transaction_amount: 40.0,
      transaction_type: "debit",
      transaction_description: "Lunch with colleagues",
      merchant_name: "Cafe123",
      card_type: "Visa",
    },
    {
      transaction_id: "8",
      transaction_date: "2019-01-08",
      transaction_amount: 90.0,
      transaction_type: "debit",
      transaction_description: "Movie tickets",
      merchant_name: "CinemaXYZ",
      card_type: "Amex",
    },
    {
      transaction_id: "34",
      transaction_date: "2019-02-03",
      transaction_amount: 25.0,
      transaction_type: "credit",
      transaction_description: "Returned gadget",
      merchant_name: "ElectronicsStore123",
      card_type: "Visa",
    }
];

/**
 * Уникальные типы транзакций
 * @param {Transaction[]} transactions
 * @returns {string[]}
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}


/**
 * Общая сумма
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * По типу
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

/**
 * По диапазону дат
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
    const d = new Date(t.transaction_date);
    return d >= new Date(startDate) && d <= new Date(endDate);
  });
}

/**
 * По магазину
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Среднее значение
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * По диапазону суммы
 */
function getTransactionsByAmountRange(transactions, min, max) {
  return transactions.filter(t => t.transaction_amount >= min && t.transaction_amount <= max);
}

/**
 * Сумма debit
 */
function calculateTotalDebitAmount(transactions) {
  return transactions
    .filter(t => t.transaction_type === "debit")
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * Месяц с наибольшим количеством транзакций
 */
function findMostTransactionsMonth(transactions) {
  const counts = {};

  transactions.forEach(t => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
  });

   let maxMonth = null;
  let maxCount = 0;

  for (let m in counts) {
    if (counts[m] > maxCount) {
      maxCount = counts[m];
      maxMonth = m;
    }
  }

  return maxMonth;
}

/**
 * Месяц с наибольшим количеством debit
 */
function findMostDebitTransactionMonth(transactions) {
  const counts = {};

  transactions
    .filter(t => t.transaction_type === "debit")
    .forEach(t => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      counts[month] = (counts[month] || 0) + 1;
    });

  let maxMonth = null;
  let maxCount = 0;

  for (let m in counts) {
    if (counts[m] > maxCount) {
      maxCount = counts[m];
      maxMonth = m;
    }
  }

  return maxMonth;
}

/**
 * Каких транзакций больше
 */
function mostTransactionTypes(transactions) {
  let debit = 0;
  let credit = 0;

  transactions.forEach(t => {
    if (t.transaction_type === "debit") debit++;
    if (t.transaction_type === "credit") credit++;
  });

  if (debit > credit) return "debit";
  if (credit > debit) return "credit";
  return "equal";
}

/**
 * До даты
 */
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}

/**
 * По ID
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}

/**
 * Только описания
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

// 3 Тестирование
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Credit транзакции:", getTransactionByType(transactions, "credit"));
console.log("Диапазон дат:", getTransactionsInDateRange(transactions, "2019-01-06", "2019-01-07"));
console.log("По магазину:", getTransactionsByMerchant(transactions, "CinemaXYZ"));
console.log("Среднее:", calculateAverageTransactionAmount(transactions));
console.log("По сумме:", getTransactionsByAmountRange(transactions, 50, 150));
console.log("Сумма debit:", calculateTotalDebitAmount(transactions));
console.log("Месяц с максимум транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с максимум debit:", findMostDebitTransactionMonth(transactions));
console.log("Типов больше:", mostTransactionTypes(transactions));
console.log("До даты:", getTransactionsBeforeDate(transactions, "2019-01-20"));
console.log("По ID:", findTransactionById(transactions, "8"));
console.log("Описания:", mapTransactionDescriptions(transactions));