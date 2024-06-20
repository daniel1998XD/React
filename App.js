import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setItems(response.data);
    } catch (err) {
      setError('Erro ao buscar itens');
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    const newItem = { name, description, weight, price };
    try {
      await axios.post('http://localhost:5000/api/items', newItem);
      setName('');
      setDescription('');
      setWeight('');
      setPrice('');
      fetchItems();
    } catch (err) {
      setError('Erro ao adicionar item');
    }
  };

  return (
    <div className="App">
      <h1>Cadastro de Itens</h1>
      {error && <p>{error}</p>}
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Peso"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <h2>Lista de Itens</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}, Peso: {item.weight} kg, Preço: R$ {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
