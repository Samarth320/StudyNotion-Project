import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { IoIosArrowDown } from "react-icons/io";


// const subLinks = [
//     {
//         title:"python",
//         link:"/catalog/python"
//     },
//     {
//         title:"web dev",
//         link:"/catalog/web-development"
//     },
// ];

const Navbar = () => {

    const {token} = useSelector( (state)=> state.auth);
    const {user} = useSelector( (state)=>  state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const location = useLocation();

    const [subLinks , setSubLinks] = useState([]);
    
    const fetchSubLinks = async()=>{
        try{
            const result = await apiConnector("GET" , categories.CATEGORIES_API)
            console.log("printing Sublinks result :" , result);
            setSubLinks(result.data.data);
        }
        catch(error){
            console.log("cannot fetch the catalog list");
        }
    }

    useEffect( ()=> {
        fetchSubLinks();
    },[])

    const matchRoute = (route)=>{
        return matchPath( {path:route} , location.pathname );
    }


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='w-11/12 flex max-w-maxContent items-center justify-between'>

            {/* logo */}
            <Link to="/" >
                <img src={logo} w={160} h={42} loading='lazy' />
            </Link>

            {/* Nav links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link,index)=>(
                           
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div className='flex items-center gap-1 relative group'>

                                            <p>{link.title}</p>
                                            <IoIosArrowDown />

                                            <div className='invisible absolute flex flex-col rounded-md bg-richblack-5 p-4 
                                                    text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
                                                    group-hover:opacity-100 lg:w-[300px] 
                                                    top-[20%] left-[50%] translate-x-[-50%] translate-y-[50%] z-10'>

                                                  <div className='absolute left-[50%] top-0  h-6 w-6 rotate-45 rounded bg-richblack-5
                                                    translate-y-[-40%] '>
                                                  </div>

                                                  {
                                                    subLinks.length ? (
                                                        
                                                            subLinks.map( (subLink , index)=>(
                                                                <Link to={`/catalog/${subLink.name}`} key={index}>
                                                                    <p className='flex flex-col px-1 py-1 border-b-richblack-200 border-b-[1px]'>{subLink.name}</p>
                                                                </Link>
                                                            ) )

                                                    ) : (<div></div>)
                                                  }
                                            </div>

                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                         ) )
                    }
                </ul>
            </nav>

            {/* login signup dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                           <IoCartOutline />
                           {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                           }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/login"} >
                            <button className='border border-richblack-700 text-richblack-100 bg-richblack-800 px-[12px] py-[8px]
                            rounded hover:scale-95 transition-all duration-200'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className="border border-richblack-700 text-richblack-100 bg-richblack-800 px-[12px] py-[8px]
                            rounded hover:scale-95 transition-all duration-200">
                                Sign up
                            </button>
                        </Link>
                    )
                }
                {
                  token !== null && <ProfileDropDown/>  
                }
            </div>


        </div>
    </div>
  )
}

export default Navbar