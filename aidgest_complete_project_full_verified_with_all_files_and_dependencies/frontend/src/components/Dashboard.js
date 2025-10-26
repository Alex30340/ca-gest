import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => console.error('Error fetching invoices', error));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice._id}>
            {invoice.clientName} - {invoice.amount}€ - {invoice.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
