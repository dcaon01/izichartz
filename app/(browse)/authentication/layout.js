import AuthSection from "@/components/authentication/AuthSection.js";

export default function AuthLayout({ children }) {
    return (
        <AuthSection>
            {children}
        </AuthSection>
    );
};