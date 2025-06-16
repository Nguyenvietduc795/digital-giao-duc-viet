export interface User {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    gender?: string;
    role?: string; // nếu bạn dùng
  }
  
  const USER_KEY = 'digital-education-user';
  
  export function setUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  export function getUser(): User | null {
    const data = localStorage.getItem(USER_KEY);
    try {
      return data ? JSON.parse(data) as User : null;
    } catch (e) {
      console.error("Lỗi parse user:", e);
      return null;
    }
  }
  
  export function clearUser() {
    localStorage.removeItem(USER_KEY);
  }
  