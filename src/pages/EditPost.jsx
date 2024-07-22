import { Container, PostForm } from "../components"
import { useNavigate,useParams } from "react-router-dom"
import service from "../appwrite/config"
import { useState,useEffect } from "react"

export default function EditPost() {
  const {slug}=useParams();
  const navigate=useNavigate();
  const [post, setPosts] = useState(null)

    useEffect(()=>{
      if(slug){
            service.getPost(slug).then((post)=>{
                if(post)
                    setPosts(post)
               })
              }
               else
                {
                    navigate('/')
                }
           
    },[slug,navigate])

    return post? (
    <div className="py-8">
    <Container>
        <PostForm post={post}/>
    </Container>

    </div>
  ):null
}
