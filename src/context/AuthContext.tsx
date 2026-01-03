import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

type AuthContextType = {
    user: any;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
