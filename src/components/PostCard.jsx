import service from "../appwrite/config"
import { Link } from "react-router-dom"

export default function PostCard({$id,title,featuredImage}) {
   console.log(featuredImage);
  return (
    <Link to={`/post/${$id}`}>

      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-xl"/>
        </div>
            <h2 className="text-xl font-bold">{title}</h2>
    </div>
    </Link>
  )
}
//https://cloud.appwrite.io/v1/storage/buckets/669e09a7000e17212b40/files/669e71e7001da27ad6d4/view?project=669e0718001c701db88a&mode=admin