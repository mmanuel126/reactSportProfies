// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NotificationProvider } from './context/NotificationContext';
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Must wrap everything that uses React Router */}
        <NotificationProvider> {/* Now safely inside Router context */}
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);