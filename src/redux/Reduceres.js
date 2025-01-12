const initial = {
    userFinded: {}, // État initial pour l'utilisateur trouvé
    formData: {}, // Stockez formData comme un tableau
};

export default function Reduceres(state = initial, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                userFinded: action.payload,
            };
        case "payment":
            return {
                ...state,
                formData: action.payload, // Assurez-vous que le payload est un tableau
            };
        default:
            return state;
    }
}