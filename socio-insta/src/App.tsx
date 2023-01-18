import { Box, Button, Input, makeStyles, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./components/Post";
import {auth, db} from "./firebase"
import { IPost } from "./interfaces/IPost";

const getModalStyle = ()=>{
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme)=>({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: '2px solid #000',
    boxShadow: theme.shadows[2],
    padding: '0 30px',
  }
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe =auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        // user has loggend in..
        console.log(authUser);
        setUser(authUser);
      }
      else{
        // user has logged out..
        setUser(null);
      }
    })
    return () =>{
      // perform cleanup before re-firing useffect
      unsubscribe();
    }
  }, [user, username]);
  
  //useEffect => Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>{
      //everytime a new post is added, this code fires
      setPosts(snapshot.docs.map(doc => doc.data()));
    })
  }, [])

  const handleSignUp = (event: any)=>{
    event?.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user?.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  }
  
  return (
    <div className="App">
      <Button onClick={()=>{setOpen(true)}}>Sign Up</Button>
      <Modal
        open={open}
        onClose={()=>{setOpen(false)}}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
            <img 
            className="app__headerImage"
            src="https://cdn.pixabay.com/photo/2021/03/02/12/03/instagram-6062238_960_720.png"
            alt="App logo"
            />
            </center>
            <Input
            placeholder="username"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}/>
            <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
            <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      {/* Header */}
      <>
      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP_df_8EsJCS44A86rmKJZX0nBMi7SDZaO6A&usqp=CAU"
          alt="App logo"
        ></img>
      </div>
      {
       posts.map((post: IPost) => 
        <Post
        imageUrl={post.imageUrl}
        username={post.username}
        caption={post.caption}
        />
       )
      }
      </>
      {/* <Post
        imageUrl="https://mir-s3-cdn-cf.behance.net/user/138/3b96636136631.5f0ef14504bf2.jpg"
        username="parekh_anuja"
        caption="Who run the world? Girls!!"
      />
      <Post
        imageUrl="https://media.licdn.com/dms/image/C4D03AQEW4Bw2XjJcXw/profile-displayphoto-shrink_800_800/0/1648739564340?e=1678924800&v=beta&t=oKrCAQEfac07DEwmIPvTApgudLNvSzmf1JBA_Y5Pffo"
        username="aditiparekh@19"
        caption="Looking right at you!!"
      /> */}
    </div>
  );
}

export default App;
