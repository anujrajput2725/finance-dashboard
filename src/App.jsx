import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/expenses/add", {
        title,
        amount,
        category,
      });

      setTitle("");
      setAmount("");
      setCategory("");

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Personal Finance Dashboard</h1>

      <h2>Add Expense</h2>

      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Add Expense</button>
      </form>

      <hr />

      <h2>Expenses</h2>

      <div>
        {expenses.map((expense) => (
          <p key={expense._id}>
            {expense.title} - ₹{expense.amount} ({expense.category})
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;