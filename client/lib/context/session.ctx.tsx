import { createContext } from 'react';

export interface SessionState {
    session: string | null;
    isLoading: boolean;
}
export interface SessionActions {
    saveSession: (token: string) => Promise<void>;
    removeSession: () => Promise<void>;
    setIsLoading: (loading: boolean) => void;
}

export type SessionContextType = SessionState & SessionActions;

export const SessionContext = createContext<SessionContextType | null>(null);

