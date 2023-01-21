import {useEffect} from 'react'
const Dashboard = ()=>{
    const fetchData = async()=>{
        const response = await fetch('/api/v1')
        const data = await response.json()
        console.log(data)
    }

    useEffect(()=>{
        fetchData()
    },[])
    return <h1>Dashboard</h1>
}

export default Dashboard