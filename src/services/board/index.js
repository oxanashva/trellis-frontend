const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard() {
    return {
        name: '',
        desc: '',
        closed: false,
        dateClosed: null,
        starred: false,
        prefs: {
            background: '#1868DB',
        },
        idMemberCreator: '',
        actions: [],
        groups: [],
        tasks: [],
        labels: [],
        members: [],
        uploadedImages: []
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        sortField: '',
        sortDir: '',
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote


export const boardService = { getEmptyBoard, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
