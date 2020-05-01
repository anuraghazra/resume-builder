import React, { useState, useEffect } from 'react';

import Head from 'next/head';
import DATA from '../constant/mockData';
import Header from '~/components/header/Header';
import { FormContext } from '../components/FormContext';
import Dashboard from '~/components/dashboard/Dashboard';

const App = () => {
  // App state
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, updateData] = useState({});

  const username = DATA.name;

  const handleOnPreviewBtnClicked = e => {
    e.preventDefault();
    setPreview(!preview);
  };

  const store = {
    preview: { get: preview, set: setPreview },
    data: { get: data, set: updateData },
  };

  useEffect(() => {
    if (localStorage.getItem('resume')) {
      const resume = JSON.parse(localStorage.getItem('resume'));
      updateData(prevState => ({ ...prevState, ...resume }));
      setLoading(!loading);
    }
  }, []);

  if (loading) {
    return null;
  }
  return (
    <div className="page-container">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>ResumeBuilder</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
      </Head>
      <FormContext.Provider value={store}>
        <Header name={username} status="Employee" onPreviewBtnClicked={handleOnPreviewBtnClicked} />
        <Dashboard />
      </FormContext.Provider>
    </div>
  );
};

export default App;
