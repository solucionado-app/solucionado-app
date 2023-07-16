// components/common/Layouts.tsx
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";
export const Layouts = {
    Main: MainLayout,
    Auth: AuthLayout,
};
export type LayoutKeys = keyof typeof Layouts; // "Main" | "Auth"