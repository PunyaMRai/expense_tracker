const API_BASE_URL = 'http://localhost:8080/api/expenses';

const ExpenseService = {
  async getExpenses() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  },

  async createExpense(expense) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  },

  async deleteExpense(id) {
    try {
      const url = `${API_BASE_URL}/${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return { success: true };
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  },
};

export default ExpenseService;
