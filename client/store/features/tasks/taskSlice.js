import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksService from "./tasksService";

export const addTask = createAsyncThunk('tasks/add' , async (task , thunkAPI)=>{
    try {
        return await tasksService.addTask(task)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})

export const changeTaskStatus = createAsyncThunk('tasks/changeStatus' , async (task , thunkAPI)=>{
    try {
        return await tasksService.changeStatus(task)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const getAllTasks = createAsyncThunk('tasks/get' , async (_ , thunkAPI)=>{
    try {
        return await tasksService.getAll()
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})

export const deleteTask = createAsyncThunk('tasks/delete' , async (taskId , thunkAPI)=>{
    try {
        return await tasksService.deleteByid(taskId)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


const tasksSlice = createSlice({
    name : 'tasks' ,
    initialState : {
        tasks : [] , 
        isLoading : false
    },

    extraReducers : builder => builder
    // create task
        .addCase(addTask.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks.push(action.payload.task)
            console.log(action.payload)
        })
        .addCase(addTask.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
        })



        // change task status
        .addCase(changeTaskStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.tasks.findIndex(t => t._id === action.payload.task._id);
            if (index !== -1) {
                state.tasks[index] = action.payload.task;
            }
        })
    
        // get all tasks
        .addCase(getAllTasks.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload.tasks
            console.log(action.payload)
        })
        .addCase(getAllTasks.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.payload)
        }) 


        // delete task
                .addCase(deleteTask.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(deleteTask.fulfilled, (state, action) => {
                    const deletedTaskId = action.meta.arg;
                    state.isLoading = false;
                    state.tasks = state.tasks.filter(t => t._id !== deletedTaskId);
                })
                .addCase(deleteTask.rejected, (state, action) => {
                    state.isLoading = false;
                    console.log(action.payload)
                })
})


export default tasksSlice.reducer