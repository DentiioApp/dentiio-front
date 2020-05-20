import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import Header from "../../components/App/Header/header";

const Profile = (props) => {
     const dispatch = useDispatch()

    const user = useSelector((state) => state.user)
    
    return(
        <div className='App'>
            <Header target={"profile"}/>
        </div>
    )
}

export default Profile