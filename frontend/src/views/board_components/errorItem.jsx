import React from 'react'

//TODO Error Board for lazy loaded items
//yes this was taken from React docs. Do you really expect me to try harder rn?
export default class ErrorLoadingItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) 
    {    
        // Update state so the next render will show the fallback UI.    
        return { hasError: true };  }
    componentDidCatch(error, errorInfo) 
    {    
        // You can also log the error to an error reporting service    
        console.warn(error,":",errorInfo);}
    render() {
      if (this.state.hasError) 
      {      
        // You can render any custom fallback UI      
        return <div class="error_load_item">Something went wrong</div>;    }
      else return this.props.children; 
    }
  }