import {FaQuestion} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AboutIconLink() {


    return(
        <div className='about-link'>
            <Link to='/about'>
                <FaQuestion size={30} />
            </Link> 
        </div>
    )

}

export default AboutIconLink

/*
    using navlink. 
    <Card> 
        <NavLink> active className
        Home
        kind of like a navbar. Can highlight active. 


    <CARD> 

    posts. QueryParameter: 
        /post/:id 
        ^need to look into this
        useParams
*/