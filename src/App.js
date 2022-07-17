import { useState} from 'react';
import './App.css';
import Paypal from './components/Paypay';

function App() {

  const [checkout, setCheckout] = useState(false);


  return (
    <div className="App">

      {checkout ? (<Paypal></Paypal> ) : 
        (
          <button onClick={() => {
            setCheckout(true);
          }}>
            Check out
          </button>
        )
      }
    </div>
  );
}

export default App;
