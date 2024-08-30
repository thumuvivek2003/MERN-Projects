import React, { useState } from 'react';
import InvestmentForm from './components/InvestmentForm';
import InvestmentTable from './components/InvestmentTable';
import './index.css';

function App() {
  const [investmentData, setInvestmentData] = useState(null);

  const handleCalculate = (data) => {
    setInvestmentData(data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <InvestmentForm onCalculate={handleCalculate} />
        </div>
        {investmentData && (<div className="col-md-12">
            <InvestmentTable investmentData={investmentData} />
        </div>)
        }
      </div>
      {investmentData && (
        <div className="row mt-4">
          <div className="col-md-12">
            <InvestmentTable investmentData={investmentData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
