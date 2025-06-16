interface User {
    id: string;
    fullName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    password: string;
}

const USER_KEY = 'user_data';

export const getUser = (): User | null => {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    try {
        return JSON.parse(userData);
    } catch {
        return null;
    }
};

export const setUser = (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
    localStorage.removeItem(USER_KEY);
};