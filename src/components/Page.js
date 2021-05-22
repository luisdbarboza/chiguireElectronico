import React from 'react';
import Footer from '../components/Footer';

const Page = ({children, name}) => {
  
  if(name !== "post") {
    return (
      <div className="page-wrapper-grid">
        <main>
          {children}
        </main>
        <Footer />
      </div>
    )
  } else {
    return (
      <div className="page-wrapper-grid">
        <main style={{width: "100%"}} className="post-main">
          {children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Page;
