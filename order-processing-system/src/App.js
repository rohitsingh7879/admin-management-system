import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './Components/ProductList';
import DiscountRuleList from './Components/DiscountRuleList';
import ProductForm from './Components/Productform';
import TaxRuleManagement from './Components/TaxRuleList';
import Home from './Home'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home OtherComponent={ProductList} />} >
            <Route path="/DiscountRuleList" element={<DiscountRuleList />} />
            <Route path="/TaxRuleList" element={<TaxRuleManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
