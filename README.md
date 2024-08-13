# DOCS 


## Cos'è Izichartz
Izichartz è un progetto [Next.js](https://nextjs.org/) creato con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Il suo obiettivo è quello di aiutare gli utenti con la progettazione grafica tramite l'utilizzo di un tool grafico e diversi moduli che permettono di utilizzare diversi modelli di progettazione. Ciascun modulo è sviluppato sulla base del modello di riferimento, con funzionalità efficaci che velocizzano il workflow dell'utente, che dovrà pensare solamente alla progettazione e non a perdere tempo dietro a inutili e tediosi aggiustamenti di layout.
Facciamo prima i componenti per l'ER che funzionano, poi cerchiamo di generalizzare per tutti i moduli.


## Librerie, Tecnologie e Servizi Esterni Utilizzati
<!-- - **Typescript**: per la gestione di tipi statici. [Docs](https://www.typescriptlang.org/docs/) PER ORA LO LASCIAMO STARE-->
- **Redux Toolkit**: per una gestione migliore degli stati. [Docs](https://redux-toolkit.js.org/usage/nextjs)
- **Framer Motion**: per animare l'applicazione. [Docs](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=PerformanceMax-Framer_&gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVPK9OUm1ZKgYlNwriO01FcAHAsEpZ2kxMAWIwdV13ztZ8HaSvrPvXBoCBYEQAvD_BwE)
- **Tailwind**: per uno styling CSS più rapido e bello. [Docs](https://tailwindcss.com/docs/installation)
- **pg**: pacchetto per la connessione e interrogazione del database PostgreSQL. [Docs](https://node-postgres.com/)
- **Click to Pay**: API di mastercard per la gestione dei pagamenti con carta. [Pagina](https://developer.mastercard.com/product/click-to-pay), [Demo](https://www.mastercardsrci-demo.com/demo/guided-tour)
- Oppure **Stripe**: API per fare la stessa cosa rispetto a click to pay.
- **Paypal**: come metodo di pagamento alternativo.
- **PostgreSQL**: database. [Docs](https://www.postgresql.org/docs/current/)
- **validator**: modulo javascript per la validazione delle stringe. [Docs](https://www.npmjs.com/package/validator)
- **bcrypt**: libreria javascript per il salting e l'hashing delle passwords. [Docs](https://www.npmjs.com/package/bcrypt)
- **recaptcha**: per prevenire traffico in inserimento nel database (molti account farlocchi non attivati, per esempio). Serve, però, un dominio, quindi, per ora, non ha senso implementarlo. [Docs](https://developers.google.com/recaptcha/docs/v3?hl=it)
- **resend**: package per l'invio di mail. [Docs](https://resend.com/docs)
- **csprng**: package che permette si generare delle stringe pseudocasuali crittograficamente sicure, cioè con un entropia alta e quindi non guessabili facilmente.
- **crypto-js**: package che permette la criptazione (non hashing, che non è reversibile) di stringhe.
- **cookies-next**: package che permette il prelevamento dei cookies da client components in next in modo più semplice.


## Flow all'interno dell'applicazione e requisiti
L'utente entra all'interno della home page. (Fare le immagini con GIMP). La navbar avrà due configurazioni, una per la sessione che non è ancora cominciata e una a sessione cominciata. Fare un logo sia per la versione desktop che quella mobile, quest'ultima avrà solo il loco con la scritta izi, e ovviamente il menu a tendina a burger.

La **navbar** includerà:
- **Modules**, che sarà un menu a tendina con la lista a tutti i moduli presenti nel sito, come ER, flowchart, UML, net design, etc. Ognuna di queste voci arà un link ad una pagina esplicativa del modello. La pagina conterrà una specie di carosello con un'immagine accattivante e una breve presentazione del modello con un bottone "start designing now" sulla falsa riga di quello che c'è in home page, e poi una  una spiegazione di come si progetta per quel modulo, con un indice per la navigazione all'interno della pagina presente a sinistra e le informazioni a destra. Il carosello scomparirà con una animazione on scroll, sotto alla parte di docs. 
- **Plans**, link che porta alla pagina dei piani, in cui vengono spiegati i vantaggi dei vari piani, magari da implementare più avanti. Sarebbe carino anche includere qualcosa nell'area personale, magari nella sezione **billing**. 
- **Contacts**, pagina contutti i contatti, in cui possiamo inserire un form per chiedere informazioni o dare feedback. 
- **About**, come descizione di come è nato Izichartz etc.
- Un **bottone** carino con **login** oppure con l'icona dell'omino per l'**Personal Area** se la sessione è partita. Il bottone **login** portetà ad una pagina di login, che deve includere anche la possibilità di andare a **registrarsi**. Sarebbe top riuscire a gestire anche l'autenticazione a due fattori per una maggiore sicurezza.
I link dovranno essere in questo ordine, da destra a sinistra.

Nel resto della home un carosello, magari tutto grande, con una breve descrizione di izichartz e un bottone "Start Designing Now".
Nel resto magari possiamo implementare delle parti di spiegazione più approfondita, magari prendendo spunto da altre app. La cosa importante è che sia accattivante, la home page è il nostro biglietto da visita.

Trasferiamoci all'**area personale**, che potremo chiamare **workspace** che è il fulcro dell'applicazione insieme all'**editor**. Potremo tenere la stessa barra di navigazione, ma cambiare il bottone di login o di area personale con "New Project".


## Routing
Ecco il routing dell'applicazione:
- Home: "/"
    - About: " /about "
    - Contact Us: " /contactus "
    - Login: " /login "
    - Register: " /login "
    - [ User ]: " /user-id "
        - Settings: " /settings "
        - Billing: " /billing "
        - Workspace: " /workspace "
            - [ project-id ]: " /project-id "


## Struttura del Progetto
Ecco la spiegazione della struttura del progetto:
- **app**: si trovano solo i file che sono correlati con il routing dell'applicazione in Next.
- **lib**: si trovano i file che gestiscono la parte server dell'applicazione, quindi le server actions. Le sottocartelle indicano il relativo routing o la sezione in cui sono utilizzate.
- **components**: si trovano i file che definiscono i componenti che costruiscono il contenuto dell'applicazione e che verranno utilizzati all'interno della directory app. Non sono strettamente correlati al routing dell'applicazione ma, come detto, ne costituiscono il contenuto.   
Le sottocartelle indicano il relativo routing o la sezione in cui sono utilizzati. All'interno di **components** troviamo:
    - **modules**: si trovano i componenti che gestiscono la parte applicativa:
        - **ER**: componenti che sono specifici per l'ER.
        - **general**: componenti che sono generali, utili per la gestione di qualsiasi modello.


## Componenti
### ER
#### Module
**Module** è il componente che si occupa di setuppare il rendering degli elementi nel workspace, qundi di prelevare lo stato dallo slice **elementSlice** e distribuirlo al **Generator**.   

### Global
Il **workpane** è lo spazio di lavoro sulla quale andranno ad essere disegnati i componenti grafici. E' sulla base di esso e del suo contenuto che potranno essere generate le immagini. La sua dimensione è uguale a quella della pagina. Il suo interno invece sarà in overflow in modo che possa essere scrollabile sia in altezza che in larghezza.
All'interno del workpane non si può zoommare all'infuori più della dimensione massima del progetto. 
Bisognerebbe trovare un modo di calcolare delle funzioni di zoom in modo da zoommare. Potremmo tenere in memoria un fattore di zoom, che è fisso ogni volta che apriamo un progetto, ma poi andare a cambiarlo quando lavoriamo. Quel fattore potremmo metterlo moltiplicato a tutti i parametri assoluti e gestire dinamicamente la cosa in questo modo. 
Trovare anche il modo di matchare il contenuto del workpane se la view del workpane è più ampia della dimensione del contenuto stesso. Infatti la view del worpane sarà sempre settata per essere uguale alla finestra, e far andare in overflow il contenuto. Non possiamo quindi avere una dimensione fissa del contenuto del workpane, ma deve essere dinamica.

### Generator
Il **Generator** è quello che si occupa di generare (mettere all'interno di ER).


## Modules
I moduli sono 
Il modulo ER viene richiamato una volta che deve essere mostrato un record di database del tipo ER. Riceve un oggetto JSON che ha questa struttura:
```
{
    module: ...,
    elements: [
        {
            id: ...,
            type: ...,
            options: {
                ...
            }
        },
        {
            id: ...,
            type: "",
            options: {
                ...
            }
        },
        ...
        ],
        recommended: {
            height: ...,
            width: ...
        }
}
```

Questo tipo di oggetto racchiude le informazioni necessarie per la renderizzazione del progetto a video (mancano ancora i collegamenti e magari un sistema di chiavi in modo da poter interconnettere i componenti.)
- **module**: indica il tipo di modulo salvato. 
- **elements**: array di elementi presenti nel progetto.

### ER
Possiamo andare a creare dei componenti ER che ricalcano i concetti ER e che utilizzano componenti grafici. Quindi nei componenti, creiamo delle cartelle relative ai componenti dell'er, uml etc. Ad esempio, per l'appunto, nell'ER avremmo l'entità che non sarà solo composta dal rettangolo, ma anche dai pallini, stessa cosa le relazioni. Poi ci saranno componenti creati ad hoc, come la tendida che esce schiacciando il tasto destro, che potrebbe essere diversa da modulo a modulo, e anche il menu laterale.
- **Linkers** : la gestione dei linkers è abbastanza complicata. Hanno la seguente struttura:
```
{
    type: "linker",
    id: 4,
    selected: false,
    options: {
        text: "",
        linked: [1, 3], 
        segments: [ 
            {}
        ],
    }
}
```
linked è un array di 2 elementi che mi identificano i due elementi che sono stati collegati.
I segments sono messi in ordine, nel senso che il primo elemento dell'array è collegato al primo elemento in linked, e l'ultimo elemento in segments è collegato al secondo. Questo ci aiuta a gestire la logica della generazione di parti di codice condizionale, come i pallini che si possono trascinare per cambiare la forma del linker.

**Strati degli elementi**
z-index: 
- 0 -> Workpane;
- 1 -> Linkers / Generalisation
- 2 -> Attributes
- 3 -> Entities
- 4 -> Inputs

## Database
L'applicazione deve gestire tutta una serie di funzionalità dell'utente. 
Quindi abbiamo sicuro la tabella USER per memorizzare i dati dell'utente, che avrà i seguenti attributi:
- username: nome dell'utente identificativo sull'app.
- email: che farà da chiave primaria.
- password: password dell'utente.

Dobbiamo memorizzare anche tutti i dati relativi ai progetti, che devono essere associati ad un determinato utente, nella tabella PROJECTS:
- name: nome del progetto.
- content: che altro non sarà che un JSON o JSONB con tutte le informazioni necessarie alla traduzione del progetto in grafica.
- module: tipo di modulo.
- owner: che sarà un campo in integrità referenziale con la chiave primaria della tabella USER.
- creation: data di creazione del progetto.

Potremmo pensare di inserire una tabella BILLING_INFO, in cui inseriamo le informazioni per la fatturazione (utili perché così inviamo tutto a stripe, e poi al programma di fatturazione da stripe):
- 

Poi abbiamo, però, bisogno di una gestione un po' particolare dei dati a seconda che il cliente sia un privato, un libero professionista (specializzazione del privato) o un'azienda, quindi si potrebbe pensare di inserire su billing info una sezione in cui mettiamo il numero identificativo della tabella, che deve essere una per ciascun tipo di persona. Non fa niente che gli identificativi possano essere uguali fra le varie tabelle, perché sappiamo in che tabella andare a cercare dal tipo di persone che abbiamo in billing_info (prevedere un attributo, o un flag, per identificarlo, visto che tanto il libero professionista ha solo la partita iva come campo in più rispetto ad un privato); 

Per i metodi di pagamento potremmo fare una cosa più o meno simile, perché non possiamo prevedere quanti metodi di pagamento andremo ad implementare.

Potremmo pensare di implementare anche una tabella per le fatture, chiamata BILLS:
- client: email del cliente a cui deve essere stilata la fattura
- date: data di fatturazione.
- id: identificativo della fattura.
- amount: fatturato.

Utilizzare le tabelle per creare il diagramma relazionale del DB che andremo ad utilizzare.

## Responsiveness
Lo zoom viene già gestito in automatico visto che i componenti hanno tutti una posizione e una dimensione assoluta e non relativa.
L'unica cosa che dobbiamo gestire è la quantità di zoom che si può fare sul workapane, poiché è proprio quest'ultimo che deve sempre riempire
la dimensione della finestra osservabile.

[def]: https://www.w3schools.com/graphics/svg_intro.asp

## REFACTOR
Abbiamo alcune cose che si potrebbero costruire in modo da aver meno codice possibile. 
Ad esempio il modale che esce con la creazione di un nuovo progetto e gli input per la registrazione sono molto simili.
Si potrebbe pensare di unificare anche le navbar. Però, per ora, non ha senso stare qui a farsi tutte ste seghe mentali.
Con relativi css che possono essere spostati a general. Oppure i componenti possono direttamente essere spostati in general