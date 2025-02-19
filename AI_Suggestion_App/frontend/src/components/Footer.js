import React from 'react';
import '../styles/Footer.css'; 
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
    return (
            <div className='Footer'>
                <div className='Footer-Text'>
                    <div> 
                        ©Copyright 2024-2025 
                    </div>

                    <div>
                        Medical_Assistant  
                    </div>

                    <div>                    
                        All rights reserved. 
                    </div>

                </div>
                <a href="https://github.com/Bistec-SUSL-2024/Medical_Assistant"> 
                    <div className='Footer-github'>
                            <div> 
                                <IconContext.Provider value={{ className: "Footer-github" }}>
                                    <div>
                                        <FaGithub /> 
                                    </div>
                                </IconContext.Provider>
                        
                            </div>
                        </div>
                </a>

            </div>
    );
  };
  
  export default Footer;