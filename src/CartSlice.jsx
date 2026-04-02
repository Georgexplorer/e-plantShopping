import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // El carrito comienza vacío
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload// Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        // Añadimos el nuevo objeto al array de items
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    removeItem: (state, action) => {
      // Filtramos por el nombre recibido en el payload
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
      }
    },
  },
});

// Exportamos las acciones para usarlas con useDispatch en los componentes
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Exportamos el reducer para la store
export default CartSlice.reducer;