import { createContext, useReducer, useEffect} from "react";
import type { ReactNode, Dispatch } from "react";

// Define the shape of your user data
export interface User {
    _id?: string;
    email?: string;
    token?: string;
    // add any other fields your app uses
}

// Define the shape of your auth state
interface AuthState {
    user: User | null;
}

// Define reducer action types
type AuthAction =
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" };

// Context type (what you provide in value)
interface AuthContextType extends AuthState {
    dispatch: Dispatch<AuthAction>;
}

// Create context with a default value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

// Provider props type
interface ProviderProps {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch({
                type: "LOGIN",
                payload: JSON.parse(storedUser) as User,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext