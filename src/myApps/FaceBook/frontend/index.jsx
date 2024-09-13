import React, { useState, useEffect } from 'react';
import { FacebookProvider, LoginButton, Page } from 'react-facebook';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { addDays } from 'date-fns';

const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  useEffect(() => {
    if (selectedPage && dateRange.from && dateRange.to) {
      fetchPageInsights();
    }
  }, [selectedPage, dateRange]);

  const handleLogin = (response) => {
    setUser(response.profile);
    fetchPages(response.tokenDetail.accessToken);
  };

  const fetchPages = async (accessToken) => {
    try {
      const response = await fetch(`https://graph.facebook.com/v12.0/me/accounts?access_token=${accessToken}`);
      const data = await response.json();
      setPages(data.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const fetchPageInsights = async () => {
    try {
      const since = dateRange.from.toISOString().split('T')[0];
      const until = dateRange.to.toISOString().split('T')[0];
      const response = await fetch(
        `https://graph.facebook.com/v12.0/${selectedPage.id}/insights?metric=page_fans,page_engaged_users,page_impressions,page_reactions_total&period=total_over_range&since=${since}&until=${until}&access_token=${selectedPage.access_token}`
      );
      const data = await response.json();
      setMetrics(data.data);
    } catch (error) {
      console.error('Error fetching page insights:', error);
    }
  };

  const renderMetricCard = (title, value) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );

  return (
    <FacebookProvider appId={FACEBOOK_APP_ID}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Facebook Analytics Dashboard</h1>
        {!user ? (
          <LoginButton
            scope="pages_show_list,pages_read_engagement"
            onCompleted={handleLogin}
            onError={(error) => {
              console.error('Login error:', error);
            }}
          >
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Login with Facebook
            </button>
          </LoginButton>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={user.picture.data.url}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-semibold">{user.name}</span>
            </div>
            <Select onValueChange={(value) => setSelectedPage(pages.find(p => p.id === value))}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DatePickerWithRange
              className="mb-4"
              selected={dateRange}
              onSelect={setDateRange}
            />
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderMetricCard('Total Followers / Fans', metrics[0].values[0].value)}
                {renderMetricCard('Total Engagement', metrics[1].values[0].value)}
                {renderMetricCard('Total Impressions', metrics[2].values[0].value)}
                {renderMetricCard('Total Reactions', metrics[3].values[0].value)}
              </div>
            )}
          </div>
        )}
      </div>
    </FacebookProvider>
  );
};

export default Dashboard;