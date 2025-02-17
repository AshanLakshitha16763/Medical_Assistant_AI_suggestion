import React from 'react';
import '../styles/Footer.css'; 
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";

const Footer = () => {
    return (
            <div className='Footer'>
                <div></div>
                <div className='Footer-Text'>
                    <p> 
                        ©Copyright 2024-2025 
                    </p>

                    <p>
                        Medical_Assistant  
                    </p>

                    <p>
                        • All rights reserved. 
                    </p>

                </div>
                <a href="https://github.com/Bistec-SUSL-2024/Medical_Assistant"> 
                    <div className='Footer-github'>
                            <p> 
                                <IconContext.Provider value={{ className: "Footer-github" }}>
                                    <div>
                                        <FaGithub /> 
                                    </div>
                                </IconContext.Provider>
                        
                            </p>
                        </div>
                </a>

            </div>
    );
  };
  
  export default Footer;