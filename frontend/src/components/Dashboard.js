import React from 'react';

const Dashboard = ({ expenses }) => {
  const totalExpenses = expenses.reduce((total, expense) => {
    const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount);
    return total + (isNaN(amount) ? 0 : amount);
  }, 0);
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount);
    const category = expense.category || 'Uncategorized';
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += isNaN(amount) ? 0 : amount;
    return acc;
  }, {});

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="dashboard-card text-center">
          <h4>Total Expenses</h4>
          <p className="total-amount">₹{totalExpenses.toFixed(2)}</p>
          <small className="text-muted">{expenses.length} expense(s)</small>
        </div>
      </div>
      
      <div className="col-md-8">
        <div className="dashboard-card">
          <h4>Expenses by Category</h4>
          {Object.keys(categoryTotals).length > 0 ? (
            <ul className="list-group">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <li key={category} className="list-group-item d-flex justify-content-between align-items-center">
                  {category}
                  <span className="badge bg-primary rounded-pill">₹{amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No expenses yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;