import React from 'react'
import { useDispatch } from 'react-redux'
import Header from '../../components/Header/Header'
import Layout from '../../components/Layout/Layout'
import MenuHeader from '../../components/MenuHeader/MenuHeader'

const HomePage = () => {
    const dispatch = useDispatch()
    return (
        <Layout>
            HomePage
        </Layout>
    )
}

export default HomePage
