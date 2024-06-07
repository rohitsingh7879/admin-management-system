import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartInReddux from './CartInRedux'
import { Provider } from 'react-redux'
import store from './Store'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>

            <Route path="/" element={<ProductList
            />} />
            <Route path="/CartInReddux" element={<CartInReddux />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
