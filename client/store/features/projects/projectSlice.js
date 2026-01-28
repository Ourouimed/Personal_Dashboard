import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";

export const addProject = createAsyncThunk('projects/add' , async (project , thunkAPI)=>{
    try {
        return await projectService.addProject(project)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const getAllProjects = createAsyncThunk('projects/get' , async (_ , thunkAPI)=>{
    try {
        return await projectService.getAll()
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})

const projectSlice = createSlice({
    name : 'projects' ,
    initialState : {
        projects : [], 
        isLoading : false
    },
    extraReducers : builder => builder
    // create Project
    .addCase(addProject.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload.project)
        console.log(action.payload)
    })
    .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
    })

    // get all Projects
    .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.projects
        console.log(action.payload)
    })
    .addCase(getAllProjects.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
    })
})


export default projectSlice.reducer