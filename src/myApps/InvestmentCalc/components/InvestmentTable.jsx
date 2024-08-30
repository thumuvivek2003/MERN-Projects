import React from 'react';

function InvestmentTable({ investmentData }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Year</th>
          <th>Invested Capital</th>
          <th>Interest Earned</th>
          <th>Total Interest</th>
        </tr>
      </thead>
      <tbody>
        {investmentData.map((data, index) => (
          <tr key={index}>
            <td>{data.year}</td>
            <td>{data.investedCapital.toFixed(2)}</td>
            <td>{data.interestEarned.toFixed(2)}</td>
            <td>{data.totalInterest.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvestmentTable;
