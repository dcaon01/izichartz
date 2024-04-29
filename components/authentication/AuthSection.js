
/**
 * AuthSection
 * Componente che renderizza la sezione di autenticazione comune a login register.
 * @param children essendo una sezione "di layout", la settiamo in modo che possa ricevere
 * dei children condizionalemente in base alla pagina di registrazione o accesso.
 */
export default function AuthSection({children}) {
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    );
};