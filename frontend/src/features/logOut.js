import React from 'react'
import api from '../../utils/axios.js'

async function logOut() {
    try {
        const {data} = await api.get("/api/auth")
    } catch (error) {
        
    }
}

export default logOut
