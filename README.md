# Jitsi Presence Logger

Sistema modular para registro de presenca de alunos integrado a um LMS (Moodle) e Jitsi.

## Notas

Deve se trocar o parametro [baseURL](https://github.com/bryanasdev000/jitsi-presence-logger/blob/master/js/script.js#L70) para apontar para o [microservice de consulta](https://github.com/bryanasdev000/microservice-jitsi-log-view).

## TODOs

- [ ] Return alert on table if error with correct status code handler
- [ ] Return last logs if input of search equals ""
- [ ] Input sanitizer
- [ ] Tests?
- [ ] Pipeline (docker build)
- [ ] Rewrite using VueJS

## Overview

- https://github.com/bryanasdev000/moodle-mod_jitsi - Plugin do Moodle
- https://github.com/bryanasdev000/jitsi-logging-plugi - Plugin do Prosody
- https://github.com/bryanasdev000/microservice-jitsi-log-view - Microservice de consulta
- https://github.com/bryanasdev000/microservice-jitsi-log - Microservice de log
- https://github.com/bryanasdev000/jitsi-presence-logger - Frontend
- https://github.com/bryanasdev000/jitsi-presence-logger-doc - Doc do projeto
