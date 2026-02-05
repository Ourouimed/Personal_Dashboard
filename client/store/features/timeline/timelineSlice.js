import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import timelineService from "./timelineService";

export const addJourney = createAsyncThunk('timeline/add' , async (timeline , thunkAPI)=>{
    try {
        return await timelineService.addJourney(timeline)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const getTimeLine = createAsyncThunk('timeline/get' , async (_ , thunkAPI)=>{
    try {
        return await timelineService.getAll()
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const deleteTimeline = createAsyncThunk('timeline/delete' , async (id , thunkAPI)=>{
    try {
        return await timelineService.deleteByid(id)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})


export const updateTimeLine = createAsyncThunk('timeline/update' , async (timeline , thunkAPI)=>{
    try {
        console.log(timeline)
        return await timelineService.updateJourney(timeline.id , timeline)
    }
    catch (err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
    }
})







const timelineSlice = createSlice({
    name : 'timeline' ,
    initialState : {
        timeline : [], 
        isLoading : false
    },
    extraReducers : builder => builder
    // create timeline
    .addCase(addJourney.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(addJourney.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeline.push(action.payload.timeline)
        console.log(action.payload)
    })
    .addCase(addJourney.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
    })

    // get all Projects
    .addCase(getTimeLine.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getTimeLine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeline = action.payload.timeline
        console.log(action.payload)
    })
    .addCase(getTimeLine.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
    }) 



     // delete timeline
            .addCase(deleteTimeline.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTimeline.fulfilled, (state, action) => {
                const deletedTimeLineId = action.meta.arg;
                state.isLoading = false;
                state.timeline = state.timeline.filter(timeline => timeline._id !== deletedTimeLineId);
            })
            .addCase(deleteTimeline.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
            })

            // update timeline
                    .addCase(updateTimeLine.pending, (state) => {
                        state.isLoading = true;
                    })
                    .addCase(updateTimeLine.fulfilled, (state, action) => {
                        state.isLoading = false;
                        const { id } = action.meta.arg
                        const timeLineToEdit = state.timeline.findIndex(timeline => timeline._id == id);
                        state.timeline[timeLineToEdit] = action.payload.timeline
                        console.log(action.payload)
                    })
                    .addCase(updateTimeLine.rejected, (state, action) => {
                        state.isLoading = false;
                        console.log(action.payload)
                    })

})


export default timelineSlice.reducer