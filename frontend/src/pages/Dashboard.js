import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "../styles.css";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  // Load expenses
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(stored);
  }, []);

  // Add expense
  const addExpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      category: e.target.category.value,
      amount: Number(e.target.amount.value),
      comments: e.target.comments.value,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    e.target.reset();
  };

  // Delete expense
  const deleteExpense = (id) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  // Pie chart data
  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#E91E63",
          "#9C27B0",
        ],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Expense Dashboard</h2>

      {/* Add Expense */}
      <form className="expense-form" onSubmit={addExpense}>
        <input name="category" placeholder="Category" required />
        <input name="amount" type="number" placeholder="Amount" required />
        <input name="comments" placeholder="Comments" />
        <button>Add Expense</button>
      </form>

      {/* Table Centered */}
      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.category}</td>
                <td>{e.amount}</td>
                <td>{e.createdAt}</td>
                <td>{e.updatedAt}</td>
                <td>{e.comments}</td>
                <td>
                  <button onClick={() => deleteExpense(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie Chart Centered */}
      {expenses.length > 0 && (
        <div className="chart-wrapper">
          <h3>Category-wise Expense Distribution</h3>
          <div className="chart">
            <Pie
              data={chartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
