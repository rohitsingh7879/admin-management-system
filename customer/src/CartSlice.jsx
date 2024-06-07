import { createSlice } from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: "cart",
    initialState: { carts: [] },
    reducers: {

        addToCart: (state, action) => {

            const ItemIndex = state.carts.findIndex((item) => item.productId === action.payload.productId);
            // console.log(ItemIndex)
      
            if (ItemIndex >= 0) {
              state.carts[ItemIndex].quantity += 1
            } else {
              const temp = { ...action.payload, quantity: 1 }
              state.carts = [...state.carts, temp]
            }
            // state.carts = [...state.carts, action.payload]
            // console.log('action',action)
            // Implement your addToCart logic here
          },
        removeProduct(state, action) {
            const index = state.carts.findIndex((item) => item.id === action.payload);
            if (index > -1) {
                 state.carts.splice(index, 1);
            } else {
                console.log('No such product in the cart');
            }
        },
        removeSingleItem: (state, action) => {
            const ItemIndex_dec = state.carts.findIndex((item) => item.productId === action.payload);
      
            if (state.carts[ItemIndex_dec].quantity > 1) {
              state.carts[ItemIndex_dec].quantity -= 1
            }
          },
    }
});


// Export the actions and reducer
export const { addToCart, removeProduct,removeSingleItem } = cartSlice.actions;
export default cartSlice.reducer;
