# DOCS <!-- Scrivere in italiano sennò diventiamo solo che pazzi --->


## Cos'è Izichartz
Izichartz è un progetto [Next.js](https://nextjs.org/) creato con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Il suo obiettivo è quello di aiutare gli utenti con la progettazione grafica tramite l'utilizzo di un tool grafico e diversi moduli che permettono di utilizzare diversi modelli di progettazione. Ciascun modulo è sviluppato sulla base del modello di riferimento, con funzionalità efficaci che velocizzano il workflow dell'utente, che dovrà pensare solamente alla progettazione e non a perdere tempo dietro a inutili e tediosi aggiustamenti di layout.


## Installed Dependencies
- **Typescript**: per la gestione di tipi statici. [Docs](https://www.typescriptlang.org/docs/)
- **Redux**: per una gestione migliore degli stati. [Docs](https://redux.js.org/usage/)
- **Framer Motion**: per animare l'applicazione. [Docs](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=PerformanceMax-Framer_&gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVPK9OUm1ZKgYlNwriO01FcAHAsEpZ2kxMAWIwdV13ztZ8HaSvrPvXBoCBYEQAvD_BwE)
- **Tailwind**: per uno styling CSS più rapido. [Docs](https://tailwindcss.com/docs/installation)


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


## Project Structure
Ecco la spiegazione della struttura del progetto:
- **app**: si trovano solo i file che sono correlati con il routing dell'applicazione in Next.
- **lib**: si trovano i file che gestiscono la parte server dell'applicazione, quindi le server actions. Le sottocartelle indicano il relativo routing o la sezione in cui sono utilizzate.
- **components**: si trovano i file che definiscono i componenti che costruiscono il contenuto dell'applicazione e che verranno utilizzati all'interno della directory app. Non sono strettamente correlati al routing dell'applicazione ma, come detto, ne costituiscono il contenuto.   
Le sottocartelle indicano il relativo routing o la sezione in cui sono utilizzati.
- **modules**: si trovano i file che definiscono le funzioni relative ad un determinato modulo, o anche generali. Quindi il modulo er si occuperà di definire la logica per far funzionare al meglio il lavoro su un file di progettazione ER.


## Components

### Workpane
Il **workpane** è lo spazio di lavoro sulla quale andranno ad essere disegnati i componenti grafici. E' sulla base di esso e del suo contenuto che potranno essere generate le immagini. La sua dimensione è uguale a quella della pagina. Il suo interno invece sarà in overflow in modo che possa essere scrollabile sia in altezza che in larghezza.
All'interno del workpane non si puà zoommare più della dimensione massima del progetto. 


## Modules


## Database

<!-- INGLESE
## Docs
Izichartz is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Its goal is to help users with software design through a grafic tool and various design model modules. Each module is specifically developed 
for the relative design model, with effective functionalities that will help the user fastening his workflow and focusing on the design and the development, instead of wasting time with useless layout adjustments. 

### Installed Dependencies
- **Typescript**: for static types management. [Docs](https://www.typescriptlang.org/docs/)
- **Redux**: for better state management. [Docs](https://redux.js.org/usage/)
- **Framer Motion**: for animating the app. [Docs](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=PerformanceMax-Framer_&gad_source=1&gclid=CjwKCAjw48-vBhBbEiwAzqrZVPK9OUm1ZKgYlNwriO01FcAHAsEpZ2kxMAWIwdV13ztZ8HaSvrPvXBoCBYEQAvD_BwE)
- **Tailwind**: for faster CSS styling. [Docs](https://tailwindcss.com/docs/installation)

### Routing
Here's the routing of the app:
- Home: "/"
    - About: "/about"
    - Contact Us: "/contactus"
    - Login: "/login"
    - Register: "/login"

### Project Structure
Here's the project structure explanation:
- **app**: only routing-related files (and relative styling files) are allowed in this directory.
- **lib**: in this folder there are files related to the backend logic.
- **components**: in this folder there are files that define the components that will be declares in the app components. 
They are not related to the routing logic, but they are the bricks that build the app.
They are divided to   

### Components
-->