const initial = {
    userFinded: {}, // État initial pour l'utilisateur trouvé
    formData: {}, // Stockez formData comme un tableau
    InAdmin : false,
    InUser:false
};

export default function Reduceres(state = initial, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                userFinded: action.payload,
                InUser :true,
                InAdmin:false
                
            };
        case "payment":
            return {
                ...state,
                formData: action.payload,
                
            };
        case "admin" :
            return{
                ...state,
                userFinded: action.payload,
                InAdmin:true,
                InUser:false
            };
        default:
            return state;
    }
}