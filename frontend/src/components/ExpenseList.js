import React from 'react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group expenses by date
  const groupedExpenses = expenses.reduce((groups, expense) => {
    const date = formatDate(expense.date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedExpenses).sort(
    (a, b) => new Date(b) - new Date(a)   // newest date first
  );

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h3>Your Expenses</h3>
        <p className="text-center">No expenses yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h3>Your Expenses</h3>
      {sortedDates.map(date => (
        <div key={date} className="expense-date-group">
          <h4 className="date-heading">{date}</h4>
          {groupedExpenses[date].map(expense => (
            <div key={expense._id} className="expense-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{expense.title}</h5>
                <p className="mb-1 text-muted">{expense.category}</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="expense-amount me-3">₹{expense.amount.toFixed(2)}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDeleteExpense(expense._id)}
                  title="Delete expense"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
