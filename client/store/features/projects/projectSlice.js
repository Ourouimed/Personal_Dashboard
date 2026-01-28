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

export const deleteProject = createAsyncThunk('projects/delete' , async (projectId , thunkAPI)=>{
    try {
        return await projectService.deleteByid(projectId)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const updateProject = createAsyncThunk('projects/update' , async (project , thunkAPI)=>{
    try {
        console.log(project)
        return await projectService.updateProject(project.id , project)
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

    // delete project
        .addCase(deleteProject.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            const deletedProjectId = action.meta.arg;
            state.isLoading = false;
            state.projects = state.projects.filter(project => project._id !== deletedProjectId);
        })
        .addCase(deleteProject.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
        })
 // update Project
        .addCase(updateProject.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProject.fulfilled, (state, action) => {
            state.isLoading = false;
            const { id } = action.meta.arg
            const projectToEdit = state.projects.findIndex(project => project._id == id);
            state.projects[projectToEdit] = action.payload.project
            console.log(action.payload)
        })
        .addCase(updateProject.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
        })
})


export default projectSlice.reducer