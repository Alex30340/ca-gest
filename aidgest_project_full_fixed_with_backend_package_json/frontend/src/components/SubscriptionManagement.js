import React, { useState } from 'react';
import axios from 'axios';

const SubscriptionManagement = () => {
  const [clientId, setClientId] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('monthly');

  const handleCreateSubscription = () => {
    axios.post('/api/subscription/create', { clientId, service, amount, frequency })
      .then(response => alert('Subscription created'))
      .catch(error => console.error('Error creating subscription', error));
  };

  return (
    <div>
      <h3>Create Subscription</h3>
      <input type="text" placeholder="Client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
      <input type="text" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select onChange={(e) => setFrequency(e.target.value)} value={frequency}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button onClick={handleCreateSubscription}>Create Subscription</button>
    </div>
  );
};

export default SubscriptionManagement;
