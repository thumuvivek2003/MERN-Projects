import React, { useState } from 'react';

function InvestmentForm({ onCalculate }) {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualInvestment, setAnnualInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = calculateInvestment(
      parseFloat(initialInvestment),
      parseFloat(annualInvestment),
      parseFloat(expectedReturn),
      parseInt(duration)
    );
    onCalculate(data);
  };

  const calculateInvestment = (initial, annual, rate, years) => {
    let results = [];
    let totalInvestment = initial;
    let totalInterest = 0;

    for (let i = 1; i <= years; i++) {
      const interest = (totalInvestment + annual) * (rate / 100);
      totalInterest += interest;
      totalInvestment += annual;
      results.push({
        year: i,
        investedCapital: totalInvestment,
        interestEarned: interest,
        totalInterest: totalInterest,
      });
    }

    return results;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Investment Calculator</h5>
          <div className="mb-3">
            <label htmlFor="initialInvestment" className="form-label">
              Initial Investment
            </label>
            <input
              type="number"
              className="form-control"
              id="initialInvestment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="annualInvestment" className="form-label">
              Annual Investment
            </label>
            <input
              type="number"
              className="form-control"
              id="annualInvestment"
              value={annualInvestment}
              onChange={(e) => setAnnualInvestment(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expectedReturn" className="form-label">
              Expected Return (%) per year
            </label>
            <input
              type="number"
              className="form-control"
              id="expectedReturn"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">
              Duration (Years)
            </label>
            <input
              type="number"
              className="form-control"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Calculate
          </button>
        </div>
      </div>
    </form>
  );
}

export default InvestmentForm;
