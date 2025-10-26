import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinancialReports = () => {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/financial-report')
      .then(response => {
        setFinancialData(response.data);
      })
      .catch(error => console.error('Error fetching financial data', error));
  }, []);

  return (
    <div>
      <h2>Financial Reports</h2>
      <ul>
        {financialData.map(data => (
          <li key={data.id}>
            {data.name}: {data.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialReports;
