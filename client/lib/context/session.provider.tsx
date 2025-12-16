import React, { PropsWithChildren, useEffect, useState } from "react";
import { SessionContext } from "./session.ctx";
import { session as sessionService } from "../services/session/session.service";

export function SessionProvider({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        const initializeSession = async () => {
            try {
                const token = await sessionService.getToken();
                if (token !== null) {
                    setSession(token);
                }
            } catch (error) {
                console.error('Error al inicializar la sesión:', error);
            } finally {
                setIsLoading(false);
            }
        };
        initializeSession();
    }, []);


    const saveSession = async (token: string) => {
        await sessionService.setToken(token);
        setSession(token);
    };

    const removeSession = async () => {
        await sessionService.clear();
        setSession(null);
    };

    return (
        <SessionContext.Provider
            value={{
                session,
                isLoading,
                saveSession,
                removeSession,
                setIsLoading
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}
