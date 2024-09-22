# IZICHARTZ 1.0
Questo repository contiene la prima versione di Izichartz. E' stato condiviso solo a scopo educativo, le successive versioni sono riservate. La descrizione completa dell'app è riportata in parte nei commenti del codice e pricipalmente nella tesi "Izichartz: sviluppo di una web app per la progettazione di software tramite l'utilizzo di tools grafici - il modulo entity-relationship" scritta dal sottoscitto in occasione della sua laurea triennale in ingegneria informatica all'università di Padova.
Di seguito sono riportati i dettagli di installazione.

## Installazione
Per installare Izichartz, scaricare [Node.js](https://nodejs.org/en/). La versione utilizzata per lo sviluppo è riportata nella tesi alla Sezione 1.3.

Successivamente si può procedere al forking del repository. Una volta clonato quest'ultimo in locale, eseguire all'interno della cartella del progetto il comando `npm install`. Con questa operazione si installeranno tutti i pacchetti utilizzati nell'applicazione con le relative versioni. 

Prima di eseguire il programma, scaricare [PostgreSQL](https://www.postgresql.org/) in locale e importare il file `db` che si trova nella root del progetto. Basterà creare un nuovo database `izichartz` su pgAdmin, cliccare col tasto destro sul nome del db appena creato, e avviare una provedura di "Restore", selezionando il file `db`. Se la procedura fallisce, seguire le istruzioni al seguente [video](https://www.youtube.com/watch?v=kkw6-zXkr0I).

Successivamente, è importante creare, sempre nella root del progetto, un file `.env-local` contente le seguenti variabili locali:

```
DB_CLIENT_USER="Nome dell'utente del DB"
DB_CLIENT_HOST=localhost
DB_CLIENT_DBNAME=izichartz
DB_CLIENT_PASSWORD="Password impostata su PostgreSQL"
DB_CLIENT_PORT="Di solito 5432"
```

## Esecuzione
Come riportato nella tesi alla Sezione 2.3, per eseguire Izichartz in modalità sviluppo, basterà digitare il comando `npm run dev`,
che farà partire il compilatore di Next.js. 

Per buildare l'applicazione, utilizzare il comando `npm build`, e, successivamente, il comando `npm start` per eseguire la versione ottimizzata e finale dell'applicazione.

## Bugs e Accortezze
- Nella fase di registrazione, il codice di attivazione deve essere letto direttamente dal database
- La rinominazione nel workspace non funziona al meglio. Basta comunque refreshare la pagina dopo la visualizzazione dell'errore per vedere il progetto rinominato.