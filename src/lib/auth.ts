import {api} from "./api"

export interface AuthUser {
    id: string;
    email: string;
    profile: string;
}

export async function getCurrentUser(): Promise<AuthUser> {

    const response = await api.get<AuthUser>(
        "/api/auth/me"
    );
    return response.data;
}

export async function isAuthenticated(): Promise<boolean> {
    try {
        await getCurrentUser();

        return true;

    } catch (error: any) {

        if (error.response?.status === 401) {
            return false;
        }

        throw error;
    }
}

export async function logout(): Promise<void> {

    await api.post("/api/auth/logout");

}