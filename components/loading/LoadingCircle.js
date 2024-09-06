import classes from "./LoadingCircle.module.css";

/**
 * Loading Circle
 * Componente che renderizza, tramite css, un cerchio di caricamento.
 * @param size dimensione in px che determina sia l'altezza che la 
 * larghezza dell'oggetto.
 * @returns 
 */
export default function LoadingCircle({ size }) {
    return (
        <div className={classes.loadingCircle} style={{
            height: size,
            width: size
        }}/>
    );
}