import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const MyContext = createContext();

export function MyProvider({ children }) {

  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [minPower, setMinPower] = useState(0);
  const [maxPower, setMaxPower] = useState(0);

  return (
    <MyContext.Provider value={{
      values: { name, power, minPower, maxPower },
      setters: {
        setName,
        setPower,
        setMinPower,
        setMaxPower,
      },
    }}>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node
};

export default MyProvider;
