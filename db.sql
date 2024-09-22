--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-09-23 00:04:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 57344)
-- Name: PROJECTS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PROJECTS" (
    id text NOT NULL,
    name text NOT NULL,
    owner text NOT NULL,
    module text NOT NULL,
    content json NOT NULL,
    creation timestamp(0) without time zone NOT NULL,
    "lastModified" timestamp(0) without time zone NOT NULL,
    preview text NOT NULL
);


ALTER TABLE public."PROJECTS" OWNER TO postgres;

--
-- TOC entry 4808 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE "PROJECTS"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."PROJECTS" IS 'Tabella in cui vengono memorizzati tutti i progetti relativi agli utenti.';


--
-- TOC entry 217 (class 1259 OID 40960)
-- Name: SESSIONS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SESSIONS" (
    "user" text NOT NULL,
    "sessionId" text NOT NULL,
    data json,
    expires timestamp(0) without time zone NOT NULL
);


ALTER TABLE public."SESSIONS" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24578)
-- Name: USERS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."USERS" (
    email text NOT NULL,
    username text NOT NULL,
    psswrd text NOT NULL,
    active boolean DEFAULT false NOT NULL
);


ALTER TABLE public."USERS" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 32770)
-- Name: VERIF_CODES; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VERIF_CODES" (
    "user" text NOT NULL,
    code text NOT NULL,
    slug text NOT NULL,
    expires timestamp(0) without time zone NOT NULL
);


ALTER TABLE public."VERIF_CODES" OWNER TO postgres;

--
-- TOC entry 4809 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE "VERIF_CODES"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."VERIF_CODES" IS 'Tabella per memorizzare i codici (solo un codice attivo per utente per volta) utili alla verifica per mail di qualsiasi cosa. Per esempio, per la conferma dell''indirizzo email e l''attivazione dell''account.';


--
-- TOC entry 4810 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN "VERIF_CODES".code; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."VERIF_CODES".code IS 'Il codice è criptato all''interno del DB.';


--
-- TOC entry 4811 (class 0 OID 0)
-- Dependencies: 216
-- Name: COLUMN "VERIF_CODES".slug; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."VERIF_CODES".slug IS 'Codice a 32 caratteri alfanumerici che permette l''identificazione sicura dell''utente. Questo slug è lo stesso che compare all''interno del link di attivazione dell''account. In questo modo l''URL è difficilmente indovinabile, rendendo l''attivazione un processo esclusivo e più sicuro.';


--
-- TOC entry 4802 (class 0 OID 57344)
-- Dependencies: 218
-- Data for Name: PROJECTS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PROJECTS" (id, name, owner, module, content, creation, "lastModified", preview) FROM stdin;
\.


--
-- TOC entry 4801 (class 0 OID 40960)
-- Dependencies: 217
-- Data for Name: SESSIONS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SESSIONS" ("user", "sessionId", data, expires) FROM stdin;
\.


--
-- TOC entry 4799 (class 0 OID 24578)
-- Dependencies: 215
-- Data for Name: USERS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USERS" (email, username, psswrd, active) FROM stdin;
\.


--
-- TOC entry 4800 (class 0 OID 32770)
-- Dependencies: 216
-- Data for Name: VERIF_CODES; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VERIF_CODES" ("user", code, slug, expires) FROM stdin;
\.


--
-- TOC entry 4649 (class 2606 OID 32776)
-- Name: VERIF_CODES CONFIRM_CODES_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VERIF_CODES"
    ADD CONSTRAINT "CONFIRM_CODES_pkey" PRIMARY KEY ("user");


--
-- TOC entry 4653 (class 2606 OID 57350)
-- Name: PROJECTS PROJECTS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PROJECTS"
    ADD CONSTRAINT "PROJECTS_pkey" PRIMARY KEY (id);


--
-- TOC entry 4651 (class 2606 OID 40966)
-- Name: SESSIONS SESSIONS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SESSIONS"
    ADD CONSTRAINT "SESSIONS_pkey" PRIMARY KEY ("user");


--
-- TOC entry 4647 (class 2606 OID 32769)
-- Name: USERS USERS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USERS"
    ADD CONSTRAINT "USERS_pkey" PRIMARY KEY (email);


--
-- TOC entry 4655 (class 2606 OID 57356)
-- Name: PROJECTS PROJECTS_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PROJECTS"
    ADD CONSTRAINT "PROJECTS_owner_fkey" FOREIGN KEY (owner) REFERENCES public."USERS"(email) NOT VALID;


--
-- TOC entry 4654 (class 2606 OID 32777)
-- Name: VERIF_CODES user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VERIF_CODES"
    ADD CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES public."USERS"(email);


-- Completed on 2024-09-23 00:04:12

--
-- PostgreSQL database dump complete
--

