const categoryReducer = (state = [], { type, payload }) =>{
    switch(type){
        case 'SAVE_CATEGORY':{
            return payload;
        }
        default: {
            return state;
        }
    }
}

export default categoryReducer;