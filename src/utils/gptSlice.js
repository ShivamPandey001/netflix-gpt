import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGPTSearch: false,
        movieResults: null,
        movieName: null
    },
    reducers:{
        toggleGptSearchView:(state) => {
            state.showGPTSearch = !state.showGPTSearch
        },
        addGptMovies: (state,action) =>{
            const {movieName, movieResults} = action.payload;
            state.movieResults = movieResults;
            state.movieName = movieName;
        }
    },
})

export const {toggleGptSearchView, addGptMovies} = gptSlice.actions;
export default gptSlice.reducer;