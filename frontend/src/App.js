import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import ExpenseService from './services/ExpenseService';
import './styles/App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const expensesData = await ExpenseService.getExpenses();
      setExpenses(expensesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      const newExpense = await ExpenseService.createExpense(expense);
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await ExpenseService.deleteExpense(id);
      setExpenses(expenses.filter(expense => expense.id !== id)); // ✅ fixed
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please check console for details.');
    }
  };

  if (loading) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <div className="app-container">
      <header className="header text-center">
        <h1><i className="fas fa-money-bill-wave"></i> Expense Tracker</h1>
        <p>Track your expenses and manage your budget</p>
      </header>

      <Dashboard expenses={expenses} />
      
      <div className="row">
        <div className="col-md-5">
          <ExpenseForm onAddExpense={addExpense} />
        </div>
        <div className="col-md-7">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default App;
