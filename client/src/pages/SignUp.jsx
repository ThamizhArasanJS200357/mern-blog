import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";


//The formData state variable holds the current values of the form inputs. The handleChange function updates formData when an input changes, using the input's id as the key and the input's value. 
export default function SignUp() {
  const [formData,setFormData] = useState({});          //event handling
  const [errorMessage, setErrorMessage]=useState(null);  //error message for the not filling the form 
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()}); //trim - for removing the sapce that can be write in the form.
  }

  
  //SEVER FOR THE SIGNUP PAGE
  const handleSubmit =async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){ //for display error with entring the details
      return setErrorMessage('Please fill out all the fields.');
    }

    try{
      setLoading(true);
      setErrorMessage(null);
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();  

      if(data.success === false){          //it dispaly the error if already having the accounts
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    }
    catch (error){
      setErrorMessage(error.message);
      setLoading(false);
      
    }


  }
  return (<div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
      {/* left side */}
      <div className='flex-1'>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>தமிழ்
          </span>
          ChroniclesTemple
          </Link>
          <p className=' text-justify text-sm mt-5'>
          Explore Tamil Nadu's rich temple heritage with detailed histories, architectural insights, and cultural significance. Whether you're a local or a foreign Visitor, Signup with your email and password to begin your journey. Start exploring today!
          {/* Signup with your email and password to begin your journey.Start exploring today!  */}
          </p>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your username'/>
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='email@gmail.com' id='email' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
              loading ? (
                <>
                 <Spinner size='sm'/>
                 <span className='pl-3'>Loading...</span>
                </>
              ) :'Sign Up'
            }
          </Button>
        </form>
        <div className='flex grap-1 text-sm mt-5'>
          <span>Have an Account?</span>
          <Link to='/sign-up' className='text-blue-500'>
            Sign In
          </Link>
        </div> 
        {
          errorMessage &&(  //&& checks if errorMessage has a value. If errorMessage has a value, the expression after the && operator is evaluated
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
          )
          }
      </div>
    </div>  
  </div>
  )
}