import React from 'react'
import { SilentRemoveItem } from 'views/board';
//TODO Error Board for lazy loaded items
//yes this was taken from React docs. Do you really expect me to try harder rn?
export default class ErrorLoadingItem extends React.Component {
    constructor(props) {
      super(props);
      console.log("Props", props)
      this.state = { hasError: false };
      this.propkey = props.propkey
    }
    static getDerivedStateFromError(error) 
    {    
          // Update state so the next render will show the fallback UI. 
        return { hasError: true };  }
    componentDidCatch(error, errorInfo) 
    {    
        // You can also log the error to an error reporting service    
        console.warn(error,":",errorInfo);
        SilentRemoveItem(this.propkey) }
    render() {
      if (this.state.hasError) 
      {      
        // You can render any custom fallback UI      
        return <div className="error_load_item">Something went wrong</div>;    }
      else return this.props.children; 
    }
  }